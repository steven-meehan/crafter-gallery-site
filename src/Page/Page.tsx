import { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import PageProps from './PageProps';
import preparePageComponents from './PageProcessor';
import PageData from './Models/PageData';
import useHttp from '../UseHttp/useHttp';
import Spinner from '../Spinner/Spinner';
import PageRow from './PageRow/PageRow';

import siteConfig from '../ConfigFiles/site.config.json';

const Page: React.FC<PageProps> = (props) => {
  const { sendRequest, isLoading, error } = useHttp();
  const [pageRows, setPageRows] = useState<JSX.Element[]>([]);
  const [header, setHeader] = useState('');

  useEffect(() => {
    setPageRows([]);
    setHeader('');

    const transformData = (data: PageData) => {
      setHeader(data.header);
      const pageComponents = preparePageComponents(data);
      const contentRows = [...data.layout.rows]
        .sort((a, b) => a.order - b.order)
        .map((row): JSX.Element => (
          <div key={`${data.name}-page-row-${row.order}`} className="mb-4">
            <PageRow
              pageRow={row}
              pageComponents={pageComponents.filter(item => item.componentRow === row.order)}
            />
          </div>
        ));
      setPageRows(contentRows);
    };

    sendRequest(
      { url: props.dataFileUrl, cacheAge: siteConfig.cacheAgeMs, cacheVersion: siteConfig.cacheVersion },
      transformData
    );
  }, [sendRequest, props.dataFileUrl]);

  const pageTitle = header
    ? `${header} — ${siteConfig.seo.siteName}`
    : siteConfig.seo.siteName;

  return (
    <Fragment>
      <Helmet>
        <title>{pageTitle}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={siteConfig.seo.defaultDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteConfig.seo.siteName} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={siteConfig.seo.defaultDescription} />
        {siteConfig.seo.defaultImageUrl && <meta property="og:image" content={siteConfig.seo.defaultImageUrl} />}
        {siteConfig.seo.defaultImageUrl && <meta property="og:image:alt" content={siteConfig.seo.defaultImageAltText} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={siteConfig.seo.defaultDescription} />
        {siteConfig.seo.defaultImageUrl && <meta name="twitter:image" content={siteConfig.seo.defaultImageUrl} />}
        {siteConfig.seo.defaultImageUrl && <meta name="twitter:image:alt" content={siteConfig.seo.defaultImageAltText} />}
      </Helmet>
      {isLoading && <Spinner />}
      {!isLoading && error.length === 0 && pageRows.length > 0 && (
        <div className="row">
          <div className="col">
            {header && (
              <div className="row">
                <div className="col">
                  <h1>{header}</h1>
                </div>
              </div>
            )}
            {pageRows}
          </div>
        </div>
      )}
      {error.length > 0 && (
        <p className="text-danger text-center my-4">{error[0]}</p>
      )}
    </Fragment>
  );
};

export default Page;
