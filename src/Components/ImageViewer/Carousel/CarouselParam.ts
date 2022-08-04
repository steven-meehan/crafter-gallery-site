class CarouselParam {
    imageName: string = "";

    constructor(imageName?: string){
        if(imageName){
            this.imageName = imageName ? imageName : "";
        } else {
            this.imageName = "";
        }
    }
}

export default CarouselParam;