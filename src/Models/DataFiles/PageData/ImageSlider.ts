class ImageSlider {
    auto: boolean = false;
    timer: number = 0;
    arrowIcons: string = "";
    size: string = "";

    constructor(imageSlider? : {
        auto: boolean,
        timer: number,
        arrowIcons: string,
        size: string
    }){
        if(imageSlider){
            this.auto = false;
            this.timer = 0;
            this.arrowIcons = "";
            this.size = "";
        } else {
            this.auto = false;
            this.timer = 0;
            this.arrowIcons = "";
            this.size = "";
        }
    }
}

export default ImageSlider;