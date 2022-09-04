import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

import Image from '../ImageViewer/Image/Image';
import Info from '../UI/Info/Info';
import useHttp from '../../Hooks/useHttp';
import NotFoundConfig from '../../Models/DataFiles/NotFound';
import Paragraph from '../../Models/Paragraph';
import ImageFile from '../../Models/ImageFile';
import HelmetSettings from '../Structure/Helmet/HelmetSettings';

import data from '../../ConfigurationFiles/data-file-locations.json';
import seoData from '../../ConfigurationFiles/seo-config.json';

import classes from './NotFound.module.css';

const configUrl = data.find(item=>item.contentType==='notFound')!.url;
const seoConfig = seoData.pageSettings.find(item=>item.page==='notFound')!;
const seoSiteInfo = seoData.site;

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
                landscape: false,
                fullDescription: ""
            }));

            for (const item in data.paragraphs) {
                const paragraph = data.paragraphs[item];

                if(paragraph.display && paragraph.order === 1){
                    localFirstParagraph = {
                        order: data.paragraphs[item].order,
                        display: data.paragraphs[item].display,
                        emphasis: data.paragraphs[item].emphasis,
                        text: data.paragraphs[item].text,
                        alignment: data.paragraphs[item].alignment
                    };
                } else if (data.paragraphs[item].display) {
                    localRemainingParagraphs.push({
                        order: data.paragraphs[item].order,
                        display: data.paragraphs[item].display,
                        emphasis: data.paragraphs[item].emphasis,
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
            <HelmetSettings 
                helmetConfiguration={seoConfig} 
                seoSiteUrl={seoSiteInfo} />
            <Info infoClasses={`col-12`}>
                <h1 className={`${classes.notfoundInfo} ${classes.centeredParagraphs}`}>
                    {parse(`
                        ${firstParagraph.text}
                    `)}
                </h1>
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
                            className={`${item.emphasis ? classes.emphasis : ''} ${classes.centeredParagraphs}`} >
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