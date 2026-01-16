'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  MapPin,
  Mail,
  Send,
  Instagram,
  Linkedin,
  Twitter,
  Github,
} from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: t('info.address'),
      details: t.raw('info.addressDetails') as string[],
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: t('info.email'),
      details: t.raw('info.emailDetails') as string[],
    },
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      handle: '@ieeeestu',
      url: '#',
      icon: <Instagram className="h-5 w-5" />,
    },
    {
      name: 'LinkedIn',
      handle: 'IEEE ESTU',
      url: '#',
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      name: 'Twitter',
      handle: '@ieeeestu',
      url: '#',
      icon: <Twitter className="h-5 w-5" />,
    },
    {
      name: 'GitHub',
      handle: 'ieee-estu',
      url: '#',
      icon: <Github className="h-5 w-5" />,
    },
  ];

  return (
    <SiteLayout>
      <section className="py-20 bg-gray-100 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-black dark:bg-white bg-clip-text text-transparent leading-relaxed py-2">
              {t('title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg dark:hover:shadow-[#00629B]/20 dark:hover:ring-1 dark:hover:ring-[#00629B]/50 transition-shadow duration-300 rounded-2xl border-0 bg-white dark:bg-slate-950"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#00629B' }}
                      >
                        <span className="text-white">{info.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-primary mb-2">
                          {info.title}
                        </h3>
                        <div className="space-y-1">
                          {info.details.map((detail, idx) => (
                            <p
                              key={idx}
                              className="text-sm text-muted-foreground"
                            >
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Social Media Links */}
              <Card className="rounded-2xl border-0 bg-white dark:bg-slate-950">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-4">
                    {t('social.title')}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        className="group flex items-center space-x-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#00629B] hover:text-white dark:hover:bg-[#00629B] transition-all duration-200"
                      >
                        <div className="text-[#00629B] group-hover:text-white transition-colors duration-200">
                          {social.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{social.name}</p>
                          <p className="text-xs text-muted-foreground group-hover:text-white transition-colors duration-200">
                            {social.handle}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="rounded-2xl border-0 bg-white dark:bg-slate-950">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-6">
                    {t('form.title')}
                  </h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          {t('form.name')}
                        </label>
                        <Input
                          placeholder={t('form.namePlaceholder')}
                          className="rounded-xl border-gray-200 dark:border-gray-700 focus:border-[#00629B] focus:ring-[#00629B]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          {t('form.email')}
                        </label>
                        <Input
                          type="email"
                          placeholder={t('form.emailPlaceholder')}
                          className="rounded-xl border-gray-200 dark:border-gray-700 focus:border-[#00629B] focus:ring-[#00629B]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          {t('form.phone')}
                        </label>
                        <Input
                          placeholder={t('form.phonePlaceholder')}
                          className="rounded-xl border-gray-200 dark:border-gray-700 focus:border-[#00629B] focus:ring-[#00629B]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          {t('form.subject')}
                        </label>
                        <Input
                          placeholder={t('form.subjectPlaceholder')}
                          className="rounded-xl border-gray-200 dark:border-gray-700 focus:border-[#00629B] focus:ring-[#00629B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        {t('form.messageRequired')}
                      </label>
                      <Textarea
                        placeholder={t('form.messagePlaceholder')}
                        rows={6}
                        className="rounded-xl border-gray-200 dark:border-gray-700 focus:border-[#00629B] focus:ring-[#00629B] resize-none"
                      />
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="privacy"
                        className="mt-1 w-4 h-4 border-gray-300 rounded"
                        style={{ accentColor: '#00629B' }}
                      />
                      <label
                        htmlFor="privacy"
                        className="text-sm text-muted-foreground"
                      >
                        {t('form.privacy')}
                      </label>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full text-white rounded-xl py-3 font-medium transition-all duration-200"
                      style={{
                        background: `linear-gradient(to right, #00629B, #004f7c)`,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = `linear-gradient(to right, #004f7c, #003a5c)`)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = `linear-gradient(to right, #00629B, #004f7c)`)
                      }
                    >
                      <Send className="mr-2 h-5 w-5" />
                      {t('form.send')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Location Map Placeholder */}
          <div className="mt-16">
            <Card className="rounded-2xl border-0 overflow-hidden">
              <div className={isDark ? 'map-dark-mode' : ''}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.5858!2d28.9784!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cc3fd16c128503%3A0x3667dcedef4ac11c!2sEskisehir%20Technical%20University!5e0!3m2!1str!2str!4v1635000000000"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                ></iframe>
              </div>
              <style>{`
                .map-dark-mode iframe {
                  filter: invert(90%) hue-rotate(180deg);
                }
                .map-dark-mode {
                  background: #1e293b;
                }
              `}</style>
            </Card>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
