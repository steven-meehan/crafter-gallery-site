import siteConfig from '../ConfigFiles/site.config.json';

const { footer } = siteConfig;

const Footer: React.FC = () => {
  const copyrightNotice = footer.copyright.url ? (
    <a href={footer.copyright.url} title={footer.copyright.title} target="_blank" rel="noopener noreferrer">
      {footer.copyright.name}
    </a>
  ) : footer.copyright.name;

  const designer = footer.designer.url ? (
    <a href={footer.designer.url} title={footer.designer.title} target="_blank" rel="noopener noreferrer">
      {footer.designer.name}
    </a>
  ) : footer.designer.name;

  return (
    <div className="container mt-4">
      <footer className={`text-${footer.fontColor} py-3 border-top text-center`}>
        <p className="mb-1">Site content is &copy; {copyrightNotice}</p>
        {footer.designer.display && (
          <p className="mb-0 small">Site designed by {designer}.</p>
        )}
      </footer>
    </div>
  );
};

export default Footer;
