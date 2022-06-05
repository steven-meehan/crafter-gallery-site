import React, { Fragment, useEffect, useState } from 'react';
import parse from 'html-react-parser';

import Image from '../Components/ImageViewer/Image';
import Info from '../Components/UI/Info';

import useHttp from '../Hooks/useHttp';
import classes from './NotFound.module.css';

const NotFound = () => {
    const { sendRequest: fetchImage } = useHttp();
    const [ image, setImage ] = useState({});
    const [ firstParagraph, setFirstParagraph ] = useState({});
    const [ remainingParagraphs, setRemainingParagraphs ] = useState([]);

    useEffect(() => {
        const transformData = data =>{
            let localFirstParagraph = ''
            const localRemainingParagraphs = []

            setImage({
                title: data.image.title,
                altText: data.image.altText,
                fileName: data.image.fileName,
                description: data.image.description,
                url: data.image.url
            });

            for (const item in data.paragraphs) {
                if(data.paragraphs[item].display && parseInt(data.paragraphs[item].order) === 1){
                    localFirstParagraph = {
                        order: data.paragraphs[item].order,
                        display: data.paragraphs[item].display,
                        text: data.paragraphs[item].text,
                    };
                } else if (data.paragraphs[item].display) {
                    localRemainingParagraphs.push({
                        order: data.paragraphs[item].order,
                        display: data.paragraphs[item].display,
                        text: data.paragraphs[item].text,
                    });
                }
            };

            const sortedRemainingParagraphs = localRemainingParagraphs.sort((a, b) => {
                return a.order - b.order;
            });

            setFirstParagraph(localFirstParagraph);
            setRemainingParagraphs(sortedRemainingParagraphs);
        }

        fetchImage(
            { url: 'http://s3.us-east-1.amazonaws.com/www.handmadehighjinks.com/configs/config-page-notfound.json' },
            transformData
        );
    }, [fetchImage]);

    return (
        <div className={`row justify-content-center`}>
            <Info className={`col-8`}>
                <p className={`${classes.notfoundInfo}`}>
                    {parse(`
                        ${firstParagraph.text}
                    `)}
                </p>
            </Info>
            {image && <div className={`col-8 ${classes.centered} ${classes.centeredImage}`}>
                <Image 
                    image={image}
                    classes={classes.notFoundImage}
                    isStandAlone={true}
                    linkImageToContent={true}
                    isContentInternal={true}
                    linkTitle={`Check out my Gallery of Tumblers.`}
                    urlForLinkedContent={`/gallery`} 
                    imageWidth={'85%'}
                    displayBlurb={false}
                    displayTitle={false} />
            </div>}
            <Info className={`col-8`}>
                <p className={`${classes.notfoundInfo}`}>
                    {remainingParagraphs.map((item, index) => 
                        <p
                            key={index} >
                            {parse(`
                                ${item.text}
                            `)}
                        </p>
                    )}
                </p>
            </Info>
        </div>
    );
};

export default NotFound;