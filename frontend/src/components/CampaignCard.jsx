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

function formatPrice(price) {
  if (price == null) return null;
  const num = Number(price);
  if (isNaN(num)) return null;

  const whole = Math.floor(num);
  const decimals = Math.round((num - whole) * 100);

  if (decimals === 0) {
    return (
      <span className="flex items-baseline">
        <span className="text-3xl sm:text-4xl font-heading font-black leading-none text-red-700">{whole}</span>
        <span className="text-lg font-bold ml-0.5 text-red-700">:-</span>
      </span>
    );
  }

  return (
    <span className="flex items-baseline">
      <span className="text-3xl sm:text-4xl font-heading font-black leading-none text-red-700">{whole}</span>
      <span className="text-lg font-bold relative -top-1 ml-0.5 text-red-700">
        {String(decimals).padStart(2, '0')}
      </span>
    </span>
  );
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

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image section */}
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={product_name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-400">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Best price ribbon */}
        {is_best_price && (
          <div className="absolute top-0 left-0 overflow-hidden w-24 h-24">
            <div className="absolute top-3 -left-6 w-32 text-center bg-red-600 text-white text-xs font-bold py-1 -rotate-45 shadow-md">
              Bästa Pris
            </div>
          </div>
        )}

        {/* Multi-buy badge */}
        {multi_buy && multi_buy > 1 && (
          <div className="absolute top-3 right-3 w-12 h-12 bg-red-600 rounded-full flex flex-col items-center justify-center text-white shadow-lg">
            <span className="text-lg font-black leading-none">{multi_buy}</span>
            <span className="text-[10px] font-semibold uppercase leading-none">För</span>
          </div>
        )}
      </div>

      {/* Price section */}
      <div className="bg-yellow-400 px-4 py-3">
        <p className="text-xs font-bold uppercase tracking-wider text-red-800 mb-1">
          Kampanj
        </p>
        <div className="flex items-baseline gap-1">
          {multi_buy && multi_buy > 1 && !unit ? (
            <span className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-red-700">{multi_buy} För</span>
              {formatPrice(offer_price)}
            </span>
          ) : (
            <span className="flex items-baseline gap-0.5">
              {formatPrice(offer_price)}
              {unit && (
                <span className="text-sm font-semibold text-red-700">/{unit}</span>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Product info */}
      <div className="px-4 py-3 flex-1 flex flex-col">
        <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug line-clamp-2">
          {product_name}
        </h3>
        {category && (
          <p className="text-[11px] uppercase tracking-wide text-stone-400 font-medium mt-1">
            {category}
          </p>
        )}
        {original_price && Number(original_price) > Number(offer_price) && (
          <p className="mt-auto pt-2 text-sm text-stone-400 line-through">
            Ord. pris {Number(original_price).toFixed(2)} kr
          </p>
        )}
      </div>
    </div>
  );
}
