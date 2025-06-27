# NAPOLI PIZZERIA BUSINESS PROFILE

## Business Overview

**Business Name:** Napoli Pizzeria  
**Owner:** Mike Perrucci  
**Phone:** 315-218-5837  
**Address:** 5194 W. Taft Rd., North Syracuse NY 13212  
**Year Established:** 2024  
**Business Type:** Restaurant – NY-Style Pizza & Italian Food

**Business Hours:**

- Mon: 11am – 8pm  
- Tues: 11am – 8pm  
- Wed: 11am – 8pm  
- Thurs: 11am – 8pm  
- Fri: 11am – 9pm  
- Sat: 11am – 8pm  
- Sun: CLOSED

## Brand Identity

**Colors:**

- Primary Red: \#d6132c  
- Primary Green: \#116b14  
- White: \#FFFFFF

**Voice:** Authentic, Experienced, Family-Oriented, Community-Focused  
**Positioning:** Authentic NY-Style Pizza with a deep heritage of craftsmanship, located to serve both neighborhood families and local medical professionals.

**Signature Products:**

1. Grandma’s Pie – "One of the best pies in the city"  
2. Chicken Parm Sub  
3. Chicken & Greens

## Ordering Links

- **Toast Online Ordering (Primary):** https://www.toasttab.com/local/order/napoli-pizzeria-syracuse-5194-west-taft-road-c/r-0abcda36-6edb-4213-804a-81c9fba9f522  
- **Toast Delivery:** https://www.toasttab.com/local/order/napoli-pizzeria-syracuse-5194-west-taft-road-c/r-0abcda36-6edb-4213-804a-81c9fba9f522?diningOption=delivery  
- **Postmates:** https://www.postmates.com/store/napoli-pizzeria-taft-rd/-rMPBrC3UmazDQBghIZzug  
- **Uber Eats:** https://www.ubereats.com/store/napoli-pizzeria-taft-rd/-rMPBrC3UmazDQBghIZzug

## Market Analysis

### Location Advantage

Strategically positioned next to:

- **North Medical Center** (5100 W. Taft Rd) – Hundreds of employees nearby  
- High traffic corridor with over 12,000 vehicles daily  
- Nearby Wegmans and other major anchors

### Target Market Segments

1. **Medical Professionals** (Primary Target)  
   - 450+ employees nearby  
   - Frequent catering/lunch needs  
   - Projected $81K annual opportunity with consistent reach  
2. **Neighborhood Families**  
   - Dense residential area within 3-mile radius  
   - Looking for quality takeout and delivery  
3. **On-the-go Lunch Grabbers**  
   - Tradespeople, professionals, healthcare staff  
   - Wanting fast, reliable, non-fast-food options  
4. **Office Catering Clients**  
   - West Taft Rd. businesses  
   - Opportunities for repeat large weekday orders

### Competitive Analysis

- **Twin Trees III:** 40+ years local brand, CNY-style  
- **Tonini’s Pizzeria:** Same road, strong online ratings  
- **Toss ‘N Fire:** Premium wood-fired niche  
- **Paladino’s:** NYC-style competitor from the Bronx  
- **Chains (Domino’s, Pizza Hut):** High volume, low quality, strong digital UX

# Napoli Pizzeria Brand Guidelines

These guidelines ensure a consistent visual and verbal identity across web, print, and AI-generated assets.

---

## 🟥 Brand Colors

| Color Name | Hex Code | Usage |
| :---- | :---- | :---- |
| Napoli Red | `#d6132c` | Primary buttons, highlights, accents |
| Basil Green | `#116b14` | Callouts, secondary accents |
| Pure White | `#ffffff` | Backgrounds, text contrast |
| Soft Gray | `#f8f9fa` | Section backgrounds, borders |
| Medium Gray | `#6c757d` | Icons, subtle text |
| Dark Gray | `#212529` | Body text, dark mode |

---

## 🔤 Typography

**Font Stack (Google Fonts):**

| Use | Font | Weight/Style |
| :---- | :---- | :---- |
| Main Headings | `Poppins` | 400 / 600 |
| Menu Categories | `Alegreya Sans` | 700 (uppercase) |
| Body Text & UI | `Inter` | 400 / 600 |

Typography reflects a balance of authenticity and clarity. Headings are set lowercase for a relaxed but clean feel.

---

## 🎨 Visual Style & Image Prompts

- Emphasis on **clean, high-contrast layouts**  
- Use of **hand-drawn or line-art food illustrations** in margins/dividers  
- Prefer **white marble, rustic wood, or stainless steel** backdrops  
- Maintain soft, warm lighting and shallow depth of field in images  
- Avoid yellow in design; substitute with red or green from brand palette

---

## 📏 Image Standards (for Canva SVGs or Background Illustrations)

- Recommended Size: **800×800 px** (SVG, PNG, or JPG)  
- Keep file names kebab-case: `pizza-illustration.svg`, `tomato-outline.svg`  
- Export as `.svg` or `.png` for web use  
- Maintain stroke consistency and transparent backgrounds

Use consistent illustration proportions and negative space so graphics align cleanly on web sections.

---

## 🗣️ Brand Voice

- Authentic, experienced, down-to-earth  
- Proudly local, rooted in tradition  
- Friendly and casual without being gimmicky  
- “Old-world quality with new-world hospitality”

---

# Napoli Pizzeria – Prompt for Bolt Build

### PROJECT

Build and deploy a complete,responsive, customer-facing website to promote the Napoli Pizzeria brand, showcase its menu, and drive online orders and catering inquiries **and** an owner-only admin interface for **Napoli Pizzeria** (authentic NY-style pizza, Syracuse NY).

---

### TECH / DEPLOY

- **Front-end:** Next.js 14 (App Router, React 18\)  
- **Styling:** Tailwind CSS \+ shadcn/ui  
- **Fonts (Google Fonts):**  
  - `Poppins` (400, 600\) → primary headings / food titles (lowercase)  
  - `Alegreya Sans` (700) → menu category labels / section headers (uppercase)  
  - `Inter` (400, 600\) → body text & UI  
- **Back-end:** Supabase (Postgres, Auth, Storage)  
  - Auth: email-password only (admin role)  
- **Deployment:** Netlify  
  - Build: `next build && next export`, Output: `out`  
  - Set `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY` as env vars

---

### BRAND

- **Colors:**

```css
--napoli-red: #d6132c;
--basil-green: #116b14;
--pure-white: #ffffff;
--soft-gray: #f8f9fa;
--medium-gray: #6c757d;
--dark-gray: #212529;
```

- **Assets:**  
  - Logo & favicon: `/public/brand/`  
  - Line-art & illustrations: `/public/illustrations/`

---

### PICTURE STRATEGY

- Use high-quality placeholder images from Unsplash/Pexels (ratios: 16:9, 4:3, 1:1)  
- Include utility `<ImgPlaceholder>` with blur loading \+ admin-replaceable images

---

### DESIGN DIRECTION

Use `/docs/reference/menu-template-to-translate-to-website-style-but-with-no-yellow.jpg` as **styling tone reference** — not layout. Emulate:

- White textured / neutral background  
- Line-art food illustrations (herbs, pasta, etc.)  
- Soft serif/sans font pairing (Poppins \+ Alegreya)  
- Clean, paper-like spacing & dashed dividers  
- **NO yellow** — substitute Napoli red/green

**Goal:** a site that feels artistic, handcrafted, warm, and digitally clean.

---

### PUBLIC PAGES

**1\. Home (`/`)**

- Hero: 16:9, overlay welcome \+ tagline  
- Highlight cards: Grandma’s Pie, Garlic Knots, House Salad  
- Specials carousel (from Supabase)  
- Info strip: address, phone, hours, Order buttons

**2\. Menu (`/menu`)**

- Grimaldi-style layout with sticky scroll nav  
- Menu item card: 4:3 image, lowercase name, price by size, Inter description  
- All cards have a CTA to order

**3\. Specials (`/specials`)**

- Grid or table layout of active specials, with timer if limited

**4\. Our Story (`/story`)**

- 2-column layout: Mike’s photo \+ narrative copy

**5\. Catering (`/catering`)**

- Cards for office/medical lunch packages  
- Inquiry form → Supabase `catering_leads`

**6\. Order Now (`/order`)**

- 3 CTA cards: Toast, Uber Eats, Postmates (external links only)

---

### COMPONENT SYSTEM

- `.btn-primary`: red bg, white text, rounded-lg, shadow, hover-darken 6%  
- `.btn-secondary`: white bg, red outline/text  
- Cards: rounded \+ shadows matching brand visual tone

---

### SUCCESS CRITERIA

- All public pages pixel-perfect @ ≥ 320 px width  
- Admin: owner can add/edit menu items in ≤ 3 clicks  
- Deploy runs successfully on first push with env vars set  
- No hydration warnings or unhandled console errors

## 🔗 Signature Attribution

Always credit outward-facing work with:

**Powered by [JAM Digital](https://growwithjam.com)**

