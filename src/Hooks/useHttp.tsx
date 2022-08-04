import { useState, useCallback } from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const sendRequest = useCallback(async (requestConfig: {
        url: string,
        method?: string,
        headers?: HeadersInit,
        body?: any
    }, applyData: any) => {
        setIsLoading(true);
        setError("");

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
            applyData(data);
        } catch (err) {
            setError('Something went wrong with the request. Please try again later.');
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
