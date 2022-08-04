class ConfigFile {
   configuration: string = "";
   url: string = "";

   constructor(item?: {
    configuration: string,
    url:string
   }){
    if(item){
        this.configuration = item.configuration ? item.configuration : "";
        this.url = item.url ? item.url : "";
    } else {
        this.configuration = "";
        this.url = "";
    }
   }
}

export default ConfigFile;