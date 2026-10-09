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
  // Se você tiver o código do AdSense configurado, renderiza o script real
  if (adClient && adSlot) {
    return (
      <div className={`my-8 text-center overflow-hidden ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Placeholder elegante pronto para quando ativar o Google AdSense
  return (
    <div
      className={`my-8 p-4 rounded-xl border border-dashed border-neutral-800 bg-neutral-900/40 text-center flex flex-col items-center justify-center min-h-[120px] text-neutral-500 text-xs transition-all ${className}`}
    >
      <span className="uppercase tracking-widest text-[10px] text-neutral-600 font-bold mb-1">
        Espaço Publicitário / AdSense
      </span>
      <p className="text-neutral-500 text-[11px]">
        Área otimizada para monetização automática ({position})
      </p>
    </div>
  );
}
