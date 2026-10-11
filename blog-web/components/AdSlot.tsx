'use client';

interface AdSlotProps {
  position?: 'header' | 'in-article' | 'sidebar' | 'footer';
  className?: string;
  adClient?: string;
  adSlot?: string;
}

export default function AdSlot({
  position = 'in-article',
  className = '',
  adClient,
  adSlot
}: AdSlotProps) {
  const effectiveClient = adClient || process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const effectiveSlot = adSlot || process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;

  // Se você tiver o código do AdSense configurado, renderiza o script real
  if (effectiveClient && effectiveSlot) {
    return (
      <div className={`my-8 text-center overflow-hidden ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={effectiveClient}
          data-ad-slot={effectiveSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Enquanto o AdSense não estiver configurado, não exibe nada para manter o site limpo e profissional
  return null;
}
