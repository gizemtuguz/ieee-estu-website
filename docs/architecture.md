# IEEE ESTU Website Architecture

## Overview

This is a production-grade Next.js 14 application for IEEE ESTU Student Branch with:
- **Multi-language support** (TR/EN) using next-intl
- **Firebase backend** (Auth, Firestore, Storage)
- **Admin CMS** for content management
- **Mobile-first design** with shadcn/ui components
- **Type-safe** with TypeScript and Zod

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **i18n**: next-intl
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## Project Structure

```
next-app/
├── src/
│   ├── app/
│   │   ├── [locale]/              # Localized public pages
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx           # Home
│   │   │   ├── hakkimizda/        # About
│   │   │   ├── ekibimiz/          # Team
│   │   │   ├── komiteler/         # Committees
│   │   │   ├── takimlar/          # SubTeams
│   │   │   ├── sponsorlar/        # Sponsors
│   │   │   ├── iletisim/          # Contact
│   │   │   ├── blog/              # Blog list & detail
│   │   │   └── xtreme/            # Xtreme
│   │   └── admin/                 # Admin panel
│   │       ├── layout.tsx
│   │       ├── page.tsx           # Dashboard
│   │       ├── events/            # Events CRUD
│   │       ├── pages/             # Page content editor
│   │       └── media/             # Media manager
│   ├── components/
│   │   ├── layout/                # Navbar, Footer, Layouts
│   │   ├── sections/              # Page sections
│   │   └── ui/                    # shadcn components
│   ├── lib/
│   │   ├── firebase/
│   │   │   ├── client.ts          # Client SDK
│   │   │   └── admin.ts           # Admin SDK
│   │   └── schemas/
│   │       └── index.ts           # Zod schemas
│   └── i18n/
│       ├── request.ts
│       └── routing.ts
├── messages/
│   ├── tr.json                    # Turkish translations
│   └── en.json                    # English translations
├── public/
│   └── images/                    # Static assets
└── docs/                          # Documentation
```

## Routing

### Public Pages (Multi-language)
- `/[locale]` - Home with Hero
- `/[locale]/hakkimizda` - About Us
- `/[locale]/ekibimiz` - Team
- `/[locale]/komiteler` - Committees
- `/[locale]/takimlar` - SubTeams
- `/[locale]/sponsorlar` - Sponsors
- `/[locale]/iletisim` - Contact
- `/[locale]/blog` - Blog List
- `/[locale]/blog/[slug]` - Blog Detail
- `/[locale]/xtreme` - IEEEXtreme

### Admin Panel (Protected)
- `/admin` - Dashboard
- `/admin/events` - Events List
- `/admin/events/new` - Create Event
- `/admin/events/[id]/edit` - Edit Event
- `/admin/pages` - Page Content Editor
- `/admin/media` - Media Manager

## Features

### Public Site
- ✅ Mobile-first responsive design
- ✅ Multi-language (TR/EN) with URL-based routing
- ✅ SEO-optimized with Next.js metadata
- ✅ Dynamic content from Firestore
- ✅ Google Form redirects for membership/events

### Admin Panel
- ✅ Firebase Authentication
- ✅ Role-based access control (RBAC)
- ✅ Events CRUD with cover images
- ✅ Page content editor
- ✅ Media library with upload
- ✅ Draft/Published workflow

### Content Management
- All page content stored in Firestore
- No hard-coded content
- Localized content (TR/EN)
- Google Form URLs configurable
- Image upload to Firebase Storage

## Design Principles

1. **No Hard-Coding**: All content, links, and text come from i18n or Firestore
2. **Mobile-First**: Responsive design from 320px up
3. **Type Safety**: TypeScript + Zod schemas everywhere
4. **SEO**: Server components, metadata, semantic HTML
5. **Performance**: Image optimization, code splitting, caching

## Next Steps

1. Configure Firebase project
2. Set environment variables
3. Deploy Firestore security rules
4. Add admin users
5. Seed initial content
6. Deploy to Vercel

See individual documentation files for detailed setup instructions.
