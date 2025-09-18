# Napoli Pizzeria Website

A modern, responsive website for Napoli Pizzeria - authentic NY-style pizza in Syracuse, NY.

## Project Structure

```
napoli/
├── docs/                          # Project documentation
│   ├── napoli-pizzeria-profile-v2.md  # Business profile & requirements
│   ├── brand-guidelines.md         # Brand colors, fonts, voice
│   ├── about-us.md                # Story content
│   └── reference/                 # Design references
├── public/
│   ├── brand/                     # Logo files
│   ├── photos/                    # Business photos
│   ├── menuPics/                  # Food photos
│   └── illustrations/             # SVG illustrations
└── src/
    └── app/
        ├── components/            # Reusable React components
        │   ├── Navigation.tsx     # Main navigation with order modal
        │   ├── Footer.tsx         # Site footer
        │   ├── OrderModal.tsx     # Order platform selection modal
        │   └── MenuImage.tsx      # Smart image component with fallbacks
        ├── lib/                   # Utilities and data
        │   ├── menuData.ts        # Menu data processing
        │   ├── imageMapping.ts    # Smart image mapping
        │   └── data/
        │       └── menu.csv       # Menu items data
        ├── catering/              # Catering page
        ├── menu/                  # Menu page
        ├── story/                 # About page
        ├── specials/              # Links to Facebook
        └── globals.css            # Global styles
```

## Key Features

- **Order Modal**: Replaces separate order page with modal containing Toast, Uber Eats, DoorDash links
- **Smart Image Mapping**: Automatically matches menu items to correct food photos with intelligent fallbacks
- **Mobile-First Design**: Fully responsive with optimized mobile experience
- **Brand Consistency**: Implements Poppins/Alegreya/Inter typography per brand guidelines
- **Facebook Integration**: Specials link directly to Facebook for easy management

## Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Check code quality
```

## Brand Guidelines

- **Primary Colors**: Napoli Red (#d6132c), Basil Green (#116b14)
- **Typography**: Poppins (headings), Alegreya Sans (categories), Inter (body)
- **Voice**: Authentic, experienced, family-oriented, community-focused
- **Style**: Clean, high-contrast layouts with hand-drawn food illustrations

## Contact Information

- **Address**: 5194 W. Taft Rd., North Syracuse NY 13212
- **Phone**: 315-218-5837
- **Facebook**: https://www.facebook.com/profile.php?id=61566700086836

---

**Powered by [JAM Digital](https://growwithjam.com)**
