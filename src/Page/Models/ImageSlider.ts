class ImageSlider {
    auto: boolean = false;
    timer: number = 0;
    arrowIcons: string = "";
    size: string = "";
    marginTop?: boolean = false;

    constructor(imageSlider? : {
        auto: boolean,
        timer: number,
        arrowIcons: string,
        size: string,
        marginTop?: boolean
    }){
        if(imageSlider){
            this.auto = imageSlider.auto ? imageSlider.auto : false;
            this.timer = imageSlider.timer ? imageSlider.timer : 0;
            this.arrowIcons = imageSlider.arrowIcons ? imageSlider.arrowIcons : "";
            this.size = imageSlider.size ? imageSlider.size : "";
            this.marginTop = imageSlider.marginTop ? imageSlider.marginTop : false;
        } else {
            this.auto = false;
            this.timer = 0;
            this.arrowIcons = "";
            this.size = "";
            this.marginTop = false;
        }
    }
}

export default ImageSlider;