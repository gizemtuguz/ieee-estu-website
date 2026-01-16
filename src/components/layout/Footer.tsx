'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Loader2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { buildLocalizedPath, ENGLISH_ROUTES } from '@/i18n/paths';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Bot trap

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check - if filled, it's a bot
    if (honeypot) {
      console.log('Bot detected via honeypot');
      return;
    }
    
    // Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage(locale === 'tr' ? 'Geçerli bir email adresi girin' : 'Enter a valid email address');
      return;
    }

    // Check common disposable email domains
    const disposableDomains = ['tempmail.com', 'throwaway.email', '10minutemail.com', 'guerrillamail.com', 'mailinator.com'];
    const emailDomain = email.split('@')[1]?.toLowerCase();
    if (disposableDomains.includes(emailDomain)) {
      setMessage(locale === 'tr' ? 'Geçici email adresleri kabul edilmemektedir' : 'Disposable email addresses are not accepted');
      return;
    }

    // Rate limiting - check localStorage
    const lastSubscription = localStorage.getItem('lastNewsletterSubscription');
    if (lastSubscription) {
      const timeSinceLastSub = Date.now() - parseInt(lastSubscription);
      const fiveMinutes = 5 * 60 * 1000;
      if (timeSinceLastSub < fiveMinutes) {
        const minutesLeft = Math.ceil((fiveMinutes - timeSinceLastSub) / 60000);
        setMessage(
          locale === 'tr' 
            ? `Lütfen ${minutesLeft} dakika bekleyin` 
            : `Please wait ${minutesLeft} minutes`
        );
        return;
      }
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      });

      if (response.status === 409) {
        setMessage(locale === 'tr' ? 'Bu email zaten kayıtlı' : 'This email is already registered');
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      // Set rate limiting timestamp
      localStorage.setItem('lastNewsletterSubscription', Date.now().toString());

      setMessage(locale === 'tr' ? '✓ Başarıyla abone oldunuz!' : '✓ Successfully subscribed!');
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setMessage(locale === 'tr' ? 'Bir hata oluştu. Lütfen tekrar deneyin.' : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/ieee.estu/' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/ieee-estu/' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/ieeeestu' },
    { name: 'Email', icon: Mail, href: 'mailto:ieee.estu@gmail.com' },
    { name: 'Medium', icon: BookOpen, href: 'https://medium.com/@ieee-estu' },
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
            </ul>
          </div>

          {/* Social & Newsletter */}
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
            
            {/* Newsletter */}
            <div className="pt-4">
              <div className="flex items-center mb-3">
                <h3 className="text-lg font-bold">
                  {locale === 'tr' ? 'Bülten' : 'Newsletter'}
                </h3>
              </div>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                {/* Honeypot field - hidden from users, visible to bots */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                <Input
                  type="email"
                  placeholder={locale === 'tr' ? 'Email adresiniz' : 'Your email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="text-sm"
                />
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-[#00629B] hover:bg-[#004A75] w-full"
                  size="sm"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    locale === 'tr' ? 'Abone Ol' : 'Subscribe'
                  )}
                </Button>
              </form>
              {message && (
                <p className={`text-xs mt-2 ${message.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </p>
              )}
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
