import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import ImageSlider from './ImageSlider';

import useHttp from '../../Hooks/useHttp';
import classes from './Carousel.module.css';

const Carousel = (props) => {
    const [ imageReferences, setImageReferences ] = useState([]);
    const [ selectedImage, setselectedImage ] = useState('');
    const [ pageHeader, setpageHeader ] = useState(null);
    const { sendRequest: fetchImageReferences } = useHttp();
    const params = useParams();
    const navigate = useHistory();

    const galleryConfiguration = `http://s3.us-east-1.amazonaws.com/www.handmadehighjinks.com/configs/${props.configSettingFile}`;
    const responseImageObject = props.imagesObject;
    const defaultPage = props.defaultPage;
    const fontAwesomeArrowIcons = `${props.fontAwesomeArrowIcons ? props.fontAwesomeArrowIcons : 'fas fa-angle'}`
    const imageName = params.imageName ? params.imageName : '';

    useEffect(() => {
        const transformData = data =>{
            const loadedGalleryConfiguration = [];
            const baseUrl = data.baseUrl;
            setpageHeader(data.pageHeader);
            
            const transformImageData = (item, baseUrl) => {
                return {
                    title: item.title,
                    altText: item.altText,
                    fileName: item.fileName,
                    order: item.order,
                    description: item.description,
                    url: `${baseUrl}${item.fileName}`,
                    externalLink: `${item.etsyLink && item.etsyLink.trim() !== '' ? item.etsyLink : ''}`
                }
            }
            
            const localSelectedImage = transformImageData(data[responseImageObject][0], baseUrl);
            setselectedImage(localSelectedImage.fileName);

            for (const item in data[responseImageObject]) {
                loadedGalleryConfiguration.push(transformImageData(data[responseImageObject][item], baseUrl));

                if(imageName && data[responseImageObject][item].fileName === imageName){
                    setselectedImage(data[responseImageObject][item].fileName);
                }
            }

            const notFound = loadedGalleryConfiguration.filter((item) => {
                return item.fileName === imageName;
            });

            if(notFound.length === 0 && imageName){
                navigate.push(defaultPage);
            }

            const sortedGalleryConfiguration = loadedGalleryConfiguration.sort((a, b) => {
                return a.order - b.order;
            });

            setImageReferences(sortedGalleryConfiguration);
        }
    
        fetchImageReferences(
            { url: galleryConfiguration },
            transformData
        );
    }, [galleryConfiguration, responseImageObject, defaultPage, imageName, imageReferences, selectedImage, pageHeader, fetchImageReferences]);

    return (
        <Fragment>
            <ImageSlider 
                images={imageReferences}
                defaultPage={defaultPage}
                galleryTitle={responseImageObject}
                arrowIcon={fontAwesomeArrowIcons} 
                startWithImage={selectedImage ? true : false}
                renderImageUrls={true}
                initialImage={selectedImage} />
            <ImageSlider 
                images={imageReferences}
                defaultPage={defaultPage}
                isThumbnailBar={true} />  
        </Fragment>
    );
}

export default Carousel; 