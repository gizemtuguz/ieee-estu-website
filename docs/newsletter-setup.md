# Newsletter (Bülten) Sistemi - Resend Entegrasyonu

## 🚀 Hızlı Başlangıç

Newsletter sisteminiz Firebase Firestore + Resend API ile çalışmaktadır.

### Özellikler

- ✅ Footer'da newsletter kayıt formu
- ✅ Firestore'da abone yönetimi
- ✅ Otomatik hoşgeldin emaili (Türkçe/İngilizce)
- ✅ Admin panelinde abone listesi
- ✅ CSV export
- ✅ Email kampanya gönderimi
- ✅ Spam koruması (duplicate check)
- ✅ Dark mode uyumlu email template'leri

## 📋 Kurulum Adımları

### 1. Resend API Key Alma

1. [https://resend.com/](https://resend.com/) adresini ziyaret edin
2. "Start Building" veya "Sign Up" ile kayıt olun
3. Dashboard'a gidin
4. "API Keys" bölümünden yeni bir API key oluşturun
5. API key'i kopyalayın

### 2. Environment Variable Ayarlama

`.env.local` dosyanıza ekleyin:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**ÖNEMLİ:** `YOUR_RESEND_API_KEY_HERE` yerine gerçek API key'inizi yazın.

### 3. Domain Doğrulama (Opsiyonel ama Önerilen)

**Şu anda:** `onboarding@resend.dev` adresi kullanılıyor (test için)

**Production için:**
1. Resend dashboard'da "Domains" bölümüne gidin
2. Kendi domain'inizi ekleyin (örn: `ieeeestu.org`)
3. DNS kayıtlarını domain sağlayıcınıza ekleyin
4. Doğrulama tamamlandıktan sonra:

Şu dosyalarda email adresini güncelleyin:
- `src/app/api/newsletter/welcome/route.ts`
- `src/app/api/newsletter/campaign/route.ts`

```typescript
from: 'IEEE ESTU <noreply@ieeeestu.org>' // veya newsletter@ieeeestu.org
```

### 4. Test Etme

1. Projeyi başlatın:
   ```bash
   npm run dev
   ```

2. Footer'daki newsletter formunu doldurun

3. Email kutunuzu kontrol edin (hoşgeldin emaili gelecek)

4. Admin panelinde görüntüleyin: `http://localhost:3000/admin/newsletter`

## 🎨 Sistem Akışı

### Kullanıcı Kaydı:
1. Kullanıcı footer'da email girer
2. Firestore'da duplicate kontrol yapılır
3. Email Firestore'a kaydedilir
4. Otomatik hoşgeldin emaili gönderilir (Resend API)
5. Başarı mesajı gösterilir

### Admin Paneli:
- `/admin/newsletter` adresinden erişim
- Tüm aboneleri listeleme
- Email ile arama
- CSV export
- Email kampanya gönderimi

## 📊 Resend Ücretsiz Plan

- ✅ **3,000 email/ay** (aylık limit)
- ✅ 100 email/gün
- ✅ Custom domain desteği
- ✅ Email analytics
- ✅ Webhook desteği
- ✅ API erişimi

## 🔧 Email Kampanya Gönderimi

### Admin Panelinden:

1. `/admin/newsletter` sayfasına gidin
2. "Kampanya Gönder" butonuna tıklayın
3. Konu ve HTML içerik girin
4. "Kampanyayı Gönder" ile tüm abonelere gönderin

### HTML Template Örneği:

Hoşgeldin emaili template'ini kullanabilirsiniz:
`src/lib/resend.ts` dosyasında `getWelcomeEmailTemplate` fonksiyonu

### API ile Gönderim:

```typescript
POST /api/newsletter/campaign
Content-Type: application/json

{
  "emails": ["user1@example.com", "user2@example.com"],
  "subject": "Yeni Etkinlik Duyurusu",
  "html": "<html>...</html>"
}
```

## 📁 Dosya Yapısı

```
src/
├── lib/
│   └── resend.ts                          # Resend client & email templates
├── app/
│   ├── api/
│   │   └── newsletter/
│   │       ├── welcome/
│   │       │   └── route.ts               # Hoşgeldin emaili API
│   │       └── campaign/
│   │           └── route.ts               # Kampanya gönderim API
│   └── admin/
│       └── newsletter/
│           └── page.tsx                   # Admin panel sayfası
└── components/
    └── layout/
        └── Footer.tsx                     # Newsletter kayıt formu
```

## 🎯 Email Template Özellikleri

### Hoşgeldin Emaili:
- ✅ Responsive tasarım
- ✅ Türkçe/İngilizce dil desteği
- ✅ IEEE ESTU branding (gradient header)
- ✅ Sosyal medya linkleri
- ✅ CTA button (Web sitesi linki)
- ✅ Dark mode uyumlu

### Özelleştirme:

`src/lib/resend.ts` dosyasındaki `getWelcomeEmailTemplate` fonksiyonunu düzenleyin:

```typescript
export const getWelcomeEmailTemplate = (locale: string) => {
  // Template kodları buradan özelleştirilebilir
}
```

## 🔒 Güvenlik

- ✅ API key server-side'da (`RESEND_API_KEY` - public değil)
- ✅ Duplicate email kontrolü
- ✅ Email validasyonu
- ✅ Rate limiting (Resend tarafından otomatik)
- ✅ Spam koruması

## 🐛 Sorun Giderme

### "RESEND_API_KEY is not defined" Hatası
- `.env.local` dosyasını kontrol edin
- Projeyi yeniden başlatın (`npm run dev`)
- API key'in doğru olduğundan emin olun

### Email Gelmiyor
1. **Spam klasörünü kontrol edin**
2. Resend dashboard'da "Logs" bölümünü kontrol edin
3. API key'in aktif olduğundan emin olun
4. Console'da hata mesajlarını kontrol edin

### "from" Email Adresi Hatası
- Test için: `onboarding@resend.dev` kullanın (varsayılan)
- Production için: Domain doğrulama yapın

### Rate Limit Hatası
- Ücretsiz plan: 100 email/gün, 3000 email/ay
- Dashboard'dan kullanımı kontrol edin
- Gerekirse plan yükseltin

## 📈 Analytics & Monitoring

### Resend Dashboard:
- Email gönderim istatistikleri
- Açılma oranları (open rates)
- Tıklama oranları (click rates)
- Bounce ve complaint oranları
- Real-time logs

### Admin Panel İstatistikleri:
- Toplam abone sayısı
- Türkçe/İngilizce abone dağılımı
- Kayıt tarihleri
- CSV export ile detaylı analiz

## 🚀 Production Deployment

### Vercel/Netlify:

1. Environment Variables ekleyin:
   ```
   RESEND_API_KEY=your_actual_key
   ```

2. Domain doğrulaması yapın (Resend'de)

3. Email adreslerini güncelleyin:
   ```typescript
   from: 'IEEE ESTU <newsletter@ieeeestu.org>'
   ```

4. Deploy edin

### Domain DNS Ayarları:

Resend domain doğrulama için gerekli DNS kayıtları:
- SPF record
- DKIM records
- Custom return-path

## 💡 İpuçları

### Email Deliverability:
1. ✅ Domain doğrulama yapın
2. ✅ SPF/DKIM/DMARC ayarlayın
3. ✅ Spam tetikleyici kelimelerden kaçının
4. ✅ Unsubscribe linki ekleyin (GDPR uyumu)
5. ✅ Test emaillerini spam klasöründen çıkarın

### Best Practices:
- Her zaman test emaili gönderin
- Template'leri mobile-first tasarlayın
- A/B testing yapın
- Analytics takip edin
- Düzenli yedekleme alın (CSV export)

## 📞 Destek

- Resend Docs: [https://resend.com/docs](https://resend.com/docs)
- Resend Support: [https://resend.com/support](https://resend.com/support)
- API Reference: [https://resend.com/docs/api-reference](https://resend.com/docs/api-reference)

## 🔄 Alternatif Email Servisleri

Eğer Resend yerine başka servis kullanmak isterseniz:

1. **SendGrid** - 100 email/gün ücretsiz
2. **Mailgun** - 5000 email/ay ücretsiz
3. **Amazon SES** - 62,000 email/ay (AWS Free Tier)
4. **Postmark** - 100 email/ay ücretsiz

Kod yapısı benzer - sadece `src/lib/resend.ts` dosyasını düzenlemeniz yeterli.
