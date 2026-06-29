import BackgroundColor from './BackgroundColor';

export interface NavLink {
  url: string;
  id: string;
  order: number;
  name: string;
  title: string;
  active: boolean;
  internalLink: boolean;
  social: boolean;
  icon: string;
  childLinks: NavLink[];
}

export interface NavigationData {
  logoAltText: string;
  backgroundColor: BackgroundColor;
  togglerUsesPrimaryColor: boolean;
  links: NavLink[];
}

export default NavigationData;
