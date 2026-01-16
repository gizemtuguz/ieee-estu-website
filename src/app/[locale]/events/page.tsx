'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, ExternalLink, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { buildLocalizedPath, ENGLISH_ROUTES } from '@/i18n/paths';
import { type LocaleKey } from '@/data/events';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { useParams } from 'next/navigation';

interface Event {
  id: string;
  slug: string;
  title: { tr: string; en: string };
  description: { tr: string; en: string };
  date: string;
  time: string;
  location: { tr: string; en: string };
  category: { tr: string; en: string };
  image: string;
  status: 'upcoming' | 'past';
  statusLabel: { tr: string; en: string };
  participants?: { tr: string; en: string };
  registrationUrl?: string;
}

export default function EventsPage() {
  const params = useParams();
  const locale = params.locale as LocaleKey;
  const t = useTranslations('events');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const q = query(collection(db, 'events'), orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        const eventsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[];
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  const upcomingEvents = events.filter((event) => event.status === 'upcoming');
  const pastEvents = events.filter((event) => event.status === 'past');

  const getCategoryColor = (category: string) => {
    const categoryKey = category.toLowerCase().replace(/\s+/g, '');
    if (categoryKey.includes('workshop'))
      return 'bg-slate-200 dark:bg-slate-700 text-gray-800 dark:text-gray-100';
    if (categoryKey.includes('yarış') || categoryKey.includes('competition'))
      return 'bg-slate-200 dark:bg-slate-700 text-red-800 dark:text-red-200';
    if (categoryKey.includes('seminer') || categoryKey.includes('seminar'))
      return 'bg-slate-200 dark:bg-slate-700 text-green-800 dark:text-green-200';
    if (categoryKey.includes('proje') || categoryKey.includes('project'))
      return 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200';
    return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100';
  };

  const getStatusColor = (status: string) => {
    const statusKey = status.toLowerCase().replace(/\s+/g, '');
    if (statusKey.includes('kayıt') || statusKey.includes('registration'))
      return 'bg-green-600 dark:bg-green-700 text-white';
    if (statusKey.includes('yakında') || statusKey.includes('coming'))
      return 'text-white';
    if (statusKey.includes('tamamlan') || statusKey.includes('completed'))
      return 'bg-gray-600 dark:bg-gray-700 text-white';
    return 'bg-gray-600 dark:bg-gray-700 text-white';
  };

  const getStatusStyle = (status: string) => {
    const statusKey = status.toLowerCase().replace(/\s+/g, '');
    if (statusKey.includes('yakında') || statusKey.includes('coming'))
      return { backgroundColor: '#00629B' };
    return {};
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

  const EventCard = ({
    event,
    showApply = false,
  }: {
    event: Event;
    showApply?: boolean;
  }) => {
    const eventPath = `/${locale}/events/${event.slug}`;

    return (
      <Card className="group hover:shadow-xl dark:hover:shadow-[#00629B]/20 dark:hover:ring-1 dark:hover:ring-[#00629B]/50 transition-all duration-300 rounded-2xl border-0 bg-white dark:bg-slate-950 hover:bg-white dark:hover:bg-slate-970 overflow-hidden hover:-translate-y-1 h-full flex flex-col">
        <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={event.image}
              alt={event.title[locale]}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          <div className="absolute top-4 right-4">
            <Badge
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.statusLabel[locale])}`}
              style={getStatusStyle(event.statusLabel[locale])}
            >
              {event.statusLabel[locale]}
            </Badge>
          </div>
          <div className="absolute top-4 left-4">
            <Badge
              className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category[locale])}`}
            >
              {event.category[locale]}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2">
            {event.title[locale]}
          </h3>

          <div className="space-y-3 mb-4">
            <div className="flex items-center text-muted-foreground text-sm">
              <Calendar className="h-4 w-4 mr-2" style={{ color: '#00629B' }} />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center text-muted-foreground text-sm">
              <Clock className="h-4 w-4 mr-2" style={{ color: '#00629B' }} />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-2" style={{ color: '#00629B' }} />
              <span>{event.location[locale]}</span>
            </div>
            {event.participants && (
              <div className="flex items-center text-muted-foreground text-sm">
                <Users className="h-4 w-4 mr-2" style={{ color: '#00629B' }} />
                <span>{event.participants[locale]}</span>
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col">
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
              {event.description[locale]}
            </p>

            <div className="flex gap-2 mt-auto">
              <Button
                className="flex-1 text-white rounded-xl"
                style={{ backgroundColor: '#00629B' }}
                size="sm"
                asChild
              >
                <Link href={eventPath}>
                  {t('details')}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {showApply && event.registrationUrl && (
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl"
                  size="sm"
                  asChild
                >
                  <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                    {locale === 'tr' ? 'Başvuru Yap' : 'Apply Now'}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
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

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#00629B]" />
            </div>
          ) : (
            <>
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-primary mb-8 text-center">
                  {t('upcomingTitle')}
                </h3>
                {upcomingEvents.length === 0 ? (
                  <p className="text-center text-muted-foreground">
                    {locale === 'tr' ? 'Henüz yaklaşan etkinlik yok' : 'No upcoming events yet'}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} event={event} showApply />
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary mb-8 text-center">
                  {t('pastTitle')}
                </h3>
                {pastEvents.length === 0 ? (
                  <p className="text-center text-muted-foreground">
                    {locale === 'tr' ? 'Henüz geçmiş etkinlik yok' : 'No past events yet'}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {pastEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          <div className="mt-16">
            <Card className="border-0 rounded-2xl bg-[#00629B] dark:bg-[#00629B]">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {t('newsletter.title')}
                </h3>
                <p className="text-blue-50 mb-6 max-w-2xl mx-auto">
                  {t('newsletter.description')}
                </p>
                <Button
                  size="lg"
                  className="bg-white hover:bg-gray-50 px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#00629B]/30 dark:hover:shadow-[#00629B]/50 hover:ring-2 hover:ring-[#00629B]/40 dark:hover:ring-[#00629B]/60 hover:-translate-y-0.5 transition-all duration-300"
                  style={{ color: '#00629B' }}
                >
                  {t('newsletter.button')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
