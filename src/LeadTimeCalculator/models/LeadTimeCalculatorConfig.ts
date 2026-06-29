export interface ProductType {
  id: string;
  label: string;
  shippingLabel: string;
  minDays: number;
  maxDays: number;
}

export interface VerdictConfig {
  label: string;
  headline: string;
  detail: string;
  ctaText?: string;
  ctaUrl?: string;
  showCta: boolean;
  variant: 'good' | 'tight';
}

export interface LeadTimeCalculatorConfig {
  eyebrow?: string;
  headline: string;
  subtext: string;
  footnote?: string;
  dateLabel: string;
  productLabel: string;
  buttonText: string;
  buildBufferDays: number;
  productTypes: ProductType[];
  verdicts: {
    noDate: VerdictConfig;
    past: VerdictConfig;
    clear: VerdictConfig;
    clearWithNote: VerdictConfig;
    tight: VerdictConfig;
    tooTight: VerdictConfig;
  };
}
