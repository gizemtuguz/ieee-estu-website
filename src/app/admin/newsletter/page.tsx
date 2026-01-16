'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Mail,
  Download,
  Trash2,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Search,
} from 'lucide-react';

type Subscriber = {
  id: string;
  email: string;
  subscribedAt: string;
  locale: string;
};

export default function NewsletterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [sendingCampaign, setSendingCampaign] = useState(false);
  const [campaignSubject, setCampaignSubject] = useState('');
  const [campaignContent, setCampaignContent] = useState('');
  const [campaignStatus, setCampaignStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      } else {
        fetchSubscribers();
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const filtered = subscribers.filter((sub) =>
      sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubscribers(filtered);
  }, [searchTerm, subscribers]);

  const fetchSubscribers = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/admin/newsletter', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch subscribers');
      }

      const data = await response.json();
      setSubscribers(data.subscribers || []);
      setFilteredSubscribers(data.subscribers || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu aboneyi silmek istediğinizden emin misiniz?')) return;

    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/admin/newsletter', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      setSubscribers((prev) => prev.filter((sub) => sub.id !== id));
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      alert('Abone silinirken bir hata oluştu.');
    }
  };

  const handleExportCSV = () => {
    const csv = [
      ['Email', 'Subscribed At', 'Locale'].join(','),
      ...filteredSubscribers.map((sub) =>
        [
          sub.email,
          new Date(sub.subscribedAt).toLocaleString(),
          sub.locale,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleSendCampaign = async () => {
    if (!campaignSubject || !campaignContent) {
      setCampaignStatus({
        type: 'error',
        message: 'Lütfen konu ve içerik alanlarını doldurun.',
      });
      return;
    }

    if (filteredSubscribers.length === 0) {
      setCampaignStatus({
        type: 'error',
        message: 'Gönderilecek abone bulunamadı.',
      });
      return;
    }

    setSendingCampaign(true);
    setCampaignStatus({ type: null, message: '' });

    try {
      const emails = filteredSubscribers.map((sub) => sub.email);

      const response = await fetch('/api/newsletter/campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emails,
          subject: campaignSubject,
          html: campaignContent,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCampaignStatus({
          type: 'success',
          message: `Kampanya başarıyla gönderildi! ${data.sent}/${data.total} email gönderildi.`,
        });
        setCampaignSubject('');
        setCampaignContent('');
      } else {
        throw new Error(data.error || 'Email gönderimi başarısız');
      }
    } catch (error) {
      console.error('Campaign error:', error);
      setCampaignStatus({
        type: 'error',
        message: 'Kampanya gönderilirken bir hata oluştu.',
      });
    } finally {
      setSendingCampaign(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bülten Aboneleri</h1>
        <p className="text-muted-foreground">
          Toplam {subscribers.length} abone
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Abone</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Türkçe</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscribers.filter((s) => s.locale === 'tr').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">İngilizce</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscribers.filter((s) => s.locale === 'en').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Email ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={handleExportCSV} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          CSV İndir
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Kampanya Gönder
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Email Kampanyası Gönder</DialogTitle>
              <DialogDescription>
                {filteredSubscribers.length} aboneye email gönderilecek
              </DialogDescription>
            </DialogHeader>

            {campaignStatus.type && (
              <div
                className={`p-4 rounded-lg flex items-center gap-2 ${
                  campaignStatus.type === 'success'
                    ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                    : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                }`}
              >
                {campaignStatus.type === 'success' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
                <p className="text-sm">{campaignStatus.message}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Konu</label>
                <Input
                  placeholder="Email konusu"
                  value={campaignSubject}
                  onChange={(e) => setCampaignSubject(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium">İçerik (HTML)</label>
                <Textarea
                  placeholder="Email içeriği (HTML formatında)"
                  value={campaignContent}
                  onChange={(e) => setCampaignContent(e.target.value)}
                  rows={10}
                  className="mt-2 font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  HTML formatında email içeriği girin. Yukarıdaki hoşgeldin
                  emailini örnek alabilirsiniz.
                </p>
              </div>
            </div>

            <Button
              onClick={handleSendCampaign}
              disabled={sendingCampaign}
              className="w-full"
            >
              {sendingCampaign ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Kampanyayı Gönder
                </>
              )}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Kayıt Tarihi</TableHead>
                <TableHead>Dil</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscribers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">
                    <p className="text-muted-foreground">
                      {searchTerm
                        ? 'Arama sonucu bulunamadı'
                        : 'Henüz abone yok'}
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="font-medium">
                      {subscriber.email}
                    </TableCell>
                    <TableCell>
                      {new Date(subscriber.subscribedAt).toLocaleString(
                        'tr-TR'
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {subscriber.locale.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(subscriber.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
