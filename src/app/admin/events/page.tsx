'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Loader2, Calendar as CalendarIcon } from 'lucide-react';
import Link from 'next/link';

interface Event {
  id: string;
  slug: string;
  title: { tr: string; en: string };
  date: string;
  status: 'upcoming' | 'past';
  statusLabel: { tr: string; en: string };
  category: { tr: string; en: string };
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const q = query(collection(db, 'events'), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Event[];
      setEvents(eventsData);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm('Bu etkinliği silmek istediğinizden emin misiniz?')) return;

    setDeleting(eventId);
    try {
      await deleteDoc(doc(db, 'events', eventId));
      setEvents(events.filter(e => e.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Etkinlik silinirken hata oluştu');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Etkinlikler</h1>
          <p className="text-muted-foreground">
            Etkinlikleri yönetin, düzenleyin veya yeni etkinlik oluşturun
          </p>
        </div>
        <Link href="/admin/events/create">
          <Button className="bg-[#00629B] hover:bg-[#004A75]">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Etkinlik
          </Button>
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="border rounded-lg p-12 text-center">
          <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Henüz etkinlik yok</h3>
          <p className="text-muted-foreground mb-4">
            İlk etkinliğinizi oluşturarak başlayın
          </p>
          <Link href="/admin/events/create">
            <Button className="bg-[#00629B] hover:bg-[#004A75]">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Etkinlik Oluştur
            </Button>
          </Link>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Başlık</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{event.title.tr}</div>
                      <div className="text-sm text-muted-foreground">{event.title.en}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{event.category.tr}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(event.date).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={event.status === 'upcoming' ? 'default' : 'secondary'}
                    >
                      {event.statusLabel.tr}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/events/edit/${event.id}`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(event.id)}
                        disabled={deleting === event.id}
                      >
                        {deleting === event.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4 text-destructive" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
