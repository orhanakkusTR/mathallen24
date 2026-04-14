import React from 'react';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || '';

export function getImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('/api/images')) {
    return `${BASE_URL}${url}`;
  }
  if (url.startsWith('/uploads')) {
    return `${BASE_URL}/api${url}`;
  }
  return url;
}

export default function CampaignCard({ offer }) {
  const {
    product_name,
    offer_price,
    original_price,
    unit,
    category,
    image_url,
    is_best_price,
    multi_buy,
  } = offer;

  const imgSrc = getImageUrl(image_url);

  function PriceDisplay({ price, showUnit }) {
    const num = Number(price);
    const whole = Math.floor(num);
    const dec = Math.round((num - whole) * 100);
    return (
      <span className="inline-flex items-baseline">
        <span className="text-red-800 leading-none" style={{ fontSize: '42px', fontWeight: 900 }}>{whole}</span>
        {dec > 0 ? (
          <span className="text-red-800 relative" style={{ fontSize: '20px', fontWeight: 900, top: '-12px', marginLeft: '1px' }}>
            .{String(dec).padStart(2, '0')}
          </span>
        ) : (
          <span className="text-red-800" style={{ fontSize: '20px', fontWeight: 900, marginLeft: '2px' }}>:-</span>
        )}
        {showUnit && unit && (
          <span className="text-red-800" style={{ fontSize: '20px', fontWeight: 900, marginLeft: '1px' }}>/{unit}</span>
        )}
      </span>
    );
  }

  function OrdPriceDisplay({ price }) {
    const num = Number(price);
    const whole = Math.floor(num);
    const dec = Math.round((num - whole) * 100);
    return (
      <span className="inline-flex items-baseline">
        <span>Ord pris </span>
        <span className="ml-1" style={{ fontWeight: 900 }}>{whole}</span>
        {dec > 0 && (
          <span className="relative" style={{ fontSize: '10px', fontWeight: 900, top: '-4px', marginLeft: '1px' }}>
            .{String(dec).padStart(2, '0')}
          </span>
        )}
        <span className="ml-px">/{unit || 'st'}</span>
      </span>
    );
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden flex flex-col h-full border border-stone-200/60">
      {/* Image */}
      <div className="relative bg-white overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={product_name}
            className="w-full h-full object-contain p-4 sm:p-6 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300 p-6">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Bästa Pris ribbon */}
        {is_best_price && (
          <div className="absolute top-0 left-0 w-[110px] h-[110px] overflow-hidden">
            <div
              className="absolute bg-[#d12c22] text-white font-bold text-center shadow-sm"
              style={{
                width: '160px',
                top: '26px',
                left: '-36px',
                transform: 'rotate(-45deg)',
                fontSize: '13px',
                padding: '6px 0',
                letterSpacing: '0.5px',
              }}
            >
              Bästa Pris
            </div>
          </div>
        )}

        {/* Multi-buy badge */}
        {multi_buy && multi_buy > 1 && (
          <div className="absolute top-3 right-3 w-12 h-12 bg-[#d12c22] rounded-full flex flex-col items-center justify-center text-white shadow-md">
            <span className="text-lg font-black leading-none">{multi_buy}</span>
            <span className="text-[9px] font-semibold uppercase leading-none">För</span>
          </div>
        )}
      </div>

      {/* Yellow price bar */}
      <div className="bg-yellow-400 px-4 py-4 text-center">
        <p className="text-red-700 mb-2" style={{ fontWeight: 600, fontSize: '15px' }}>
          Kampanj
        </p>
        <div className="flex items-baseline justify-center leading-none">
          {multi_buy && multi_buy > 1 ? (
            <>
              <span className="font-bold text-red-800 mr-1" style={{ fontSize: '15px' }}>{multi_buy} För</span>
              <PriceDisplay price={offer_price} showUnit={false} />
            </>
          ) : (
            <PriceDisplay price={offer_price} showUnit={true} />
          )}
        </div>
      </div>

      {/* Product info */}
      <div className="px-4 pt-4 pb-2 text-center">
        <h3 className="font-bold text-stone-900 text-[15px] leading-snug line-clamp-2">
          {product_name}
        </h3>
        {category && (
          <p className="text-[11px] uppercase tracking-wider text-stone-400 font-medium mt-1">
            {category}
          </p>
        )}
      </div>

      {/* Ord pris bar */}
      {original_price && Number(original_price) > Number(offer_price) && (
        <div className="mt-auto mx-3 mb-3 bg-stone-100 rounded-lg px-3 py-2 text-center text-[13px] text-stone-500">
          <OrdPriceDisplay price={original_price} />
        </div>
      )}
    </div>
  );
}
