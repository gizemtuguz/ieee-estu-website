'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Loader2 } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

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

export default function EventDetailPage() {
  const params = useParams();
  const locale = params.locale as 'tr' | 'en';
  const slug = params.slug as string;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      try {
        const q = query(collection(db, 'events'), where('slug', '==', slug));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const eventData = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Event;
          setEvent(eventData);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, [slug]);

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

  if (loading) {
    return (
      <SiteLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#00629B]" />
        </div>
      </SiteLayout>
    );
  }

  if (!event) {
    return (
      <SiteLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="text-2xl font-bold mb-4">{locale === 'tr' ? 'Etkinlik bulunamadı' : 'Event not found'}</h1>
          <Link href={backPath}>
            <Button>{locale === 'tr' ? 'Etkinliklere Dön' : 'Back to Events'}</Button>
          </Link>
        </div>
      </SiteLayout>
    );
  }

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
            {event.image && (
              <div className="relative h-72 lg:h-[480px] rounded-2xl overflow-hidden shadow-lg bg-gray-200">
                <Image
                  src={event.image}
                  alt={event.title[locale]}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            )}

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
                {event.location && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" style={{ color: '#00629B' }} />
                    {event.location[locale]}
                  </div>
                )}
                {event.participants && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" style={{ color: '#00629B' }} />
                    {event.participants[locale]}
                  </div>
                )}
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
