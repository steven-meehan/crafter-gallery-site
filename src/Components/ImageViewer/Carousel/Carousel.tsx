import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import ImageSlider from '../ImageSlider/ImageSlider';
import CarouselProps from './CarouselProps';
import useHttp from '../../../Hooks/useHttp';
import ConfigFile from '../../../Models/ConfigurationFiles/ConfigFile';
import ImageFile from '../../../Models/ImageFile';
import Description from '../../../Models/Description';
import GalleryRequestConfig from '../../../Models/DataFiles/GalleryRequestConfig';

import data from '../../../ConfigurationFiles/data-file-locations.json';

import classes from './Carousel.module.css';

const config = data.find(item=>item.contentType==='gallery')!;

const Carousel: React.FC<CarouselProps> = (props) => {
    const [ selectedImageName, setSelectedImageName ] = useState("");
    const [ galleryImages, setGalleryImages ] = useState<ImageFile[]>([]);

    const { sendRequest: fetchImageReferences } = useHttp();

    const params = useParams();
    const navigate = useNavigate();

    const galleryConfigurationUrl = `${config.url}${props.configSettingFile}`;
    const defaultPage = props.defaultPage;
    const routeToNotFoundPage = props.routeToNotFoundPage;
    const fontAwesomeArrowIcons = props.fontAwesomeArrowIcons;

    const imageName = params.imageName ? params.imageName : '';
    
    useEffect(() => {
        const transformData = (data: GalleryRequestConfig) => {
            const processingGalleryImages = (
                item: {
                    title: string,
                    altText: string,
                    fileName: string,
                    order: number,
                    externalLink: string,
                    landscape: boolean,
                    description: Description
                }, 
                baseUrl: string): ImageFile => {

                let fullDescription = "";

                item.description.paragraphs.forEach(item => {
                    if(fullDescription.length < 160){
                        const strippedString = item.text.replace(/(<([^>]+)>)/gi, "");

                        if(strippedString.length <= 160){
                            fullDescription = fullDescription + strippedString + " ";
                        } else {
                            fullDescription = fullDescription + strippedString.substring(0,(160-fullDescription.length))
                        }
                    }
                });

                return {
                    title: item.title,
                    altText: item.altText,
                    fileName: item.fileName,
                    order: item.order,
                    description: item.description,
                    fullDescription: fullDescription,
                    url: `${baseUrl}${item.fileName}`,
                    externalLink: `${item.externalLink && item.externalLink.trim() !== '' ? item.externalLink : ''}`,
                    landscape: item.landscape
                }
            }

            const baseUrl = data.baseUrl;
            
            const galleryImages: ImageFile[] = [];
            
            for (const item in data.items) {
                galleryImages.push(processingGalleryImages(data.items[item], baseUrl)); 
            }

            const notFound = galleryImages.filter((item) => {
                return item.fileName === imageName;
            });
    
            if(notFound.length === 0 && imageName){
                if(routeToNotFoundPage){
                    navigate('/image-not-found');
                } else {
                    navigate(defaultPage);
                }
            }

            const initialImage = galleryImages.filter((item) => {
                return item.order === 1;
            });

            if(initialImage.length === 1){
                setSelectedImageName(initialImage[0].fileName);
            }            

            const sortedGalleryImages = galleryImages.sort((a, b) => {
                return a.order - b.order;
            });

            setGalleryImages(sortedGalleryImages);
        }
    
        fetchImageReferences(
            {
                url: galleryConfigurationUrl,
                cacheExpiration: config.cacheAge
            },
            transformData
        );
    }, [fetchImageReferences, galleryConfigurationUrl, imageName, defaultPage, navigate]);

    useEffect(() => {
        const localImages = galleryImages && galleryImages.length > 0 ? galleryImages : null;
    
        if (localImages) {
            if(imageName){
                const selectedImage = localImages.filter((item) => {
                    return item.fileName === imageName;
                });
    
                if(selectedImage.length === 1){
                    setSelectedImageName(selectedImage[0].fileName);
                }
            }
        }
    }, [galleryImages, selectedImageName, imageName])

    return (
        <Fragment>
            <ImageSlider 
                images={galleryImages}
                defaultPage={defaultPage}
                setHelmetInfo={true}
                arrowIcon={fontAwesomeArrowIcons}
                startWithImage={selectedImageName ? true : false}
                renderImageUrls={true}
                initialImage={selectedImageName} />
            <ImageSlider 
                images={galleryImages}
                defaultPage={defaultPage}
                isThumbnailBar={true} />  
        </Fragment>
    );
}

export default Carousel; 