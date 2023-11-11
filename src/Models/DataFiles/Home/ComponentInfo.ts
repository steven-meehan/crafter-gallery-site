import ComponentType from "./ComponentType";
import ImageData from "../../ImageData";
import ParagraphData from "../../ParagraphData";
import Slider from "./SliderInfo";

class ComponentInfo {
    active: boolean = false;
    order: number = 0;
    component: ComponentType = ComponentType.Undefined;
    baseUrl: string = "";
    images: ImageData[] = [];
    paragraphs: ParagraphData[] = [];
    slider: Slider = new Slider();

    constructor(componentInfo?: {
        active: boolean,
        order: number,
        component: string,
        baseUrl: string,
        images: ImageData[],
        paragraphs: ParagraphData[],
        slider: Slider
    }){
        if(componentInfo){
            this.active = componentInfo.active ? componentInfo.active : false;
            this.order = componentInfo.order ? componentInfo.order : 0;

            switch (componentInfo.component) {
                case ComponentType.Info:
                    this.component = ComponentType.Carousel;
                    break;
                case ComponentType.Image:
                    this.component = ComponentType.Image;
                    break;
                case ComponentType.Carousel:
                    this.component = ComponentType.Carousel;
                    break;
                case ComponentType.Gallery:
                    this.component = ComponentType.Gallery;
                    break;
                case ComponentType.Page:
                    this.component = ComponentType.Page;
                    break;
                default:
                    this.component = ComponentType.Undefined;
                    break;
            }

            this.baseUrl = componentInfo.baseUrl ? componentInfo.baseUrl : "";
            this.images = componentInfo.images ? componentInfo.images.map(item => new ImageData(item)) : [];
            this.paragraphs = componentInfo.paragraphs ? componentInfo.paragraphs.map(item => new ParagraphData(item)) : [];
            this.slider = componentInfo.slider ? new Slider(componentInfo.slider) : new Slider();
        } else {
            this.active = false;
            this.order = 0;
            this.component = ComponentType.Undefined;
            this.baseUrl = "";
            this.images = [];
            this.paragraphs = [];
            this.slider = new Slider();
        }
    }
}

export default ComponentInfo;