'use client';

const BANNER_ENDS_AT = new Date('2026-08-20T00:00:00-04:00');

export default function HoursBanner() {
  if (Date.now() >= BANNER_ENDS_AT.getTime()) {
    return null;
  }

  return (
    <aside className="bg-napoli-red text-pure-white" aria-label="New hours announcement">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center">
        <p className="font-inter text-sm sm:text-base font-semibold">
          New hours starting Monday, July 20: Monday-Thursday 3-8pm, Friday-Saturday 11am-8pm. Sunday closed.
        </p>
      </div>
    </aside>
  );
}