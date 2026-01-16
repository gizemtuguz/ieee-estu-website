'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUpload } from '@/components/ImageUpload';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [formData, setFormData] = useState({
    titleTr: '',
    titleEn: '',
    descriptionTr: '',
    descriptionEn: '',
    categoryTr: '',
    categoryEn: '',
    date: '',
    time: '',
    locationTr: '',
    locationEn: '',
    participantsTr: '',
    participantsEn: '',
    statusLabelTr: '',
    statusLabelEn: '',
    status: 'upcoming',
    registrationUrl: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const eventData = {
        slug: formData.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        title: {
          tr: formData.titleTr,
          en: formData.titleEn,
        },
        description: {
          tr: formData.descriptionTr,
          en: formData.descriptionEn,
        },
        category: {
          tr: formData.categoryTr,
          en: formData.categoryEn,
        },
        statusLabel: {
          tr: formData.statusLabelTr,
          en: formData.statusLabelEn,
        },
        location: {
          tr: formData.locationTr,
          en: formData.locationEn,
        },
        participants: {
          tr: formData.participantsTr,
          en: formData.participantsEn,
        },
        date: formData.date,
        time: formData.time,
        status: formData.status,
        image: imageUrl || '/images/placeholder-event.jpg',
        registrationUrl: formData.registrationUrl || null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'events'), eventData);
      router.push('/admin/events');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Etkinlik oluşturulurken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/events">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Yeni Etkinlik Oluştur</h1>
          <p className="text-muted-foreground">Etkinlik bilgilerini girin</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Temel Bilgiler</CardTitle>
            <CardDescription>Etkinliğin temel bilgilerini girin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="titleTr">Başlık (Türkçe) *</Label>
                <Input
                  id="titleTr"
                  value={formData.titleTr}
                  onChange={(e) => handleChange('titleTr', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="titleEn">Title (English) *</Label>
                <Input
                  id="titleEn"
                  value={formData.titleEn}
                  onChange={(e) => handleChange('titleEn', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="descriptionTr">Açıklama (Türkçe) *</Label>
                <Textarea
                  id="descriptionTr"
                  value={formData.descriptionTr}
                  onChange={(e) => handleChange('descriptionTr', e.target.value)}
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionEn">Description (English) *</Label>
                <Textarea
                  id="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={(e) => handleChange('descriptionEn', e.target.value)}
                  rows={4}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Etkinlik Detayları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="categoryTr">Kategori (Türkçe) *</Label>
                <Input
                  id="categoryTr"
                  placeholder="Workshop, Yarışma, Seminer..."
                  value={formData.categoryTr}
                  onChange={(e) => handleChange('categoryTr', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoryEn">Category (English) *</Label>
                <Input
                  id="categoryEn"
                  placeholder="Workshop, Competition, Seminar..."
                  value={formData.categoryEn}
                  onChange={(e) => handleChange('categoryEn', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Tarih *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Saat *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleChange('time', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Durum *</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Yaklaşan</SelectItem>
                    <SelectItem value="past">Geçmiş</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="locationTr">Konum (Türkçe) *</Label>
                <Input
                  id="locationTr"
                  value={formData.locationTr}
                  onChange={(e) => handleChange('locationTr', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="locationEn">Location (English) *</Label>
                <Input
                  id="locationEn"
                  value={formData.locationEn}
                  onChange={(e) => handleChange('locationEn', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="participantsTr">Katılımcılar (Türkçe) *</Label>
                <Input
                  id="participantsTr"
                  placeholder="Tüm öğrenciler"
                  value={formData.participantsTr}
                  onChange={(e) => handleChange('participantsTr', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="participantsEn">Participants (English) *</Label>
                <Input
                  id="participantsEn"
                  placeholder="All students"
                  value={formData.participantsEn}
                  onChange={(e) => handleChange('participantsEn', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="statusLabelTr">Durum Etiketi (Türkçe) *</Label>
                <Input
                  id="statusLabelTr"
                  placeholder="Kayıt Açık, Yakında, Tamamlandı"
                  value={formData.statusLabelTr}
                  onChange={(e) => handleChange('statusLabelTr', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="statusLabelEn">Status Label (English) *</Label>
                <Input
                  id="statusLabelEn"
                  placeholder="Registration Open, Coming Soon, Completed"
                  value={formData.statusLabelEn}
                  onChange={(e) => handleChange('statusLabelEn', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationUrl">Kayıt Linki (Opsiyonel)</Label>
              <Input
                id="registrationUrl"
                type="url"
                placeholder="https://forms.google.com/..."
                value={formData.registrationUrl}
                onChange={(e) => handleChange('registrationUrl', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Etkinlik Görseli</CardTitle>
            <CardDescription>Etkinlik için bir görsel yükleyin</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload
              folder="events"
              currentImageUrl={imageUrl}
              onUploadComplete={(url) => setImageUrl(url)}
            />
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="bg-[#00629B] hover:bg-[#004A75]">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Oluşturuluyor...
              </>
            ) : (
              'Etkinlik Oluştur'
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
