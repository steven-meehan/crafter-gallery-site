import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import ImageSlider from './ImageSlider';

import useHttp from '../../Hooks/useHttp';
import classes from './Carousel.module.css';

import data from '../../Configs/ConfigFileLocations.json';

const configUrl = data.find(item=>item.configuration==='gallery').url;

const Carousel = (props) => {
    const [ selectedImageName, setSelectedImageName ] = useState('');
    const [ galleryImages, setGalleryImages ] = useState([]);

    const { sendRequest: fetchImageReferences } = useHttp();
    const params = useParams();
    const navigate = useHistory();

    const galleryConfigurationUrl = `${configUrl}${props.configSettingFile}`;
    const responseImageObject = props.imagesObject;
    const defaultPage = props.defaultPage;
    const fontAwesomeArrowIcons = `${props.fontAwesomeArrowIcons ? props.fontAwesomeArrowIcons : 'fas fa-angle'}`
    const imageName = params.imageName ? params.imageName : '';
    
    useEffect(() => {
        const transformData = data =>{
            const processingGalleryImages = (item, baseUrl) => {
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
            
            const galleryImages = [];
            
            for (const item in data[responseImageObject]) {
                galleryImages.push(processingGalleryImages(data[responseImageObject][item], baseUrl)); 
            }

            const notFound = galleryImages.filter((item) => {
                return item.fileName === imageName;
            });
    
            if(notFound.length === 0 && imageName){
                navigate.push(defaultPage);
            }

            const initialImage = galleryImages.filter((item) => {
                return parseInt(item.order) === 1;
            });

            if(initialImage === 1){
                setSelectedImageName(initialImage[0].fileName);
            }            

            const sortedGalleryImages = galleryImages.sort((a, b) => {
                return a.order - b.order;
            });

            setGalleryImages(sortedGalleryImages);
        }
    
        fetchImageReferences(
            { url: galleryConfigurationUrl },
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