import React, { Fragment, useEffect, useState } from 'react';
import parse from 'html-react-parser';

import Info from '../Components/UI/Info';
import ImageSlider from '../Components/ImageViewer/ImageSlider';
import Image from '../Components/ImageViewer/Image';
import useHttp from '../Hooks/useHttp';
import classes from './Home.module.css';

import data from '../Configs/ConfigFileLocations.json';

const configUrl = data.find(item=>item.configuration==='home').url;

const Home = () => {
    const { sendRequest: fetchParagraphs } = useHttp();
    const [ components, setComponents ] = useState([]);

    useEffect(() => {
        const transformData = data =>{
            const processedComponents = [];
            const numberOfColumns = data.layout.columns.number;
            const configComponents = data.layout.columns.components;

            const orderedComponents = configComponents.sort((a, b) => {
                return a.order - b.order;
            });

            for (const item in orderedComponents) {
                const component = orderedComponents[item];

                if(component.component === "info" && component.active){
                    const infoComponent = (
                        <Info
                            key={`home-component-${component.order}`} 
                            infoClasses={`col-xs-12 col-xl-${12/numberOfColumns} ${classes.centeredParagraphs}`} >
                            {component.paragraphs.map((item, index) => 
                                <p
                                    key={index} 
                                    className={`${item.empahsis ? classes.empahsis : ''}`}>
                                    {parse(`
                                        ${item.text}
                                    `)}
                                </p>
                            )}
                        </Info>
                    );
                    processedComponents.push(infoComponent);
                } else if(component.component === "image" && component.active) {
                    const images = [];
                    const baseUrl = component.baseUrl;
                    const autoSlider = component.slider.auto;
                    const autoSliderTimer = component.slider.timer;

                    if(component.images.length >= 1) {
                        for (const item in component.images) {
                            const image = component.images[item];
                            images.push({
                                title: image.title,
                                altText: image.altText,
                                fileName: image.fileName,
                                externalLink: image.externalLink,
                                order: image.order,
                                url:`${baseUrl}${image.fileName}`,
                                landscape: image.landscape ? true : false
                            });
                        }

                        const imageComponent = images.length > 1 ? (
                            <div
                                key={`home-component-${component.order}`} 
                                className={`col-xs-12  col-xl-${12/numberOfColumns}`}>
                                {images.length > 0 && <ImageSlider 
                                images={images}
                                disableTitle={true}
                                autoTransition={autoSlider}
                                autoTransitionTimer={autoSliderTimer}
                                galleryTitle={`home`}
                                imageSize={`95%`}
                                arrowIcon={`fas fa-arrow-circle`} />}
                            </div> 
                        ) : images.length === 1 ? (
                            <div
                                key={`home-component-${component.order}`} 
                                className={`col-xs-12  col-xl-${12/numberOfColumns}`}>
                                {images.length === 1 && <Image 
                                    image={images[0]}
                                    linkImageToContent={true}
                                    isContentInternal={false}
                                    urlForLinkedContent={images[0].externalLink && images[0].externalLink !== '' ? images[0].externalLink : images[0].url} 
                                    imageWidth={`100%`}
                                    displayBlurb={false}
                                    displayTitle={false}
                                    title={images[0].title} />}
                            </div> 
                        ) : null;

                        if(imageComponent){
                            processedComponents.push(imageComponent);
                        }
                    } 
                }
            } 

            setComponents(processedComponents);
        }

        fetchParagraphs(
            { url: configUrl },
            transformData
        );
    }, [fetchParagraphs]);

    return (
        <div className={`row`} >
            {components && components}
        </div>
    );
};

export default Home;