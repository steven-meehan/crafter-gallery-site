class RedirectOptions {
    behavior: boolean = false;
    path: string = "";

    constructor(redirect?: {
        behavior: boolean,
        path: string
    }){
        if(redirect){
            this.behavior = redirect.behavior ? redirect.behavior : false;
            this.path = redirect.path ? redirect.path : "";
        } else {
            this.behavior = false;
            this.path = "";
        }
    }
}

export default RedirectOptions;