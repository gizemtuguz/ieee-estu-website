'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';
import { BLOG_POSTS, type LocaleKey } from '@/data/blogPosts';
import { buildLocalizedPath, ENGLISH_ROUTES } from '@/i18n/paths';

export default function BlogPage() {
  const t = useTranslations('blog');
  const locale = useLocale() as LocaleKey;

  const getCategoryColor = (category: string) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('yarış') || categoryLower.includes('compet'))
      return 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200';
    if (categoryLower.includes('teknik') || categoryLower.includes('technical'))
      return 'bg-slate-200 dark:bg-slate-700 text-gray-800 dark:text-gray-100';
    if (categoryLower.includes('ieee'))
      return 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200';
    return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const localeStr = locale === 'tr' ? 'tr-TR' : 'en-US';
    return date.toLocaleDateString(localeStr, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SiteLayout>
      <section className="py-20 bg-gray-100 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => {
              const postPath = `/blog/${post.slug}/${locale}`;

              return (
                <Card
                  key={post.slug}
                  className="group hover:shadow-xl dark:hover:shadow-[#00629B]/20 dark:hover:ring-1 dark:hover:ring-[#00629B]/50 transition-all duration-300 rounded-2xl border-0 bg-white dark:bg-slate-950 hover:bg-white dark:hover:bg-slate-970 hover:-translate-y-1 cursor-pointer p-0 gap-0"
                >
                  <Link href={postPath} className="block">
                    <div className="relative overflow-hidden rounded-t-2xl h-48">
                      <Image
                        src={post.image}
                        alt={post.title[locale]}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category[locale])}`}
                        >
                          {post.category[locale]}
                        </Badge>
                      </div>
                    </div>
                  </Link>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2 group-hover:transition-colors duration-200">
                      {post.title[locale]}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt[locale]}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <span>{post.readTime[locale]}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <Link
                        href={postPath}
                        className="font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform duration-200"
                        style={{ color: '#00629B' }}
                      >
                        {t('readMore')}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
