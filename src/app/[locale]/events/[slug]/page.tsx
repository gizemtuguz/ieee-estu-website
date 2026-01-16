import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react';
import { EVENTS } from '@/data/events';

export const dynamicParams = false;

export function generateStaticParams() {
  return EVENTS.flatMap((event) => [
    { locale: 'tr', slug: event.slug },
    { locale: 'en', slug: event.slug },
  ]);
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: 'tr' | 'en'; slug: string }>;
}) {
  const { locale, slug } = await params;
  const event = EVENTS.find((item) => item.slug === slug);

  if (!event) {
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

  const backPath = locale === 'tr' ? '/tr/events' : '/en/events';

  return (
    <SiteLayout>
      <section className="py-16 bg-gray-100 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button variant="ghost" asChild className="px-0">
              <Link href={backPath} className="flex items-center text-sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {locale === 'tr' ? 'Etkinliklere Dön' : 'Back to Events'}
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="relative h-72 lg:h-[480px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={event.image}
                alt={event.title[locale]}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-6">
              <div>
                <Badge className="mb-3">
                  {event.category[locale]}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                  {event.title[locale]}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {event.description[locale]}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" style={{ color: '#00629B' }} />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" style={{ color: '#00629B' }} />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" style={{ color: '#00629B' }} />
                  {event.location[locale]}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-2" style={{ color: '#00629B' }} />
                  {event.participants[locale]}
                </div>
              </div>

              <Card className="border-0 rounded-2xl">
                <CardContent className="p-6 space-y-4">
                  {event.longDescription[locale].map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </CardContent>
              </Card>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  {locale === 'tr' ? 'Öne Çıkanlar' : 'Highlights'}
                </h2>
                <div className="grid gap-3">
                  {event.highlights[locale].map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span
                        className="inline-block w-2 h-2 rounded-full mt-2"
                        style={{ backgroundColor: '#00629B' }}
                      />
                      <p className="text-muted-foreground">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {event.registrationUrl && event.status === 'upcoming' && (
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl"
                  size="lg"
                  asChild
                >
                  <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                    {locale === 'tr' ? 'Başvuru Yap' : 'Apply Now'}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
