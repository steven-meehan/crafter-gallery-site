class LinkKeyDefinition {
    key: string = "";
    linkText1: string = "";
    linkText2: string = "";

    constructor(linkKeyDefinition?: {
        key: string,
        linkText1: string,
        linkText2: string        
    }){
        if(linkKeyDefinition){
            this.key = linkKeyDefinition.key ? linkKeyDefinition.key : "";
            this.linkText1 = linkKeyDefinition.linkText1 ? linkKeyDefinition.linkText1 : "";
            this.linkText2 = linkKeyDefinition.linkText2 ? linkKeyDefinition.linkText2 : "";
        } else {
            this.key = "";
            this.linkText1 = "";
            this.linkText2 = "";
        }
    }
}

export default LinkKeyDefinition;
