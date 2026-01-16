# IEEE ESTU Website - README

## 🎯 Project Overview

Modern, production-ready website for IEEE ESTU Student Branch built with Next.js 14, Firebase, and TypeScript.

## ✨ Features

### Public Website
- ✅ Multi-language support (Turkish/English)
- ✅ Mobile-first responsive design
- ✅ Dynamic content from Firestore CMS
- ✅ Event management with Google Form integration
- ✅ Blog system
- ✅ Team & Committee pages
- ✅ SEO optimized

### Admin CMS
- ✅ Secure authentication with Firebase Auth
- ✅ Events CRUD (Create, Read, Update, Delete)
- ✅ Image upload to Firebase Storage
- ✅ Page content editor
- ✅ Media library
- ✅ Draft/Publish workflow
- ✅ Role-based access control

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd ieee-website/next-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your Firebase credentials
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   - Public site: http://localhost:3000
   - Admin panel: http://localhost:3000/admin

## 📁 Project Structure

```
next-app/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Public pages (TR/EN)
│   │   └── admin/             # Admin panel
│   ├── components/
│   │   ├── layout/            # Navbar, Footer, etc.
│   │   └── ui/                # shadcn components
│   ├── lib/
│   │   ├── firebase/          # Firebase config
│   │   └── schemas/           # Zod schemas
│   └── i18n/                  # Internationalization
├── messages/
│   ├── tr.json                # Turkish translations
│   └── en.json                # English translations
├── public/
│   └── images/                # Static assets
└── docs/                      # Documentation
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend**: Firebase (Auth, Firestore, Storage)
- **i18n**: next-intl
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## 📖 Documentation

- [Architecture](./docs/architecture.md) - System design and structure
- [Content Model](./docs/content-model.md) - Firestore collections and schemas
- [Deployment](./docs/deployment.md) - Firebase and Vercel setup

## 🔐 Firebase Setup

1. Create Firebase project
2. Enable Authentication, Firestore, Storage
3. Get credentials and update `.env.local`
4. Deploy security rules
5. Add admin users

See [deployment guide](./docs/deployment.md) for details.

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 👥 Team

**IEEE ESTU Student Branch**
- Email: ieee@estu.edu.tr
- Instagram: @ieeeestu

---

**Made with ❤️ by IEEE ESTU Student Branch**
