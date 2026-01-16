import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowLeft } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogPosts';

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.flatMap((post) => [
    { locale: 'tr', slug: post.slug },
    { locale: 'en', slug: post.slug },
  ]);
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: 'tr' | 'en'; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const localeStr = locale === 'tr' ? 'tr-TR' : 'en-US';
    return date.toLocaleDateString(localeStr, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const backPath = locale === 'tr' ? '/tr/blog' : '/en/blog';

  return (
    <SiteLayout>
      <section className="py-16 bg-gray-100 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href={backPath} className="flex items-center text-sm text-muted-foreground hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {locale === 'tr' ? 'Bloga Dön' : 'Back to Blog'}
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <div className="relative h-72 lg:h-[420px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={post.image}
                  alt={post.title[locale]}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div>
                <Badge className="mb-3">
                  {post.category[locale]}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                  {post.title[locale]}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {post.excerpt[locale]}
                </p>
              </div>

              <Card className="border-0 rounded-2xl">
                <CardContent className="p-6 space-y-4">
                  {post.content[locale].map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-0 rounded-2xl">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" style={{ color: '#00629B' }} />
                    {formatDate(post.date)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-primary">
                      {locale === 'tr' ? 'Yazar' : 'Author'}:
                    </span>{' '}
                    {post.author[locale]}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-primary">
                      {locale === 'tr' ? 'Okuma' : 'Read'}:
                    </span>{' '}
                    {post.readTime[locale]}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 rounded-2xl">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-primary mb-4">
                    {locale === 'tr' ? 'Öne Çıkanlar' : 'Highlights'}
                  </h2>
                  <div className="space-y-3">
                    {post.highlights[locale].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span
                          className="inline-block w-2 h-2 rounded-full mt-2"
                          style={{ backgroundColor: '#00629B' }}
                        />
                        <p className="text-muted-foreground text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
