import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import ImageSlider from '../ImageSlider/ImageSlider';
import CarouselProps from './CarouselProps';
import useHttp from '../../../Hooks/useHttp';
import ImageFile from '../../../Models/ImageFile';
import GalleryRequestConfig from '../../../Models/DataFiles/GalleryRequestConfig';
import Paragraph from '../../../Models/Paragraph';

import data from '../../../ConfigurationFiles/data-file-locations.json';

import classes from './Carousel.module.css';

const config = data.find(item=>item.contentType==='galleries')!;

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
                    htmlTitle: string,
                    htmlAltText: string,
                    fileName: string,
                    externalUrl: string,
                    landscape: boolean,
                    imageUrl?: string,
                    description?: Paragraph[],
                    fullDescription?: string
                }, 
                baseUrl: string): ImageFile => {

                return {
                    htmlTitle: item.htmlTitle,
                    htmlAltText: item.htmlAltText,
                    imageUrl: `${baseUrl}${item.fileName}`,
                    fileName: item.fileName,
                    externalUrl: `${item.externalUrl && item.externalUrl.trim() !== '' ? item.externalUrl : ''}`,
                    landscape: item.landscape,
                    description: item.description ? item.description : [],
                    fullDescription: item.fullDescription ? 
                        item.fullDescription.replace(/(<([^>]+)>)/gi, "").substring(0,160) : 
                        `Check out my ${item.htmlTitle}`
                }
            }

            const baseUrl = data.baseUrl;
            const galleryImages: ImageFile[] = [];
            
            for (const item in data.items) {
                const image = data.items[item];
                galleryImages.push(processingGalleryImages(image, baseUrl)); 
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
            
            setSelectedImageName(galleryImages[0].fileName);
            setGalleryImages(galleryImages);
        }
    
        fetchImageReferences(
            {
                url: galleryConfigurationUrl,
                cacheAge: config.cacheAge
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