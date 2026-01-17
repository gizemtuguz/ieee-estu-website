'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Script from 'next/script';
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
  BookOpen,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacy: boolean;
  honeypot: string; // Bot trap
};

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

// Add hcaptcha to window type
declare global {
  interface Window {
    hcaptcha: any;
    onCaptchaSuccess: (token: string) => void;
  }
}

export default function ContactPage() {
  const t = useTranslations('contact');
  const [isDark, setIsDark] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [hcaptchaToken, setHcaptchaToken] = useState('');
  const hcaptchaRef = useRef<any>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacy: false,
    honeypot: '',
  });

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

    // Set up hCaptcha callback
    (window as any).onCaptchaSuccess = (token: string) => {
      setHcaptchaToken(token);
    };

    return () => {
      observer.disconnect();
      delete (window as any).onCaptchaSuccess;
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    setErrorMessage('');

    // Check hCaptcha token
    if (!hcaptchaToken) {
      setFormStatus('error');
      setErrorMessage('Lütfen reCAPTCHA doğrulamasını tamamlayın');
      return;
    }

    // Honeypot check - if filled, it's a bot
    if (formData.honeypot) {
      console.log('Bot detected via honeypot');
      setFormStatus('error');
      setErrorMessage('Invalid submission');
      return;
    }

    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      setErrorMessage(t('form.requiredFields'));
      return;
    }

    if (!formData.privacy) {
      setFormStatus('error');
      setErrorMessage(t('form.privacyRequired'));
      return;
    }

    // Rate limiting check
    const lastSubmission = localStorage.getItem('lastContactFormSubmission');
    if (lastSubmission) {
      const timeSinceLastSub = Date.now() - parseInt(lastSubmission);
      const twoMinutes = 2 * 60 * 1000;
      if (timeSinceLastSub < twoMinutes) {
        setFormStatus('error');
        setErrorMessage(t('form.rateLimitError'));
        return;
      }
    }

    // Check disposable email domains
    const disposableDomains = ['tempmail.com', 'throwaway.email', '10minutemail.com', 'guerrillamail.com', 'mailinator.com'];
    const emailDomain = formData.email.split('@')[1]?.toLowerCase();
    if (disposableDomains.includes(emailDomain)) {
      setFormStatus('error');
      setErrorMessage(t('form.disposableEmailError'));
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject || t('form.defaultSubject'),
          message: formData.message,
          from_name: 'IEEE ESTU İletişim Formu',
          replyto: formData.email,
          'h-captcha-response': hcaptchaToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus('success');
        // Reset hCaptcha
        if (hcaptchaRef.current) {
          hcaptchaRef.current.reset();
        }
        setHcaptchaToken('');
        // Set rate limiting timestamp
        localStorage.setItem('lastContactFormSubmission', Date.now().toString());
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          privacy: false,
          honeypot: '',
        });
        // Reset success message after 5 seconds
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    } catch (error) {
      setFormStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : t('form.errorMessage')
      );
      // Reset error message after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

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
      handle: '@ieee.estu',
      url: 'https://www.instagram.com/ieee.estu/',
      icon: <Instagram className="h-5 w-5" />,
    },
    {
      name: 'LinkedIn',
      handle: 'IEEE ESTU',
      url: 'https://www.linkedin.com/company/ieee-estu/',
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      name: 'Twitter',
      handle: '@ieeeestu',
      url: 'https://twitter.com/ieeeestu',
      icon: <Twitter className="h-5 w-5" />,
    },
    {
      name: 'Medium',
      handle: '@ieee-estu',
      url: 'https://medium.com/@ieee-estu',
      icon: <BookOpen className="h-5 w-5" />,
    },
  ];

  return (
    <SiteLayout>
      <Script
        src="https://js.hcaptcha.com/1/api.js"
        strategy="lazyOnload"
        onLoad={() => {
          // hCaptcha loaded
          if (window.hcaptcha) {
            hcaptchaRef.current = window.hcaptcha;
          }
        }}
      />
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

                  {/* Success Message */}
                  {formStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <p className="text-sm text-green-800 dark:text-green-300">
                        {t('form.successMessage')}
                      </p>
                    </div>
                  )}

                  {/* Error Message */}
                  {formStatus === 'error' && errorMessage && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                      <p className="text-sm text-red-800 dark:text-red-300">
                        {errorMessage}
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot field - hidden from users, visible to bots */}
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleInputChange}
                      style={{ position: 'absolute', left: '-9999px' }}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-primary mb-2"
                        >
                          {t('form.name')} <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={t('form.namePlaceholder')}
                          className="rounded-xl border-gray-200 dark:border-gray-700 focus:border-[#00629B] focus:ring-[#00629B]"
                          disabled={formStatus === 'loading'}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-primary mb-2"
                        >
                          {t('form.email')} <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={t('form.emailPlaceholder')}
                          className="rounded-xl border-gray-200 dark:border-gray-700 focus:border-[#00629B] focus:ring-[#00629B]"
                          disabled={formStatus === 'loading'}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-primary mb-2"
                        >
                          {t('form.phone')}
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={t('form.phonePlaceholder')}
                          className="rounded-xl border-gray-200 dark:border-gray-700 focus:border-[#00629B] focus:ring-[#00629B]"
                          disabled={formStatus === 'loading'}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-primary mb-2"
                        >
                          {t('form.subject')}
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder={t('form.subjectPlaceholder')}
                          className="rounded-xl border-gray-200 dark:border-gray-700 focus:border-[#00629B] focus:ring-[#00629B]"
                          disabled={formStatus === 'loading'}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-primary mb-2"
                      >
                        {t('form.messageRequired')} <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t('form.messagePlaceholder')}
                        rows={6}
                        className="rounded-xl border-gray-200 dark:border-gray-700 focus:border-[#00629B] focus:ring-[#00629B] resize-none"
                        disabled={formStatus === 'loading'}
                      />
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="privacy"
                        name="privacy"
                        required
                        checked={formData.privacy}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 border-gray-300 rounded"
                        style={{ accentColor: '#00629B' }}
                        disabled={formStatus === 'loading'}
                      />
                      <label
                        htmlFor="privacy"
                        className="text-sm text-muted-foreground"
                      >
                        {t('form.privacy')} <span className="text-red-500">*</span>
                      </label>
                    </div>

                    {/* hCaptcha */}
                    <div className="flex justify-center">
                      <div
                        className="h-captcha"
                        data-sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                        data-callback="onCaptchaSuccess"
                      ></div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={formStatus === 'loading'}
                      className="w-full text-white rounded-xl py-3 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background:
                          formStatus === 'loading'
                            ? '#6b7280'
                            : `linear-gradient(to right, #00629B, #004f7c)`,
                      }}
                      onMouseEnter={(e) => {
                        if (formStatus !== 'loading') {
                          e.currentTarget.style.background = `linear-gradient(to right, #004f7c, #003a5c)`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (formStatus !== 'loading') {
                          e.currentTarget.style.background = `linear-gradient(to right, #00629B, #004f7c)`;
                        }
                      }}
                    >
                      {formStatus === 'loading' ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {t('form.sending')}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          {t('form.send')}
                        </>
                      )}
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
