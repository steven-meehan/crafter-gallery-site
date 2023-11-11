import Component from "./Component";
import Layout from "./Layout";

class PageData {
    name: string = "";
    header: string = "";
    layout: Layout = new Layout();
    components: Component[] = [];

    constructor(pageData?: {
        name: string,
        header: string,
        layout: Layout,
        components: Component[]
    }){
        if(pageData){
            this.name = pageData.name ? pageData.name : "";
            this.header = pageData.header ? pageData.header : "";
            this.layout = pageData.layout ? new Layout(pageData.layout) : new Layout();
            this.components = pageData.components ? pageData.components.map(item => new Component(item)) : [];
        } else {
            this.name = "";
            this.header = "";
            this.layout = new Layout();
            this.components = [];
        }
    }
}

export default PageData;
