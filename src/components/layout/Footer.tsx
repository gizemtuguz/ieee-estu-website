'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';
import { buildLocalizedPath, ENGLISH_ROUTES } from '@/i18n/paths';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const locale = useLocale();

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
  ];

  const quickLinks = [
    { name: nav('about'), href: buildLocalizedPath(ENGLISH_ROUTES.about, locale) },
    { name: nav('team'), href: buildLocalizedPath(ENGLISH_ROUTES.team, locale) },
    { name: nav('events'), href: `/${locale}/events` },
    { name: nav('contact'), href: buildLocalizedPath(ENGLISH_ROUTES.contact, locale) },
  ];

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">IEEE ESTU</h3>
            <p className="text-sm text-muted-foreground">
              {t('description')}
            </p>
            <p className="text-sm font-semibold">{t('subtitle')}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{t('resources')}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.ieee.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  IEEE Global
                </a>
              </li>
              <li>
                <a
                  href="https://www.ieee.org.tr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  IEEE Turkey
                </a>
              </li>
              <li>
                <a
                  href="https://www.estu.edu.tr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  ESTU
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{t('social')}</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {t('brand')}. {t('rights')}
            </p>
            <div className="flex space-x-6">
              <Link
                href={buildLocalizedPath(ENGLISH_ROUTES.privacy, locale)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('privacy')}
              </Link>
              <Link
                href={buildLocalizedPath(ENGLISH_ROUTES.terms, locale)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
