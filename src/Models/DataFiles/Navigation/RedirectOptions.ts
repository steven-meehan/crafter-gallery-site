class RedirectOptions {
    enabled: boolean = false;
    path: string = "";

    constructor(redirect?: {
        enabled: boolean,
        path: string
    }){
        if(redirect){
            this.enabled = redirect.enabled ? redirect.enabled : false;
            this.path = redirect.path ? redirect.path : "";
        } else {
            this.enabled = false;
            this.path = "";
        }
    }
}

export default RedirectOptions;