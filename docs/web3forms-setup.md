# Web3Forms İletişim Formu Kurulum Rehberi

## 🚀 Hızlı Başlangıç

Web3Forms, ücretsiz bir form backend servisi olup, reCAPTCHA koruması ve spam filtreleme sunmaktadır.

### 1. Web3Forms Access Key Alma

1. [https://web3forms.com/](https://web3forms.com/) adresini ziyaret edin
2. "Get Started Free" butonuna tıklayın
3. Email adresinizi girin
4. Gelen maildeki doğrulama linkine tıklayın
5. Dashboard'dan **Access Key**'inizi kopyalayın

### 2. Environment Variable Ayarlama

`.env.local` dosyanıza aşağıdaki satırı ekleyin:

```env
NEXT_PUBLIC_WEB3FORMS_KEY=your_actual_access_key_here
```

**ÖNEMLİ:** `YOUR_ACCESS_KEY_HERE` yerine gerçek access key'inizi yazın.

### 3. Test Etme

1. Projeyi yeniden başlatın:
   ```bash
   npm run dev
   ```

2. `http://localhost:3000/tr/iletisim` veya `http://localhost:3000/en/iletisim` adresine gidin

3. Formu doldurup gönderin

4. Email adresinize gelen bildirimi kontrol edin

## ✨ Özellikler

### Mevcut Özellikler
- ✅ Form validasyonu (zorunlu alanlar)
- ✅ Loading state (gönderim sırasında)
- ✅ Success/Error mesajları
- ✅ Form temizleme (başarılı gönderim sonrası)
- ✅ Responsive tasarım
- ✅ Dark mode desteği
- ✅ Türkçe/İngilizce dil desteği

### Web3Forms Ücretsiz Plan
- ✅ **250 submission/ay** (aylık form gönderimi)
- ✅ Spam koruması
- ✅ Email bildirimleri
- ✅ Custom subject ve reply-to
- ✅ File upload (opsiyonel)
- ✅ reCAPTCHA v3 desteği

## 🔧 Gelişmiş Yapılandırma

### reCAPTCHA Ekleme (Opsiyonel)

Ekstra spam koruması için reCAPTCHA ekleyebilirsiniz:

1. [Google reCAPTCHA](https://www.google.com/recaptcha/admin) adresinden site kaydı yapın
2. reCAPTCHA v3 seçin
3. Site key ve secret key alın

4. `.env.local` dosyasına ekleyin:
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
```

5. `iletisim/page.tsx` dosyasına reCAPTCHA implementasyonu ekleyin:

```tsx
// Script ekle
useEffect(() => {
  const script = document.createElement('script');
  script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
  document.body.appendChild(script);
  return () => {
    document.body.removeChild(script);
  };
}, []);

// Form submit'te token al
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const token = await grecaptcha.execute(
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    { action: 'submit' }
  );
  
  // Token'ı form data'ya ekle
  body: JSON.stringify({
    // ... diğer alanlar
    'g-recaptcha-response': token,
  }),
};
```

### Custom Email Template

Web3Forms dashboard'dan email template'inizi özelleştirebilirsiniz:
- Logo ekleyebilirsiniz
- Renkleri değiştirebilirsiniz
- Footer bilgileri ekleyebilirsiniz

### Webhook Entegrasyonu

Gelen form verilerini başka servislere iletmek için webhook kullanabilirsiniz:
- Slack bildirimleri
- Discord bildirimleri
- Custom API'ler
- Google Sheets entegrasyonu

## 🐛 Sorun Giderme

### "Access key is required" Hatası
- `.env.local` dosyasındaki key'i kontrol edin
- Projeyi yeniden başlatın (`npm run dev`)
- Browser cache'i temizleyin

### Email Gelmiyor
- Spam klasörünü kontrol edin
- Web3Forms dashboard'dan email adresinizi doğrulayın
- Email provider'ınızın Web3Forms'u engellemediğinden emin olun

### Form Gönderilmiyor
- Browser console'u kontrol edin (F12)
- Network tab'inde API çağrısını inceleyin
- CORS hatası varsa Next.js'i yeniden başlatın

## 📊 Gelen Mesajları Görüntüleme

Web3Forms dashboard'dan:
1. Tüm gelen mesajları görebilirsiniz
2. CSV olarak export edebilirsiniz
3. Email bildirimlerini ayarlayabilirsiniz
4. Spam filtreleme seviyesini değiştirebilirsiniz

## 🔒 Güvenlik

- Access key'i `.env.local` dosyasında tutun
- `.env.local` dosyasını `.gitignore` içinde tutun
- Production'da environment variables'ı hosting provider'ınızda ayarlayın
- Rate limiting için Web3Forms otomatik spam koruması vardır

## 📝 Form Alanları

Mevcut form alanları:
- **name** (zorunlu): Ad soyad
- **email** (zorunlu): Email adresi
- **phone**: Telefon numarası
- **subject**: Konu
- **message** (zorunlu): Mesaj içeriği
- **privacy** (zorunlu): Gizlilik politikası onayı

## 🚀 Production Deployment

Vercel/Netlify gibi platformlarda:

1. Environment variables bölümüne gidin
2. `NEXT_PUBLIC_WEB3FORMS_KEY` ekleyin
3. Value olarak access key'inizi yapıştırın
4. Deploy edin

## 📞 Destek

- Web3Forms: [https://web3forms.com/support](https://web3forms.com/support)
- Documentation: [https://docs.web3forms.com/](https://docs.web3forms.com/)
