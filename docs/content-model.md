# Firestore Content Model

## Collections Overview

### 1. `events` Collection
Stores all events, workshops, competitions, and seminars.

**Document Structure:**
```typescript
{
  id: string;
  title: {
    tr: string;
    en: string;
  };
  slug: string; // URL-friendly identifier
  description: {
    tr: string;
    en: string;
  };
  startAt: Timestamp;
  endAt: Timestamp;
  location: {
    tr: string;
    en: string;
  };
  coverImage: string; // Public URL
  coverImagePath: string; // Storage path
  tags: Array<{
    tr: string;
    en: string;
  }>;
  googleFormUrl: string; // Registration form
  ctaLabelKey: string; // Optional i18n key for CTA button
  status: 'draft' | 'published';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Example:**
```json
{
  "id": "workshop-react-2024",
  "title": {
    "tr": "React Workshop",
    "en": "React Workshop"
  },
  "slug": "react-workshop-2024",
  "description": {
    "tr": "React ile modern web geliştirme",
    "en": "Modern web development with React"
  },
  "startAt": "2024-03-15T10:00:00Z",
  "endAt": "2024-03-15T16:00:00Z",
  "location": {
    "tr": "ESTU Mühendislik Fakültesi - A101",
    "en": "ESTU Engineering Faculty - A101"
  },
  "coverImage": "https://storage.googleapis.com/...",
  "coverImagePath": "events/react-workshop.jpg",
  "tags": [
    { "tr": "Workshop", "en": "Workshop" },
    { "tr": "React", "en": "React" }
  ],
  "googleFormUrl": "https://forms.gle/xxxxx",
  "status": "published",
  "createdAt": "2024-01-10T08:00:00Z",
  "updatedAt": "2024-01-10T08:00:00Z"
}
```

---

### 2. `posts` Collection
Blog posts and news articles.

**Document Structure:**
```typescript
{
  id: string;
  title: {
    tr: string;
    en: string;
  };
  slug: string;
  excerpt: {
    tr: string;
    en: string;
  };
  content: {
    tr: string; // Markdown or rich text
    en: string;
  };
  coverImage?: string;
  coverImagePath?: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: Timestamp;
  status: 'draft' | 'published';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

### 3. `site_pages` Collection
Content for static pages (About, Committees, Team, etc.).

**Document Keys:**
- `home` - Homepage content blocks
- `about` - About page content
- `committees` - Committees list and descriptions
- `team` - Team members
- `subteams` - Project teams (Rovstech, Earendil)
- `sponsors` - Sponsor logos and tiers
- `contact` - Contact information
- `navbar` - Navigation configuration
- `footer` - Footer links and social media

**Document Structure:**
```typescript
{
  key: string;
  status: 'draft' | 'published';
  content: Record<string, any>; // Flexible structure
  links?: Record<string, string>; // External links (Google Forms, etc.)
  updatedAt: Timestamp;
}
```

**Example: `navbar` page**
```json
{
  "key": "navbar",
  "status": "published",
  "content": {
    "logo": {
      "url": "/images/logo.png",
      "alt": "IEEE ESTU"
    }
  },
  "links": {
    "membershipGoogleFormUrl": "https://forms.gle/xxxxx"
  },
  "updatedAt": "2024-01-10T08:00:00Z"
}
```

**Example: `about` page**
```json
{
  "key": "about",
  "status": "published",
  "content": {
    "hero": {
      "title": {
        "tr": "Hakkımızda",
        "en": "About Us"
      },
      "subtitle": {
        "tr": "IEEE ESTU Öğrenci Kolu",
        "en": "IEEE ESTU Student Branch"
      }
    },
    "sections": [
      {
        "type": "text",
        "title": {
          "tr": "Biz Kimiz?",
          "en": "Who We Are?"
        },
        "content": {
          "tr": "IEEE ESTU Öğrenci Kolu...",
          "en": "IEEE ESTU Student Branch..."
        }
      },
      {
        "type": "features",
        "items": [
          {
            "icon": "innovation",
            "title": {
              "tr": "İnovasyon",
              "en": "Innovation"
            },
            "description": {
              "tr": "Yenilikçi projeler geliştiriyoruz",
              "en": "We develop innovative projects"
            }
          }
        ]
      }
    ],
    "leadership": {
      "president": {
        "name": "John Doe",
        "title": {
          "tr": "Kulüp Başkanı",
          "en": "Club President"
        },
        "image": "/images/team/president.jpg",
        "bio": {
          "tr": "...",
          "en": "..."
        }
      },
      "advisor": {
        "name": "Prof. Dr. Jane Smith",
        "title": {
          "tr": "Kulüp Danışmanı",
          "en": "Club Advisor"
        },
        "image": "/images/team/advisor.jpg"
      }
    }
  },
  "updatedAt": "2024-01-10T08:00:00Z"
}
```

**Example: `committees` page**
```json
{
  "key": "committees",
  "status": "published",
  "content": {
    "committees": [
      {
        "id": "aess",
        "name": "AESS",
        "fullName": {
          "tr": "Havacılık ve Elektronik Sistemler Topluluğu",
          "en": "Aerospace and Electronic Systems Society"
        },
        "description": {
          "tr": "Havacılık ve elektronik sistemler üzerine çalışan komitemiz",
          "en": "Our committee working on aerospace and electronic systems"
        },
        "logo": "/images/committees/aess.png",
        "areas": {
          "tr": ["Otonom Sistemler", "Uzay Teknolojileri"],
          "en": ["Autonomous Systems", "Space Technologies"]
        }
      },
      {
        "id": "cs",
        "name": "CS",
        "fullName": {
          "tr": "Bilgisayar Topluluğu",
          "en": "Computer Society"
        },
        "description": {
          "tr": "Yazılım ve bilgisayar bilimleri üzerine çalışan komitemiz",
          "en": "Our committee working on software and computer science"
        },
        "logo": "/images/committees/cs.png",
        "areas": {
          "tr": ["Yapay Zeka", "Web Geliştirme"],
          "en": ["Artificial Intelligence", "Web Development"]
        }
      }
    ]
  },
  "updatedAt": "2024-01-10T08:00:00Z"
}
```

**Example: `team` page**
```json
{
  "key": "team",
  "status": "published",
  "content": {
    "sections": {
      "boardOfDirectors": {
        "title": {
          "tr": "Yönetim Kurulumuz",
          "en": "Board of Directors"
        },
        "members": [
          {
            "name": "Ali Yılmaz",
            "position": {
              "tr": "Başkan",
              "en": "President"
            },
            "image": "/images/team/ali.jpg",
            "email": "ali@ieee.org",
            "linkedin": "https://linkedin.com/in/ali"
          }
        ]
      },
      "administrativeBoard": {
        "title": {
          "tr": "İdari Kurulumuz",
          "en": "Administrative Board"
        },
        "members": []
      }
    }
  },
  "links": {
    "membershipGoogleFormUrl": "https://forms.gle/xxxxx"
  },
  "updatedAt": "2024-01-10T08:00:00Z"
}
```

---

### 4. `media` Collection
Asset library for uploaded images and documents.

**Document Structure:**
```typescript
{
  id: string;
  path: string; // Storage path
  url: string; // Public URL
  type: 'image' | 'video' | 'document';
  size: number; // Bytes
  alt?: {
    tr: string;
    en: string;
  };
  createdAt: Timestamp;
}
```

---

### 5. `admins` Collection
Authorized admin users.

**Document Structure (document ID = email):**
```typescript
{
  email: string;
  role: 'admin' | 'editor';
  createdAt: Timestamp;
}
```

**Example:**
```json
{
  "email": "admin@estu.edu.tr",
  "role": "admin",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

---

## Content Block Types

Common block types used in `site_pages.content`:

### Text Block
```json
{
  "type": "text",
  "title": { "tr": "...", "en": "..." },
  "content": { "tr": "...", "en": "..." }
}
```

### Feature Grid
```json
{
  "type": "features",
  "items": [
    {
      "icon": "icon-name",
      "title": { "tr": "...", "en": "..." },
      "description": { "tr": "...", "en": "..." }
    }
  ]
}
```

### Card List
```json
{
  "type": "cards",
  "items": [
    {
      "image": "/path/to/image.jpg",
      "title": { "tr": "...", "en": "..." },
      "description": { "tr": "...", "en": "..." },
      "link": "/path"
    }
  ]
}
```

### CTA (Call to Action)
```json
{
  "type": "cta",
  "title": { "tr": "...", "en": "..." },
  "description": { "tr": "...", "en": "..." },
  "buttonText": { "tr": "...", "en": "..." },
  "buttonLink": "https://..."
}
```

---

## Querying Examples

### Get published events
```typescript
const eventsRef = collection(db, 'events');
const q = query(
  eventsRef,
  where('status', '==', 'published'),
  orderBy('startAt', 'desc')
);
const snapshot = await getDocs(q);
```

### Get page content
```typescript
const docRef = doc(db, 'site_pages', 'about');
const docSnap = await getDoc(docRef);
const content = docSnap.data();
```

### Check if user is admin
```typescript
const adminRef = doc(db, 'admins', user.email);
const adminSnap = await getDoc(adminRef);
const isAdmin = adminSnap.exists();
```

---

## Best Practices

1. **Always use localized content** for user-facing text
2. **Store URLs separately** in `links` field for easy updates
3. **Use status field** for draft/published workflow
4. **Keep content flexible** with nested objects for future extensions
5. **Index frequently queried fields** (status, dates, slugs)
6. **Use timestamps** for sorting and version tracking
7. **Validate data** with Zod schemas before writing

---

## Migration Scripts

When content model changes, use migration scripts:

```typescript
// Example: Add new field to all events
async function migrateEvents() {
  const snapshot = await getDocs(collection(db, 'events'));
  const batch = writeBatch(db);
  
  snapshot.docs.forEach((doc) => {
    batch.update(doc.ref, { newField: 'default value' });
  });
  
  await batch.commit();
}
```
