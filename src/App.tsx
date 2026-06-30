import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Header from './Header/Header/Header';
import Footer from './Footer/Footer';
import Spinner from './Spinner/Spinner';
import GalleryIndex from './Galleries/GalleryIndex/GalleryIndex';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

import siteConfigRaw from './ConfigFiles/site.config.json';
import classes from './App.module.css';
import type { SiteConfig } from './config/SiteConfig';
import { validateSiteConfig } from './config/validateSiteConfig';
import { purgeStaleCache } from './UseHttp/useHttp';

validateSiteConfig(siteConfigRaw);
const siteConfig: SiteConfig = siteConfigRaw;

purgeStaleCache(siteConfig.cacheVersion);

const GalleryView = lazy(() => import('./Galleries/GalleryView/GalleryView'));
const Page = lazy(() => import('./Page/Page'));
const LeadTimeCalculator = lazy(() => import('./LeadTimeCalculator/LeadTimeCalculator'));

function NotFoundPage() {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="text-center my-5">
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <a href="/" className="btn btn-primary">Back to Galleries</a>
      </div>
    </>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className={classes.pageTransition}>
      {children}
    </div>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="container my-4">
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <PageTransition>
              <Routes>
                <Route
                  path="/"
                  element={
                    siteConfig.homePage
                      ? <Page
                          seoPageConfig={siteConfig.homePage.slug}
                          dataFileUrl={`${siteConfig.dataBaseUrl}${siteConfig.homePage.dataFile}`}
                        />
                      : <GalleryIndex />
                  }
                />
                <Route path="/gallery/:slug/:imageSlug?" element={<GalleryView />} />
                {siteConfig.pages.map(p => (
                  <Route
                    key={p.slug}
                    path={p.type === 'calculator' ? `/calculator/${p.slug}` : `/page/${p.slug}`}
                    element={
                      p.type === 'calculator'
                        ? <LeadTimeCalculator
                            pageTitle={p.title}
                            dataFileUrl={`${siteConfig.dataBaseUrl}${p.dataFile}`}
                          />
                        : <Page
                            seoPageConfig={p.slug}
                            dataFileUrl={`${siteConfig.dataBaseUrl}${p.dataFile}`}
                          />
                    }
                  />
                ))}
                <Route path="/not-found" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate replace to="/not-found" />} />
              </Routes>
              </PageTransition>
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
