import { useState, useCallback } from 'react';

import CachedItem from '../Models/Hooks/CachedItem';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string[]>([]);

    const currentTime = () => { return Date.now(); }

    const sendRequest = useCallback(async (requestConfig: {
        url: string,
        method?: string,
        headers?: HeadersInit,
        body?: any,
        cacheAge: number
    }, applyData: any) => {
        setIsLoading(true);
        setError([]);

        const makeHttpRequest = async () => {
            try {
                const response = await fetch(requestConfig.url, {
                    method: requestConfig.method ? requestConfig.method : 'GET',
                    headers: requestConfig.headers ? requestConfig.headers : {},
                    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
                });
    
                if (!response.ok) {
                    throw new Error('Request failed!');
                }
    
                const data = await response.json();

                writeDataToSessionStorage(data);
                applyData(data);
            } catch (err) {
                setError(prevState => {
                    return [...prevState, 'Something went wrong with the request. Please try again later.'];
                });
            }
        }

        const writeDataToSessionStorage = (data: any) => {
            const cachedData = new CachedItem({
                data: data,
                timestamp: currentTime() + requestConfig.cacheAge
            })

            try{
                sessionStorage.setItem(requestConfig.url, JSON.stringify(cachedData))
            }
            catch(e){
                setError(prevState => {
                    return [...prevState, `There was a problem setting the data for ${requestConfig.url} in session storage`];
                });
            }
        }

        try {
            const cachedData = sessionStorage.getItem(requestConfig.url)
    
            if(cachedData) {
                const cachedItem = JSON.parse(cachedData) as CachedItem;

                if(cachedItem.timestamp > currentTime()){
                    applyData(cachedItem.data!);
                } else {
                    sessionStorage.removeItem(requestConfig.url);
                    makeHttpRequest();
                }
            } else {
                makeHttpRequest();
            }
        }
        catch(e){
            setError(prevState => {
                return [...prevState, `There was a problem pulling ${requestConfig.url} from session storage`];
            });
        }

        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest,
    };
};

export default useHttp;
