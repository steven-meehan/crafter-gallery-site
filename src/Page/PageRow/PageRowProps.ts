import { ReactNode } from "react";

import Row from "../Models/Row";
import PageComponent from "../Models/PageComponent";

class PageRowProps {
    pageRow: Row = new Row();
    pageComponents: PageComponent[] = [];
    children?: ReactNode;
}

export default PageRowProps;
