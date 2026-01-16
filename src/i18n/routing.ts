import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  pathnames: {
    '/': '/',
    '/hakkimizda': {
      tr: '/about',
      en: '/about',
    },
    '/ekibimiz': {
      tr: '/team',
      en: '/team',
    },
    '/komiteler': {
      tr: '/committees',
      en: '/committees',
    },
    '/takimlar': {
      tr: '/subteams',
      en: '/subteams',
    },
    '/etkinlikler': {
      tr: '/events',
      en: '/events',
    },
    '/sponsorlar': {
      tr: '/sponsors',
      en: '/sponsors',
    },
    '/iletisim': {
      tr: '/contact',
      en: '/contact',
    },
    '/blog': '/blog',
    '/xtreme': '/xtreme',
    '/privacy': {
      tr: '/privacy',
      en: '/privacy',
    },
    '/terms': {
      tr: '/terms',
      en: '/terms',
    },
  },
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
