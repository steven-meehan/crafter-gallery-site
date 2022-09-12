import ComponentType from '../../DataFiles/Home/ComponentType';
import ComponentOptions from './ComponentOptions'
import RedirectOptions from './RedirectOptions';

class RouteDefinition {
    path: string = "";
    page: string = "";
    sectionRoot: boolean = false;
    component: ComponentType = ComponentType.Undefined;
    componentOptions: ComponentOptions | null = null;
    redirect: RedirectOptions | null = null;

    constructor(routeDefinition?: {
        path: string,
        page: string,
        sectionRoot: boolean,
        component: string,
        componentOptions: ComponentOptions | null,
        redirect: RedirectOptions | null
    }){
        if(routeDefinition){
            this.path = routeDefinition.path ? routeDefinition.path : "";
            this.page = routeDefinition.page ? routeDefinition.page : "";
            this.sectionRoot = routeDefinition.sectionRoot ? routeDefinition.sectionRoot : false;

            switch (routeDefinition.component) {
                case ComponentType.Info:
                    this.component = ComponentType.Carousel;
                    break;
                case ComponentType.Image:
                    this.component = ComponentType.Image;
                    break;
                case ComponentType.Carousel:
                    this.component = ComponentType.Carousel;
                    break;
                case ComponentType.Gallery:
                    this.component = ComponentType.Gallery;
                    break;
                case ComponentType.Page:
                    this.component = ComponentType.Page;
                    break;
                default:
                    this.component = ComponentType.Undefined;
                    break;
            }

            this.componentOptions = routeDefinition.componentOptions ? new ComponentOptions(routeDefinition.componentOptions) :  null;
            this.redirect = routeDefinition.redirect ? new RedirectOptions(routeDefinition.redirect) : null;
        } else {
            this.path = "";
            this.page = "";
            this.sectionRoot = false;
            this.component = ComponentType.Undefined;
            this.componentOptions = null;
            this.redirect = null;
        }
    }
}

export default RouteDefinition;