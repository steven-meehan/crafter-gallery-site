import { ReactNode } from "react";

import Row from "../../../Models/DataFiles/PageData/Row";
import PageComponent from "../../../Models/DataFiles/PageData/PageComponent";

class PageRowProps {
    pageRow: Row = new Row();
    pageComponents: PageComponent[] = [];
    children?: ReactNode;
}

export default PageRowProps;