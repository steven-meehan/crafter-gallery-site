import { GalleryActions as GalleryActionsConfig, GalleryButtonLabels } from '../models/GalleryConfig';

interface GalleryActionsProps {
  actions: GalleryActionsConfig | undefined;
  labels: GalleryButtonLabels;
  itemTitle: string;
}

interface ResolvedAction {
  label: string;
  href: string;
  isBot: boolean;
}

function resolveSlot(
  slot: GalleryActionsConfig[keyof GalleryActionsConfig],
  direct: string,
  bot: string,
  itemTitle: string
): ResolvedAction | null {
  if (!slot) return null;
  const directUrl = slot.storeUrl?.trim() ?? slot.fileUrl?.trim() ?? '';
  if (directUrl) return { label: direct, href: directUrl, isBot: false };
  if (slot.botEndpoint?.trim()) {
    const url = `${slot.botEndpoint}?item=${encodeURIComponent(itemTitle)}`;
    return { label: bot, href: url, isBot: true };
  }
  return null;
}

const GalleryActions: React.FC<GalleryActionsProps> = ({ actions, labels, itemTitle }) => {
  const buttons = [
    resolveSlot(actions?.purchase, labels.purchaseDirect, labels.purchaseBot, itemTitle),
    resolveSlot(actions?.sample,   labels.sampleDirect,   labels.sampleBot,   itemTitle),
    resolveSlot(actions?.useCase,  labels.useCaseDirect,  labels.useCaseBot,  itemTitle),
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
