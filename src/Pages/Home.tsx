import React, { Fragment, useEffect, useState } from 'react';
import parse from 'html-react-parser';

import Info from '../Components/UI/Info/Info';
import ImageSlider from '../Components/ImageViewer/ImageSlider/ImageSlider';
import Image from '../Components/ImageViewer/Image/Image';
import useHttp from '../Hooks/useHttp';
import classes from './Home.module.css';

import data from '../Configs/ConfigFileLocations.json';
import HomeConfig from '../models/configs/HomeConfig/HomeConfig';
import ComponentType from '../models/configs/ComponentType';
import ImageFile from '../models/ImageFile';

const configUrl = data.find(item=>item.configuration==='home')!.url;

const Home = () => {
    const { sendRequest: fetchParagraphs } = useHttp();
    const [ components, setComponents ] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const transformData = (data: HomeConfig) =>{
            const processedComponents: JSX.Element[] = [];
            const numberOfColumns = data.layout.columns.number;
            const configComponents = data.layout.columns.components;

            const orderedComponents = configComponents.sort((a, b) => {
                return a.order - b.order;
            });

            for (const item in orderedComponents) {
                const component = orderedComponents[item];

                if(component.component === ComponentType.Info && component.active){
                    const infoComponent = (
                        <Info
                            key={`home-component-${component.order}`} 
                            infoClasses={`col-xs-12 col-xl-${12/numberOfColumns} ${classes.centeredParagraphs}`} >
                            {component.paragraphs.map((item, index) => 
                                <p
                                    key={index} 
                                    className={`${item.empahsis ? classes.empahsis : ''}`}
                                    style={{
                                        textAlign: item.alignment === "left" ? "left" : item.alignment === "right" ? "right" : "center"
                                    }} >
                                    {parse(`
                                        ${item.text}
                                    `)}
                                </p>
                            )}
                        </Info>
                    );
                    processedComponents.push(infoComponent);
                } else if(component.component === ComponentType.Image && component.active) {
                    const images: ImageFile[] = [];
                    const baseUrl = component.baseUrl;
                    const autoSlider = component.slider.auto;
                    const autoSliderTimer = component.slider.timer;
                    const autoSliderArrowIcons = component.slider.arrowIcons;
                    const autoSliderSize = component.slider.size;

                    if(component.images.length >= 1) {
                        for (const item in component.images) {
                            const image = component.images[item];
                            images.push({
                                title: image.title,
                                altText: image.altText,
                                fileName: image.fileName,
                                externalLink: image.externalLink,
                                order: image.order,
                                url: `${baseUrl}${image.fileName}`,
                                landscape: image.landscape ? true : false,
                                description: {
                                    paragraphs: []
                                }
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
                                imageSize={autoSliderSize}
                                arrowIcon={autoSliderArrowIcons} />}
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
                                    imageWidth={autoSliderSize}
                                    displayBlurb={false}
                                    displayTitle={false}
                                    title={images[0].title}
                                    isThumbnail={false} 
                                    isStandAlone={true} />}
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