import ComponentType from '../../DataFiles/Home/ComponentType';
import ComponentOptions from './ComponentOptions'
import RedirectOptions from './RedirectOptions';

class RouteDefinition {
    path: string = "";
    sectionRoot: boolean = false;
    component: ComponentType = ComponentType.Undefined;
    componentOptions: ComponentOptions | null = null;
    status: number = 200;
    redirect: RedirectOptions | null = null;

    constructor(routeDefinition?: {
        path: string,
        sectionRoot: boolean,
        component: string,
        componentOptions: ComponentOptions | null,
        status: number,
        redirect: RedirectOptions | null
    }){
        if(routeDefinition){
            this.path = routeDefinition.path ? routeDefinition.path : "";
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
                case ComponentType.Home:
                    this.component = ComponentType.Home;
                    break;
                default:
                    this.component = ComponentType.Undefined;
                    break;
            }

            this.componentOptions = routeDefinition.componentOptions ? new ComponentOptions(routeDefinition.componentOptions) :  null;
            this.status = routeDefinition.status ? routeDefinition.status : 200;
            this.redirect = routeDefinition.redirect ? new RedirectOptions(routeDefinition.redirect) : null;
        } else {
            this.path = "";
            this.sectionRoot = false;
            this.component = ComponentType.Undefined;
            this.componentOptions = null;
            this.status = 200;
            this.redirect = null;
        }
    }
}

export default RouteDefinition;