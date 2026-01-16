# GitHub Image Upload Setup Guide

## 1. GitHub Personal Access Token Oluşturma

1. GitHub'da Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token (classic)" butonuna tıklayın
3. Token'a bir isim verin (örn: "IEEE ESTU Image Upload")
4. Şu izinleri seçin:
   - ✅ `repo` (Full control of private repositories)
   - Özellikle `repo:write` gerekli
5. "Generate token" butonuna tıklayın
6. Token'ı kopyalayın (bir daha gösterilmeyecek!)

## 2. Environment Variables

`.env.local` dosyanıza şunları ekleyin:

```bash
# GitHub Repository for Image Uploads
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_REPO_OWNER=your-username
GITHUB_REPO_NAME=next-app
GITHUB_BRANCH=main
```

## 3. Kullanım

Admin panelinde ImageUpload component'ini kullanın:

```tsx
import { ImageUpload } from '@/components/ImageUpload';

<ImageUpload
  folder="events"
  onUploadComplete={(url, path) => {
    console.log('Uploaded:', url);
    // URL'i formunuza kaydedin
  }}
/>
```

## 4. Nasıl Çalışır?

1. Kullanıcı resim seçer
2. Resim otomatik olarak `public/images/{folder}/` klasörüne yüklenir
3. GitHub'a commit edilir
4. Public URL döner (örn: `/images/events/my-image.jpg`)
5. Bu URL Next.js tarafından otomatik serve edilir

## 5. Avantajlar

- ✅ Tamamen ücretsiz
- ✅ Version control (tüm değişiklikler kaydedilir)
- ✅ CDN desteği (Vercel/Netlify ile)
- ✅ Kolay backup ve migration
- ✅ Firebase Storage'a gerek yok!

## 6. Limitler

- Max dosya boyutu: 5MB (değiştirilebilir)
- GitHub repo size limit: 100GB (soft limit)
- Tek dosya için: 100MB (GitHub limit)

## 7. Güvenlik

⚠️ **ÖNEMLİ:** 
- GitHub token'ı asla public repo'ya commit etmeyin!
- `.env.local` dosyası `.gitignore`'da olmalı
- Token'a sadece gerekli izinleri verin
