import { useState, useEffect } from 'react';

import Navbar from '../Navbar/Navbar';
import useHttp from '../../UseHttp/useHttp';
import type { NavigationData, NavLink } from '../../Routing/NavigationConfigFile';
import BackgroundColor from '../../Routing/BackgroundColor';
import type { GalleryManifest } from '../../Galleries/models/GalleryManifest';

import siteConfig from '../../ConfigFiles/site.config.json';

const Header: React.FC = () => {
  const [navigationLinks, setNavigationLinks] = useState<NavLink[]>([]);
  const [socialLinks, setSocialLinks] = useState<NavLink[]>([]);
  const [logoAltText, setLogoAltText] = useState('');
  const [backgroundColor, setBackgroundColor] = useState<BackgroundColor>();
  const [togglerUsesPrimaryColor, setTogglerUsesPrimaryColor] = useState(false);
  const [galleries, setGalleries] = useState<GalleryManifest['galleries']>([]);

  const { sendRequest } = useHttp();

  useEffect(() => {
    sendRequest(
      { url: `${siteConfig.dataBaseUrl}navigation.json`, cacheAge: siteConfig.cacheAgeMs, cacheVersion: siteConfig.cacheVersion },
      (data: NavigationData) => {
        const active = data.links
          .filter(l => l.active)
          .map(item => ({ ...item, id: item.id || item.url.substring(1) }));
        setNavigationLinks(active.filter(l => !l.social).sort((a, b) => a.order - b.order));
        setSocialLinks(active.filter(l => l.social).sort((a, b) => a.order - b.order));
        setLogoAltText(data.logoAltText);
        setBackgroundColor(data.backgroundColor);
        setTogglerUsesPrimaryColor(data.togglerUsesPrimaryColor);
      }
    );

    sendRequest(
      { url: `${siteConfig.dataBaseUrl}galleries.json`, cacheAge: siteConfig.cacheAgeMs, cacheVersion: siteConfig.cacheVersion },
      (data: GalleryManifest) => setGalleries(data.galleries ?? [])
    );
  }, [sendRequest]);

  // Inject per-gallery child links under any nav item pointing to "/"
  const navlinksWithGalleries: NavLink[] = navigationLinks.map(link => {
    if (link.url !== '/' || galleries.length < 2) return link;
    return {
      ...link,
      childLinks: galleries.map((g, i) => ({
        url: `/gallery/${g.slug}`,
        id: `gallery-${g.slug}`,
        order: i,
        name: g.title,
        title: g.title,
        active: true,
        internalLink: true,
        social: false,
        icon: '',
        childLinks: [],
      })),
    };
  });

  return (
    <header>
      <Navbar
        logoAltText={logoAltText}
        navlinks={navlinksWithGalleries}
        socialNavLinks={socialLinks}
        backgroundColor={backgroundColor}
        headerCssClasses=""
        togglerUsesPrimaryColor={togglerUsesPrimaryColor}
      />
    </header>
  );
};

export default Header;
