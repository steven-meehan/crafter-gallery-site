class CachedItem {
    data: string;
    timestamp: number = Date.now();

    constructor(cachedItem: {
        data: string,
        timestamp: number
    }){
        if(cachedItem){
            this.data = cachedItem.data ? cachedItem.data : "";
            this.timestamp = cachedItem.timestamp ? cachedItem.timestamp : 0;
        } else {
            this.data = "";
            this.timestamp = 0;
        }
    }
}

export default CachedItem;