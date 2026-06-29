import { ReactNode } from 'react';
import BackgroundColor from '../../Routing/BackgroundColor';
import type { NavLink } from '../../Routing/NavigationConfigFile';

interface NavbarProps {
  navbarClasses?: string;
  logoAltText: string;
  navlinks: NavLink[];
  socialNavLinks: NavLink[];
  backgroundColor?: BackgroundColor;
  headerCssClasses?: string;
  togglerUsesPrimaryColor?: boolean;
  children?: ReactNode;
}

export default NavbarProps;
