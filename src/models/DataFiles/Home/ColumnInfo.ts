import ComponentInfo from "./ComponentInfo";

class ColumnInfo {
    number: number = 0;
    components: ComponentInfo[] = [];

    constructor(columnInfo?: {
        number: number,
        components: ComponentInfo[]
    }){
        if(columnInfo){
            this.number = columnInfo.number ? columnInfo.number : 0;
            this.components = columnInfo.components ? columnInfo.components.map(item => new ComponentInfo(item)) : [];
        } else {
            this.number = 0;
            this.components = [];
        }
    }
}

export default ColumnInfo;