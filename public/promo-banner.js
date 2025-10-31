(() => {
  // Only run in browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  
  const TOAST_URL = "https://www.toasttab.com/local/order/napoli-pizzeria-syracuse-5194-west-taft-road-c/r-0abcda36-6edb-4213-804a-81c9fba9f522";
  // Nov 1, 2025 is still EDT (-04:00); anchor to America/New_York local time:
  const END = Date.parse("2025-11-01T23:59:59-04:00");
  const KEY = "napoliPromoDismissed";
  
  // Debug helper: Clear dismissal to test banner again
  // Call: window.__clearNapoliPromo() in console
  window.__clearNapoliPromo = () => {
    localStorage.removeItem(KEY);
    location.reload();
  };
  
  const now = Date.now();
  if (now > END) return;                     // show now, hide after end
  if (localStorage.getItem(KEY) === "1") return;
  if (document.getElementById("napoli-promo")) return;

  const bar = document.createElement("div");
  bar.id = "napoli-promo";
  bar.innerHTML = `
    <div id="napoli-promo-inner">
      <div class="track">
        <div class="scroll">
          <span>🎃 10% off your call-ahead pickup — 10/31 & 11/1 only. <a href="${TOAST_URL}" rel="noopener">Order pickup on Toast</a>.</span>
          <span>🎃 10% off your call-ahead pickup — 10/31 & 11/1 only. <a href="${TOAST_URL}" rel="noopener">Order pickup on Toast</a>.</span>
          <span>🎃 10% off your call-ahead pickup — 10/31 & 11/1 only. <a href="${TOAST_URL}" rel="noopener">Order pickup on Toast</a>.</span>
        </div>
      </div>
      <button class="close" aria-label="Close">✕</button>
    </div>`;

  bar.querySelector(".close")?.addEventListener("click", () => {
    localStorage.setItem(KEY, "1");
    bar.remove();
  });

  // inject styles if not present
  if (!document.querySelector('link[href*="promo-banner.css"]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/promo-banner.css";
    document.head.appendChild(link);
  }

  const mount = () => document.body.prepend(bar);
  (document.readyState === "loading") ? document.addEventListener("DOMContentLoaded", mount) : mount();
})();

