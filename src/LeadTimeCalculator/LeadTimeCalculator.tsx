import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import parse from 'html-react-parser';

import useHttp from '../UseHttp/useHttp';
import Spinner from '../Spinner/Spinner';
import type { LeadTimeCalculatorConfig, ProductType, VerdictConfig } from './models/LeadTimeCalculatorConfig';
import siteConfig from '../ConfigFiles/site.config.json';
import classes from './LeadTimeCalculator.module.css';

interface LeadTimeCalculatorProps {
  dataFileUrl: string;
  pageTitle: string;
}

interface VerdictState {
  config: VerdictConfig;
  headline: string;
  detail: string;
}

function interpolate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '');
}

function computeVerdict(
  dateValue: string,
  selectedProduct: ProductType,
  buildBufferDays: number,
  verdicts: LeadTimeCalculatorConfig['verdicts']
): VerdictState {
  if (!dateValue) {
    return { config: verdicts.noDate, headline: verdicts.noDate.headline, detail: verdicts.noDate.detail };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const reveal = new Date(dateValue);
  reveal.setHours(0, 0, 0, 0);
  const daysUntil = Math.round((reveal.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const vars: Record<string, string> = {
    days: String(daysUntil),
    productLabel: selectedProduct.label.toLowerCase(),
    minDays: String(selectedProduct.minDays),
    maxDays: String(selectedProduct.maxDays),
  };

  let raw: VerdictConfig;
  if (daysUntil < 0) {
    raw = verdicts.past;
  } else if (daysUntil >= selectedProduct.maxDays + buildBufferDays) {
    raw = verdicts.clear;
  } else if (daysUntil >= selectedProduct.maxDays) {
    raw = verdicts.clearWithNote;
  } else if (daysUntil >= selectedProduct.minDays) {
    raw = verdicts.tight;
  } else {
    raw = verdicts.tooTight;
  }

  return {
    config: raw,
    headline: interpolate(raw.headline, vars),
    detail: interpolate(raw.detail, vars),
  };
}

const MountainMark = ({ cssClasses, watermark = false }: { cssClasses: string; watermark?: boolean }) => (
  <svg
    className={cssClasses}
    viewBox="0 0 64 40"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {!watermark && <path className={classes.markFill} d="M2 32 L16 14 L24 24 L32 6 L40 24 L48 14 L62 32 Z" />}
    {!watermark && <path className={classes.markStroke} d="M2 32 L16 14 L20 19" />}
    {!watermark && <path className={classes.markStroke} d="M16 32 L24 24 L28 28.5" />}
    <path d="M22 32 L32 6 L42 32" />
    {!watermark && <path className={classes.markStroke} d="M36 28.5 L40 24 L48 32" />}
    {!watermark && <path className={classes.markStroke} d="M44 19 L48 14 L62 32" />}
  </svg>
);

const LeadTimeCalculator: React.FC<LeadTimeCalculatorProps> = ({ dataFileUrl, pageTitle }) => {
  const { sendRequest, isLoading, error } = useHttp();
  const [config, setConfig] = useState<LeadTimeCalculatorConfig | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [dateValue, setDateValue] = useState<string>('');
  const [verdict, setVerdict] = useState<VerdictState | null>(null);

  const loadConfig = useCallback(() => {
    sendRequest(
      { url: dataFileUrl, cacheAge: siteConfig.cacheAgeMs, cacheVersion: siteConfig.cacheVersion },
      (data: LeadTimeCalculatorConfig) => {
        setConfig(data);
        if (data.productTypes.length > 0) {
          setSelectedProductId(data.productTypes[0].id);
        }
      }
    );
  }, [sendRequest, dataFileUrl]);

  useState(() => { loadConfig(); });

  if (isLoading) return <Spinner />;
  if (error.length > 0 || !config) return <p className="text-danger text-center my-4">{error[0] ?? 'Failed to load calculator.'}</p>;

  const today = new Date().toISOString().split('T')[0];
  const selectedProduct = config.productTypes.find(p => p.id === selectedProductId) ?? config.productTypes[0];

  const handleCheck = () => {
    setVerdict(computeVerdict(dateValue, selectedProduct, config.buildBufferDays, config.verdicts));
  };

  const pageHeadTitle = pageTitle ? `${pageTitle} — ${siteConfig.seo.siteName}` : siteConfig.seo.siteName;

  return (
    <>
      <Helmet>
        <title>{pageHeadTitle}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={config.subtext} />
        <meta property="og:title" content={pageHeadTitle} />
        <meta property="og:description" content={config.subtext} />
        <meta property="og:url" content={window.location.href} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className={classes.calculator}>
        <div className={classes.card}>
          <MountainMark cssClasses={classes.mark} />

          {config.eyebrow && <div className={classes.eyebrow}>{config.eyebrow}</div>}

          <h1 className={classes.headline}>{config.headline}</h1>
          <p className={classes.subtext}>{config.subtext}</p>

          <div className={classes.field}>
            <label className={classes.fieldLabel} htmlFor="ltc-date">{config.dateLabel}</label>
            <input
              id="ltc-date"
              type="date"
              className={classes.dateInput}
              min={today}
              value={dateValue}
              onChange={e => { setDateValue(e.target.value); setVerdict(null); }}
            />
          </div>

          <div className={classes.field}>
            <span className={classes.fieldLabel}>{config.productLabel}</span>
            <div className={classes.productOptions}>
              {config.productTypes.map(product => (
                <button
                  key={product.id}
                  type="button"
                  className={`${classes.productOption} ${product.id === selectedProductId ? classes.productOptionActive : ''}`}
                  onClick={() => { setSelectedProductId(product.id); setVerdict(null); }}
                >
                  {product.label}
                  <span className={classes.shippingLabel}>{product.shippingLabel}</span>
                </button>
              ))}
            </div>
          </div>

          <button type="button" className={classes.checkButton} onClick={handleCheck}>
            {config.buttonText}
          </button>

          {verdict && (
            <div className={`${classes.verdict} ${verdict.config.variant === 'good' ? classes.verdictGood : classes.verdictTight}`}>
              <MountainMark cssClasses={classes.verdictWatermark} watermark />
              <div className={classes.verdictLabel}>{verdict.config.label}</div>
              <div className={classes.verdictHeadline}>{verdict.headline}</div>
              <p className={classes.verdictDetail}>{parse(verdict.detail)}</p>
              {verdict.config.showCta && verdict.config.ctaText && verdict.config.ctaUrl && (
                <a href={verdict.config.ctaUrl} className={classes.cta}>
                  {verdict.config.ctaText}
                </a>
              )}
            </div>
          )}

          {config.footnote && <p className={classes.footnote}>{parse(config.footnote)}</p>}
        </div>
      </div>
    </>
  );
};

export default LeadTimeCalculator;
