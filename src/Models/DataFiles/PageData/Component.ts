import ColumnPosition from "./ColumnPosition";
import ComponentType from "./ComponentType";
import Paragraph from "../../Paragraph";
import ImageData from "../../ImageData";
import ImageSlider from "./ImageSlider";

class Component {
    active: boolean = false;
    row: number = 0;
    order: number = 0;
    columnPosition: ColumnPosition = ColumnPosition.Left;
    componentType: ComponentType = ComponentType.Info;
    paragraphs?: Paragraph[];
    imageFiles?: ImageData[];
    imageSlider?: ImageSlider = new ImageSlider(); 

    constructor(component?: {
        active: boolean,
        row: number,
        order: number,
        columnPosition: ColumnPosition,
        componentType: ComponentType,
        paragraphs?: Paragraph[],
        imageFiles?: ImageData[],
        imageSlider?: ImageSlider
    }){
        if(component){
            this.active = component.active ? component.active : false;
            this.row = component.row ? component.row : 0;
            this.order = component.order ? component.order : 0;
            this.columnPosition = component.columnPosition ? component.columnPosition : ColumnPosition.Left;
            this.componentType = component.componentType ? component.componentType : ComponentType.Info;
            this.paragraphs = component.paragraphs ? component.paragraphs.map(item => new Paragraph(item)) : [];
            this.imageFiles = component.imageFiles ? component.imageFiles.map(item => new ImageData(item)) : [];
            this.imageSlider = component.imageSlider ? component.imageSlider : new ImageSlider();
        } else {
            this.active = false;
            this.row = 0;
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