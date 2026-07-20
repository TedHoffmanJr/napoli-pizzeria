'use client';

const BANNER_ENDS_AT = new Date('2026-07-27T00:00:00-04:00');

export default function HoursBanner() {
  if (Date.now() >= BANNER_ENDS_AT.getTime()) {
    return null;
  }

  return (
    <aside className="bg-napoli-red text-pure-white" aria-label="Lunch hours announcement">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center">
        <p className="font-inter text-sm sm:text-base font-semibold">
          Lunch is back all week! We&apos;re open Monday-Saturday from 11am-8pm. Come join us for lunch.
        </p>
      </div>
    </aside>
  );
}