import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import ImageSlider from '../ImageSlider/ImageSlider';
import CarouselParam from './CarouselParam';
import CarouselProps from './CarouselProps';

import useHttp from '../../../Hooks/useHttp';
import classes from './Carousel.module.css';

import data from '../../../Configs/ConfigFileLocations.json';
import ConfigFile from '../../../models/configs/ConfigFileLocation/ConfigFile';
import ImageFile from '../../../models/ImageFile';
import Description from '../../../models/Description';
import GalleryRequestConfig from '../../../models/configs/GalleryRequestConfigs/GalleryRequestConfig';

const configUrl = data
    .map(item => new ConfigFile(item))
    .find(item=>item.configuration==="gallery")!.url;

const Carousel: React.FC<CarouselProps> = (props) => {
    const [ selectedImageName, setSelectedImageName ] = useState("");
    const [ galleryImages, setGalleryImages ] = useState<ImageFile[]>([]);

    const { sendRequest: fetchImageReferences } = useHttp();

    const params = useParams<CarouselParam>();
    const navigate = useHistory();

    const galleryConfigurationUrl = `${configUrl}${props.configSettingFile}`;
    const responseImageObject = props.imagesObject;
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
                return {
                    title: item.title,
                    altText: item.altText,
                    fileName: item.fileName,
                    order: item.order,
                    description: item.description,
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
                    navigate.push('/image-not-found');
                } else {
                    navigate.push(defaultPage);
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
                method: 'GET',
                headers: {},
                body: null
            },
            transformData
        );
    }, [fetchImageReferences, galleryConfigurationUrl, responseImageObject, imageName, defaultPage, navigate]);

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
                galleryTitle={responseImageObject}
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