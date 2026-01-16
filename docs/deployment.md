# Firebase Deployment Guide

## Prerequisites

- Firebase CLI installed: `npm install -g firebase-tools`
- Firebase project created at [console.firebase.google.com](https://console.firebase.google.com)
- Node.js 18+ installed

## Step 1: Firebase Project Setup

1. Create a new Firebase project:
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Click "Add Project"
   - Name it "ieee-estu" (or your choice)
   - Enable Google Analytics (optional)

2. Enable required services:
   - **Authentication**: Enable Email/Password provider
   - **Firestore Database**: Create database in production mode
   - **Storage**: Enable Firebase Storage

## Step 2: Get Firebase Credentials

### Web App Credentials (Client)
1. Go to Project Settings > General
2. Scroll to "Your apps" > Web apps
3. Click "Add app" or select existing
4. Copy the config object

### Service Account (Admin SDK)
1. Go to Project Settings > Service Accounts
2. Click "Generate new private key"
3. Save the JSON file securely

## Step 3: Configure Environment Variables

Create `.env.local` in project root:

```env
# Firebase Client SDK (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK (Private - Server-side only)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"

# Admin Authorization
ADMIN_EMAILS=admin1@example.com,admin2@example.com
```

**Important**: 
- Never commit `.env.local` to git
- For `FIREBASE_PRIVATE_KEY`, keep the `\n` characters
- Wrap the private key in double quotes

## Step 4: Deploy Firestore Security Rules

Create `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && 
             exists(/databases/$(database)/documents/admins/$(request.auth.token.email));
    }
    
    // Public read for published content
    match /events/{eventId} {
      allow read: if resource.data.status == 'published' || isAdmin();
      allow write: if isAdmin();
    }
    
    match /posts/{postId} {
      allow read: if resource.data.status == 'published' || isAdmin();
      allow write: if isAdmin();
    }
    
    match /site_pages/{pageKey} {
      allow read: if resource.data.status == 'published' || isAdmin();
      allow write: if isAdmin();
    }
    
    match /media/{mediaId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Admin users collection
    match /admins/{email} {
      allow read: if request.auth != null;
      allow write: if false; // Managed server-side only
    }
  }
}
```

Deploy rules:
```bash
firebase login
firebase init firestore
firebase deploy --only firestore:rules
```

## Step 5: Deploy Storage Security Rules

Create `storage.rules`:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Public read for all files
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // Admin write access only
    match /images/{imageId} {
      allow write: if request.auth != null;
    }
    
    match /documents/{docId} {
      allow write: if request.auth != null;
    }
  }
}
```

Deploy:
```bash
firebase deploy --only storage
```

## Step 6: Initialize Admin Users

Run this script to add initial admin:

```typescript
// scripts/add-admin.ts
import { adminDb } from '@/lib/firebase/admin';
import { Timestamp } from 'firebase-admin/firestore';

async function addAdmin(email: string) {
  await adminDb.collection('admins').doc(email).set({
    email,
    role: 'admin',
    createdAt: Timestamp.now(),
  });
  console.log(`Admin added: ${email}`);
}

addAdmin('your-email@example.com');
```

## Step 7: Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Link project:
```bash
cd next-app
vercel link
```

3. Add environment variables in Vercel dashboard:
   - Go to Project Settings > Environment Variables
   - Add all variables from `.env.local`

4. Deploy:
```bash
vercel --prod
```

## Firestore Data Seeding

Run seed script to initialize site content:

```bash
npm run seed
```

This will create:
- Initial `site_pages` documents
- Sample navbar/footer configuration
- Default membership/event form links

## Troubleshooting

### "Permission denied" errors
- Check Firestore security rules
- Verify user is authenticated
- Confirm email is in `admins` collection

### "Invalid service account" error
- Verify `FIREBASE_PRIVATE_KEY` has proper `\n` characters
- Check service account JSON is correct
- Ensure private key is wrapped in quotes

### Build errors on Vercel
- Check all environment variables are set
- Verify Firebase quotas not exceeded
- Check build logs for specific errors

## Next Steps

1. Test authentication flow
2. Create first event via admin panel
3. Verify content displays on public site
4. Set up Firebase monitoring
5. Configure backup strategy

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
