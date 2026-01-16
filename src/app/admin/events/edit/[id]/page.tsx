'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ImageUpload } from '@/components/ImageUpload';

interface EventFormData {
  title: { tr: string; en: string };
  description: { tr: string; en: string };
  date: string;
  time: string;
  location: { tr: string; en: string };
  category: { tr: string; en: string };
  image: string;
  registrationUrl: string;
  participants: { tr: string; en: string };
  status: 'upcoming' | 'past';
  statusLabel: { tr: string; en: string };
}

export default function EditEventPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    title: { tr: '', en: '' },
    description: { tr: '', en: '' },
    date: '',
    time: '',
    location: { tr: '', en: '' },
    category: { tr: '', en: '' },
    image: '',
    registrationUrl: '',
    participants: { tr: '', en: '' },
    status: 'upcoming',
    statusLabel: { tr: 'Yaklaşan', en: 'Upcoming' },
  });

  useEffect(() => {
    loadEvent();
  }, [params.id]);

  const loadEvent = async () => {
    try {
      const docRef = doc(db, 'events', params.id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data() as EventFormData;
        setFormData(data);
      } else {
        alert('Etkinlik bulunamadı');
        router.push('/admin/events');
      }
    } catch (error) {
      console.error('Error loading event:', error);
      alert('Etkinlik yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.tr || !formData.title.en) {
      alert('Lütfen başlık alanlarını doldurun');
      return;
    }
    if (!formData.description.tr || !formData.description.en) {
      alert('Lütfen açıklama alanlarını doldurun');
      return;
    }
    if (!formData.date || !formData.time) {
      alert('Lütfen tarih ve saat alanlarını doldurun');
      return;
    }

    setSaving(true);
    try {
      const docRef = doc(db, 'events', params.id);
      await updateDoc(docRef, {
        ...formData,
        updatedAt: serverTimestamp(),
      });

      alert('Etkinlik başarıyla güncellendi!');
      router.push('/admin/events');
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Etkinlik güncellenirken hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (url: string, path: string) => {
    setFormData({ ...formData, image: url });
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
      <div className="flex items-center gap-4">
        <Link href="/admin/events">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Etkinliği Düzenle</h1>
          <p className="text-muted-foreground">
            Etkinlik bilgilerini güncelleyin
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Başlık */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title-tr">Başlık (Türkçe) *</Label>
            <Input
              id="title-tr"
              value={formData.title.tr}
              onChange={(e) => setFormData({ ...formData, title: { ...formData.title, tr: e.target.value } })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title-en">Title (English) *</Label>
            <Input
              id="title-en"
              value={formData.title.en}
              onChange={(e) => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })}
              required
            />
          </div>
        </div>

        {/* Açıklama */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="desc-tr">Açıklama (Türkçe) *</Label>
            <Textarea
              id="desc-tr"
              value={formData.description.tr}
              onChange={(e) => setFormData({ ...formData, description: { ...formData.description, tr: e.target.value } })}
              rows={4}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="desc-en">Description (English) *</Label>
            <Textarea
              id="desc-en"
              value={formData.description.en}
              onChange={(e) => setFormData({ ...formData, description: { ...formData.description, en: e.target.value } })}
              rows={4}
              required
            />
          </div>
        </div>

        {/* Tarih ve Saat */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Tarih *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Saat *</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Konum */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location-tr">Konum (Türkçe)</Label>
            <Input
              id="location-tr"
              value={formData.location.tr}
              onChange={(e) => setFormData({ ...formData, location: { ...formData.location, tr: e.target.value } })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location-en">Location (English)</Label>
            <Input
              id="location-en"
              value={formData.location.en}
              onChange={(e) => setFormData({ ...formData, location: { ...formData.location, en: e.target.value } })}
            />
          </div>
        </div>

        {/* Kategori */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category-tr">Kategori (Türkçe)</Label>
            <Input
              id="category-tr"
              value={formData.category.tr}
              onChange={(e) => setFormData({ ...formData, category: { ...formData.category, tr: e.target.value } })}
              placeholder="Örn: Workshop, Seminer, Yarışma"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category-en">Category (English)</Label>
            <Input
              id="category-en"
              value={formData.category.en}
              onChange={(e) => setFormData({ ...formData, category: { ...formData.category, en: e.target.value } })}
              placeholder="E.g: Workshop, Seminar, Competition"
            />
          </div>
        </div>

        {/* Durum */}
        <div className="space-y-2">
          <Label htmlFor="status">Durum</Label>
          <Select
            value={formData.status}
            onValueChange={(value: 'upcoming' | 'past') => {
              setFormData({
                ...formData,
                status: value,
                statusLabel: value === 'upcoming' 
                  ? { tr: 'Yaklaşan', en: 'Upcoming' }
                  : { tr: 'Geçmiş', en: 'Past' }
              });
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Yaklaşan</SelectItem>
              <SelectItem value="past">Geçmiş</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Katılımcılar */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="participants-tr">Katılımcılar (Türkçe)</Label>
            <Input
              id="participants-tr"
              value={formData.participants.tr}
              onChange={(e) => setFormData({ ...formData, participants: { ...formData.participants, tr: e.target.value } })}
              placeholder="Örn: Tüm Öğrenciler"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="participants-en">Participants (English)</Label>
            <Input
              id="participants-en"
              value={formData.participants.en}
              onChange={(e) => setFormData({ ...formData, participants: { ...formData.participants, en: e.target.value } })}
              placeholder="E.g: All Students"
            />
          </div>
        </div>

        {/* Kayıt URL */}
        <div className="space-y-2">
          <Label htmlFor="registrationUrl">Kayıt Linki (Opsiyonel)</Label>
          <Input
            id="registrationUrl"
            type="url"
            value={formData.registrationUrl}
            onChange={(e) => setFormData({ ...formData, registrationUrl: e.target.value })}
            placeholder="https://..."
          />
        </div>

        {/* Görsel Yükleme */}
        <div className="space-y-2">
          <Label>Etkinlik Görseli</Label>
          <ImageUpload onUploadComplete={handleImageUpload} currentImageUrl={formData.image} />
        </div>

        {/* Butonlar */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={saving}
            className="bg-[#00629B] hover:bg-[#004A75]"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Güncelleniyor...
              </>
            ) : (
              'Güncelle'
            )}
          </Button>
          <Link href="/admin/events">
            <Button type="button" variant="outline">
              İptal
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
