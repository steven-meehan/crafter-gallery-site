import { ReactNode } from "react";

class PageProps {
    seoPageConfig: string = "";
    dataFileUrl: string = "";
    children?: ReactNode;

    constructor(pageProps?: {
        seoPageConfig: string,
        dataFileUrl: string,
        children?: ReactNode
    }){
        if(pageProps){
            this.seoPageConfig = pageProps.seoPageConfig ? pageProps.seoPageConfig : "";
            this.dataFileUrl = pageProps.dataFileUrl ? pageProps.dataFileUrl : "";
            this.children = pageProps.children ? pageProps.children : undefined;
        } else {
            this.seoPageConfig = "";
            this.dataFileUrl = "";
            this.children = undefined;
        }
    }
}

export default PageProps;