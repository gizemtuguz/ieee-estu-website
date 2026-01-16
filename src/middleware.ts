import { NextResponse, type NextRequest } from 'next/server';
import { locales, defaultLocale } from '../i18n.config';
import {
  buildLocalizedPath,
  extractLocaleSuffix,
  toEnglishPath,
  toInternalPath,
  stripLocaleSuffix,
} from './i18n/paths';

const localeSet = new Set(locales);
const isLocale = (value: string) =>
  localeSet.has(value as (typeof locales)[number]);

export default function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const { pathname } = url;
  const isAsset =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.');

  if (isAsset) {
    return NextResponse.next();
  }

  if (pathname === '/' || pathname === '') {
    return NextResponse.redirect(
      new URL(buildLocalizedPath('/home', defaultLocale), url)
    );
  }

  if (pathname === '/tr' || pathname === '/en') {
    const locale = pathname.slice(1);
    return NextResponse.redirect(
      new URL(buildLocalizedPath('/home', locale), url)
    );
  }

  const suffixLocale = extractLocaleSuffix(pathname);

  if (suffixLocale && isLocale(suffixLocale)) {
    const basePath = stripLocaleSuffix(pathname);
    const englishPath = toEnglishPath(basePath);
    if (englishPath !== basePath) {
      return NextResponse.redirect(
        new URL(buildLocalizedPath(englishPath, suffixLocale), url)
      );
    }
    const internalPath = toInternalPath(pathname, suffixLocale);
    const headers = new Headers(request.headers);
    headers.set('x-next-intl-locale', suffixLocale);
    const rewriteUrl = new URL(request.url);
    rewriteUrl.pathname = internalPath;
    return NextResponse.rewrite(rewriteUrl, { request: { headers } });
  }

  const prefixMatch = pathname.match(/^\/(tr|en)(\/|$)/);
  if (prefixMatch) {
    const locale = prefixMatch[1];
    const rest = pathname.replace(/^\/(tr|en)/, '') || '/';
    const englishPath = toEnglishPath(rest);
    return NextResponse.redirect(
      new URL(buildLocalizedPath(englishPath, locale), url)
    );
  }

  const basePath = stripLocaleSuffix(pathname);
  if (basePath !== '/') {
    const englishPath = toEnglishPath(basePath);
    return NextResponse.redirect(
      new URL(buildLocalizedPath(englishPath, defaultLocale), url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
