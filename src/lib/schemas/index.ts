import { z } from 'zod';
import { Timestamp } from 'firebase/firestore';

// Localized content schema
export const localizedContentSchema = z.object({
  tr: z.string(),
  en: z.string(),
});

export type LocalizedContent = z.infer<typeof localizedContentSchema>;

// Event schema
export const eventSchema = z.object({
  id: z.string(),
  title: localizedContentSchema,
  slug: z.string(),
  description: localizedContentSchema,
  startAt: z.instanceof(Timestamp),
  endAt: z.instanceof(Timestamp),
  location: localizedContentSchema,
  coverImage: z.string().url().optional(),
  coverImagePath: z.string().optional(),
  tags: z.array(localizedContentSchema).default([]),
  googleFormUrl: z.string().url().optional(),
  ctaLabelKey: z.string().optional(),
  status: z.enum(['draft', 'published']).default('draft'),
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
});

export type Event = z.infer<typeof eventSchema>;

export const createEventSchema = eventSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true,
});

export type CreateEventInput = z.infer<typeof createEventSchema>;

// Blog post schema
export const postSchema = z.object({
  id: z.string(),
  title: localizedContentSchema,
  slug: z.string(),
  excerpt: localizedContentSchema,
  content: localizedContentSchema,
  coverImage: z.string().url().optional(),
  coverImagePath: z.string().optional(),
  author: z.object({
    name: z.string(),
    avatar: z.string().url().optional(),
  }),
  publishedAt: z.instanceof(Timestamp),
  status: z.enum(['draft', 'published']).default('draft'),
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
});

export type Post = z.infer<typeof postSchema>;

// Site pages content schema (for About, Committees, etc.)
export const sitePageSchema = z.object({
  key: z.string(), // 'about', 'committees', 'home', 'footer', 'navbar', etc.
  status: z.enum(['draft', 'published']).default('published'),
  content: z.record(z.string(), z.any()), // Flexible JSON structure
  links: z.record(z.string(), z.string()).optional(), // { membershipGoogleFormUrl: "...", etc. }
  updatedAt: z.instanceof(Timestamp),
});

export type SitePage = z.infer<typeof sitePageSchema>;

// Media asset schema
export const mediaSchema = z.object({
  id: z.string(),
  path: z.string(),
  url: z.string().url(),
  type: z.enum(['image', 'video', 'document']),
  size: z.number(),
  alt: localizedContentSchema.optional(),
  createdAt: z.instanceof(Timestamp),
});

export type Media = z.infer<typeof mediaSchema>;

// Admin user schema (for RBAC)
export const adminSchema = z.object({
  email: z.string().email(),
  role: z.enum(['admin', 'editor']).default('editor'),
  createdAt: z.instanceof(Timestamp),
});

export type Admin = z.infer<typeof adminSchema>;
