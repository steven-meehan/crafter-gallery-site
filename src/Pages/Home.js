import React, { Fragment, useEffect, useState } from 'react';
import parse from 'html-react-parser';

import Info from '../Components/UI/Info';
import ImageSlider from '../Components/ImageViewer/ImageSlider';
import useHttp from '../Hooks/useHttp';
import classes from './Home.module.css';

import data from '../Configs/ConfigFileLocations.json';

const configUrl = data.find(item=>item.configuration==='home').url;

const Home = () => {
    const { sendRequest: fetchParagraphs } = useHttp();
    const [ paragraphs, setParagraphs ] = useState([]);
    const [ images, setImages ] = useState([]);

    useEffect(() => {
        const transformData = data =>{
            const loadedParagraphs = [];
            const loadedImages = [];

            for (const item in data.paragraphs) {
                if(data.paragraphs[item].display){
                    loadedParagraphs.push({
                        order: data.paragraphs[item].order,
                        display: data.paragraphs[item].display,
                        text: data.paragraphs[item].text,
                        empahsis: data.paragraphs[item].empahsis ? true : false
                    });
                }
            };

            for (const image in data.homeSliderImages) {
                loadedImages.push({
                    title: data.homeSliderImages[image].title,
                    altText: data.homeSliderImages[image].altText,
                    fileName: data.homeSliderImages[image].fileName,
                    externalLink: data.homeSliderImages[image].externalLink,
                    order: data.homeSliderImages[image].order,
                    url:`${data.baseUrl}${data.homeSliderImages[image].fileName}`,
                    landscape: data.homeSliderImages[image].landscape ? true : false
                })
            }

            const sortedParagraphs = loadedParagraphs.sort((a, b) => {
                return a.order - b.order;
            });
            const sortedImages = loadedImages.sort((a, b) => {
                return a.order - b.order;
            });
        
            setImages(sortedImages);
            setParagraphs(sortedParagraphs);
        }

        fetchParagraphs(
            { url: configUrl },
            transformData
        );
    }, [fetchParagraphs]);

    return (
        <Fragment>
            <div className={`row`} >
                <Info infoClasses={`col-xs-12 col-xl-6 ${classes.centeredParagraphs}`} >
                    {paragraphs.map((item, index) => 
                        <p
                            key={index} 
                            className={`${item.empahsis ? classes.empahsis : ''}`}>
                            {parse(`
                                ${item.text}
                            `)}
                        </p>
                    )}
                </Info>
                <div
                className={`col-xs-12  col-xl-6`}>
                    {images.length > 0 && <ImageSlider 
                        images={images}
                        disableTitle={true}
                        autoTransition={true}
                        autoTransitionTimer={30000}
                        galleryTitle={`home`}
                        imageSize={`95%`}
                        arrowIcon={`fas fa-arrow-circle`} />}
                </div>
            </div>
        </Fragment>
    );
};

export default Home;