class SliderInfo {
    auto: boolean = false;
    timer: number = 0;
    arrowIcons: string = "";
    size: string = "";

    constructor(slider?: {
        auto: boolean,
        timer: number,
        arrowIcons: string,
        size: string
    }){
        if(slider){
            this.auto = slider.auto ? true : false;
            this.timer = slider.timer ? slider.timer : 60000;
            this.arrowIcons = slider.arrowIcons ? slider.arrowIcons : `fas fa-angle`;
            this.size = slider.size ? slider.size : "65%";
        } else {
            this.auto = false;
            this.timer = 60000;
            this.arrowIcons = `fas fa-angle`;
            this.size = "65%";
        }
    }
}

export default SliderInfo