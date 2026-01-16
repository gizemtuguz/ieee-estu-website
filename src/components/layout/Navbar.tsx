'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Menu, Moon, Sun, Languages } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { buildLocalizedPath, ENGLISH_ROUTES } from '@/i18n/paths';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: t('home'), href: buildLocalizedPath(ENGLISH_ROUTES.home, locale) },
    { name: t('about'), href: buildLocalizedPath(ENGLISH_ROUTES.about, locale) },
    { name: t('team'), href: buildLocalizedPath(ENGLISH_ROUTES.team, locale) },
    { name: t('committees'), href: buildLocalizedPath(ENGLISH_ROUTES.committees, locale) },
    { name: t('subteams'), href: buildLocalizedPath(ENGLISH_ROUTES.subteams, locale) },
    { name: t('events'), href: buildLocalizedPath(ENGLISH_ROUTES.events, locale) },
    { name: t('sponsors'), href: buildLocalizedPath(ENGLISH_ROUTES.sponsors, locale) },
    { name: t('contact'), href: buildLocalizedPath(ENGLISH_ROUTES.contact, locale) },
    { name: t('blog'), href: buildLocalizedPath(ENGLISH_ROUTES.blog, locale) },
    { name: t('xtreme'), href: buildLocalizedPath(ENGLISH_ROUTES.xtreme, locale) },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleLanguage = () => {
    const newLocale = locale === 'tr' ? 'en' : 'tr';
    router.replace(buildLocalizedPath(pathname, newLocale));
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href={buildLocalizedPath(ENGLISH_ROUTES.home, locale)}
          className="flex items-center space-x-2"
        >
          <div className="relative h-10 w-32">
            <Image
              src="/images/b4a3589a03f0b647872f4323459f2489a86615e3.png"
              alt="IEEE ESTU"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Language Switcher */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="hidden sm:flex"
          >
            <Languages className="h-5 w-5" />
            <span className="sr-only">{t('toggleLanguage')}</span>
          </Button>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="hidden sm:flex"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">{t('toggleTheme')}</span>
          </Button>

          {/* Join Us Button */}
          <Button className="hidden md:inline-flex bg-[#00629B] hover:bg-[#004A75]">
            {t('joinUs')}
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">{t('toggleMenu')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[400px]">
              <div className="flex items-center mb-6">
                <div className="relative h-12 w-40">
                  <Image
                    src="/images/b4a3589a03f0b647872f4323459f2489a86615e3.png"
                    alt="IEEE ESTU"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t space-y-2">
                  <Button
                    className="w-full bg-[#00629B] hover:bg-[#004A75] text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('joinUs')}
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="default"
                      onClick={toggleLanguage}
                      className="flex-1 justify-center"
                    >
                      <Languages className="h-4 w-4 mr-2" />
                      {locale === 'tr' ? 'EN' : 'TR'}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleDarkMode}
                      className="h-10 w-10"
                    >
                      {isDarkMode ? (
                        <Sun className="h-4 w-4" />
                      ) : (
                        <Moon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
