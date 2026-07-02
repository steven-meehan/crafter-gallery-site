import { GalleryActions as GalleryActionsConfig, GalleryButtonLabels } from '../models/GalleryConfig';

interface GalleryActionsProps {
  actions: GalleryActionsConfig | undefined;
  labels: GalleryButtonLabels;
  itemTitle: string;
  /** Canonical absolute URL of the current piece — replaces the Image-Url placeholder in botEndpoint. */
  itemUrl?: string;
}

interface ResolvedAction {
  label: string;
  href: string;
  isBot: boolean;
}

/**
 * Builds the action URL for a slot.
 *
 * botEndpoint supports two modes:
 *   1. Token mode — if the endpoint contains the literal strings "Image-Name" or "Image-Url",
 *      both are replaced with encoded values and the result opens in a new tab (pre-filled form).
 *      Works with any form provider — Microsoft Forms, Typeform, Google Forms, etc.
 *   2. Legacy mode — no tokens: appends ?item={title} and opens in the same tab.
 */
function resolveSlot(
  slot: GalleryActionsConfig[keyof GalleryActionsConfig],
  direct: string,
  bot: string,
  itemTitle: string,
  itemUrl: string,
): ResolvedAction | null {
  if (!slot) return null;

  const directUrl = slot.storeUrl?.trim() ?? slot.fileUrl?.trim() ?? '';
  if (directUrl) return { label: direct, href: directUrl, isBot: false };

  const endpoint = slot.botEndpoint?.trim() ?? '';
  if (!endpoint) return null;

  const hasTokens = endpoint.includes('Image-Name') || endpoint.includes('Image-Url');
  if (hasTokens) {
    const url = endpoint
      .replace('Image-Name', encodeURIComponent(itemTitle))
      .replace('Image-Url', encodeURIComponent(itemUrl));
    return { label: bot, href: url, isBot: false };
  }

  // Legacy: plain endpoint, append item param, open in same tab
  return { label: bot, href: `${endpoint}?item=${encodeURIComponent(itemTitle)}`, isBot: true };
}

const GalleryActions: React.FC<GalleryActionsProps> = ({ actions, labels, itemTitle, itemUrl = '' }) => {
  const buttons = [
    resolveSlot(actions?.purchase, labels.purchaseDirect, labels.purchaseBot, itemTitle, itemUrl),
    resolveSlot(actions?.sample,   labels.sampleDirect,   labels.sampleBot,   itemTitle, itemUrl),
    resolveSlot(actions?.useCase,  labels.useCaseDirect,  labels.useCaseBot,  itemTitle, itemUrl),
  ].filter(Boolean) as ResolvedAction[];

  if (!buttons.length) return null;

  return (
    <div className="d-flex flex-wrap gap-2 justify-content-center my-3">
      {buttons.map((btn, i) => (
        <a
          key={i}
          href={btn.href}
          target={btn.isBot ? '_self' : '_blank'}
          rel={btn.isBot ? undefined : 'noopener noreferrer'}
          className="btn btn-primary"
        >
          {btn.label}
        </a>
      ))}
    </div>
  );
};

export default GalleryActions;
