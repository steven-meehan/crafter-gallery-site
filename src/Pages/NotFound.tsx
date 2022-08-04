import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

import Image from '../Components/ImageViewer/Image/Image';
import Info from '../Components/UI/Info/Info';
import useHttp from '../Hooks/useHttp';
import classes from './NotFound.module.css';

import data from '../Configs/ConfigFileLocations.json';
import NotFoundConfig from '../models/configs/NotFoundConfig/NotFoundConfig';
import Paragraph from '../models/Paragraph';
import ImageFile from '../models/ImageFile';

const configUrl = data.find(item=>item.configuration==='notFound')!.url;

const NotFound = () => {
    const { sendRequest: fetchImage } = useHttp();
    const [ image, setImage ] = useState<ImageFile>(new ImageFile());
    const [ firstParagraph, setFirstParagraph ] = useState<Paragraph>(new Paragraph());
    const [ remainingParagraphs, setRemainingParagraphs ] = useState<Paragraph[]>([]);

    useEffect(() => {
        const transformData = (data: NotFoundConfig) =>{
            let localFirstParagraph: Paragraph = new Paragraph();
            const localRemainingParagraphs: Paragraph[] = [];

            setImage(new ImageFile({
                title: data.image.title,
                altText: data.image.altText,
                fileName: data.image.fileName,
                description: data.image.description,
                url: data.image.url,
                order: 0,
                externalLink: '',
                landscape: false
            }));

            for (const item in data.paragraphs) {
                const paragraph = data.paragraphs[item];

                if(paragraph.display && paragraph.order === 1){
                    localFirstParagraph = {
                        order: data.paragraphs[item].order,
                        display: data.paragraphs[item].display,
                        empahsis: data.paragraphs[item].empahsis,
                        text: data.paragraphs[item].text,
                        alignment: data.paragraphs[item].alignment
                    };
                } else if (data.paragraphs[item].display) {
                    localRemainingParagraphs.push({
                        order: data.paragraphs[item].order,
                        display: data.paragraphs[item].display,
                        empahsis: data.paragraphs[item].empahsis,
                        text: data.paragraphs[item].text,
                        alignment: data.paragraphs[item].alignment
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
            { url: configUrl },
            transformData
        );
    }, [fetchImage]);

    return (
        <div className={`row justify-content-center`}>
            <Info infoClasses={`col-12`}>
                <p className={`${classes.notfoundInfo} ${firstParagraph.empahsis ? classes.empahsis : ''} ${classes.centeredParagraphs}`}>
                    {parse(`
                        ${firstParagraph.text}
                    `)}
                </p>
            </Info>
            {image && <div 
                className={`col-8 ${classes.centered} ${classes.centeredImage}`}>
                <Image 
                    image={image}
                    classes={classes.notFoundImage}
                    isStandAlone={true}
                    linkImageToContent={true}
                    isContentInternal={true}
                    linkTitle={`Check out my Galleries.`}
                    urlForLinkedContent={`/gallery`}
                    imageWidth={'85%'}
                    displayBlurb={false}
                    displayTitle={false} title={''} 
                    isThumbnail={false} />
            </div>}
            <Info infoClasses={`col-12`}>
                <div className={`${classes.notfoundInfo}`}>
                    {remainingParagraphs.map((item, index) => 
                        <p
                            key={index}
                            className={`${item.empahsis ? classes.empahsis : ''} ${classes.centeredParagraphs}`} >
                            {parse(`
                                ${item.text}
                            `)}
                        </p>
                    )}
                </div>
            </Info>
        </div>
    );
};

export default NotFound;