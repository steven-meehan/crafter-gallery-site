import Image from './ImageFiles/SiteImage/SiteImage';
import ImageSlider from './ImageSlider/ImageSlider';
import type Component from '../Page/Models/Component';
import type ImageData from './ImageData';

import classes from '../Images/ImageFiles/SiteImage/SiteImage.module.css';

function prepareImageComponent(component: Component, images: ImageData[], pageName: string): JSX.Element | null {
  if (images.length === 0) return null;

  const key = `${pageName}-image-component-${component.order}`;
  const slider = component.imageSlider;

  if (images.length === 1) {
    const img = images[0];
    return (
      <div key={key} className={classes.centered}>
        <Image
          image={img}
          setHelmetInfo={false}
          linkImageToContent={img.isLink ?? false}
          isContentInternal={false}
          urlForLinkedContent={img.externalUrl || img.imageUrl || ''}
          imageWidth={slider?.size ?? '100%'}
          marginTop={slider?.marginTop ?? false}
          displayBlurb={false}
          displayTitle={false}
          title={img.htmlTitle}
          isThumbnail={false}
          isStandAlone={true}
        />
      </div>
    );
  }

  return (
    <div key={key} className={classes.centered}>
      <ImageSlider
        images={images}
        disableTitle={true}
        setHelmetInfo={false}
        marginTop={slider?.marginTop ?? false}
        autoTransition={slider?.auto ?? false}
        autoTransitionTimer={slider?.timer ?? 60000}
        imageSize={slider?.size ?? '100%'}
      />
    </div>
  );
}

export default prepareImageComponent;
