import LinkKeyDefinition from "./LinkKeyDefinition";

class ImageExternalLinkConstants {
    store: LinkKeyDefinition = new LinkKeyDefinition();
    form: LinkKeyDefinition = new LinkKeyDefinition();

    constructor(imageExternalLinkConstants?: {
        store: LinkKeyDefinition,
        form: LinkKeyDefinition
    }){
        if(imageExternalLinkConstants){
            this.store = imageExternalLinkConstants.store ? imageExternalLinkConstants.store : new LinkKeyDefinition();
            this.form = imageExternalLinkConstants.form ? imageExternalLinkConstants.form : new LinkKeyDefinition();
        } else {
            this.store = new LinkKeyDefinition();
            this.form = new LinkKeyDefinition();
        }
    }
}

export default ImageExternalLinkConstants;
