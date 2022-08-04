import LayoutInfo from "./LayoutInfo";

class HomeConfig {
    pageHeader: string = "";
    layout: LayoutInfo = new LayoutInfo();

    constructor(homeConfig?: {
        pageHeader: string,
        layout: LayoutInfo
    }){
        if(homeConfig){
            this.pageHeader = homeConfig.pageHeader ? homeConfig.pageHeader : "";
            this.layout = homeConfig.layout ? new LayoutInfo(homeConfig.layout) : new LayoutInfo();
        } else {
            this.pageHeader = "";
            this.layout = new LayoutInfo();
        }
    }
}

export default HomeConfig;