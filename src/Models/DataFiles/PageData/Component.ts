import ColumnPosition from "./ColumnPosition";
import ComponentType from "./ComponentType";
import Paragraph from "../../Paragraph";
import ImageFile from "../../ImageFile";
import ImageSlider from "./ImageSlider";

class Component {
    active: boolean = false;
    order: number = 0;
    columnPosition: ColumnPosition = ColumnPosition.Left;
    componentType: ComponentType = ComponentType.Info;
    paragraphs?: Paragraph[];
    imageFiles?: ImageFile[];
    imageSlider?: ImageSlider = new ImageSlider(); 

    constructor(component?: {
        active: boolean,
        order: number,
        columnPosition: ColumnPosition,
        componentType: ComponentType,
        paragraphs?: Paragraph[],
        imageFiles?: ImageFile[],
        imageSlider?: ImageSlider
    }){
        if(component){
            this.active = component.active ? component.active : false;
            this.order = component.order ? component.order : 0;
            this.columnPosition = component.columnPosition ? component.columnPosition : ColumnPosition.Left;
            this.componentType = component.componentType ? component.componentType : ComponentType.Info;
            this.paragraphs = component.paragraphs ? component.paragraphs.map(item => new Paragraph(item)) : [];
            this.imageFiles = component.imageFiles ? component.imageFiles.map(item => new ImageFile(item)) : [];
            this.imageSlider = component.imageSlider ? component.imageSlider : new ImageSlider();
        } else {
            this.active = false;
            this.order = 0;
            this.columnPosition = ColumnPosition.Left;
            this.componentType = ComponentType.Info;
            this.paragraphs = [];
            this.imageFiles = [];
            this.imageSlider = new ImageSlider();
        }
    }
}

export default Component;