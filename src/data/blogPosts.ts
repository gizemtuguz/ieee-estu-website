export type LocaleKey = 'tr' | 'en';

export interface BlogPostDetail {
  slug: string;
  date: string;
  image: string;
  title: Record<LocaleKey, string>;
  excerpt: Record<LocaleKey, string>;
  author: Record<LocaleKey, string>;
  category: Record<LocaleKey, string>;
  readTime: Record<LocaleKey, string>;
  content: Record<LocaleKey, string[]>;
  highlights: Record<LocaleKey, string[]>;
}

export const BLOG_POSTS: BlogPostDetail[] = [
  {
    slug: 'ieee-xtreme-17',
    date: '2025-08-15',
    image:
      'https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb2RpbmclMjBjb21wZXRpdGlvbiUyMGhhY2thdGhvbnxlbnwxfHx8fDE3NTcxODg4NDF8MA&ixlib=rb-4.1.0&q=80&w=1400',
    title: {
      tr: 'IEEE Xtreme 17.0 Programlama Yarışması',
      en: 'IEEE Xtreme 17.0 Programming Competition',
    },
    excerpt: {
      tr: '24 saat süren dünya çapındaki programlama maratonunda takımımızın performansı ve deneyimlerimiz.',
      en: 'Our team’s performance and experiences in the 24-hour worldwide programming marathon.',
    },
    author: {
      tr: 'IEEE ESTU',
      en: 'IEEE ESTU',
    },
    category: {
      tr: 'Yarışma',
      en: 'Competition',
    },
    readTime: {
      tr: '5 dk okuma',
      en: '5 min read',
    },
    content: {
      tr: [
        'IEEE Xtreme 17.0, öğrenci kollarını küresel ölçekte bir araya getiren 24 saatlik bir kodlama maratonudur.',
        'Takımımız yarışma sürecinde algoritmik düşünme, zaman yönetimi ve takım içi iletişim konularında önemli kazanımlar elde etti.',
        'Etkinlik sonrası değerlendirmelerimizle gelecek yıl için stratejik iyileştirmeler planladık.',
      ],
      en: [
        'IEEE Xtreme 17.0 is a 24-hour coding marathon that brings student branches together globally.',
        'Our team gained significant experience in algorithmic thinking, time management, and team communication during the contest.',
        'We held a post-event review and planned strategic improvements for next year.',
      ],
    },
    highlights: {
      tr: [
        'Takım koordinasyonu ve problem çözme',
        'Süre yönetimi ve hız optimizasyonu',
        'Gelecek yıl için hazırlık planı',
      ],
      en: [
        'Team coordination and problem solving',
        'Time management and speed optimization',
        'Preparation plan for next year',
      ],
    },
  },
  {
    slug: 'ai-ml-workshop',
    date: '2025-08-10',
    image:
      'https://images.unsplash.com/photo-1596496356933-9b6e0b186b88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0ZWNobm9sb2d5JTIwd29ya3Nob3AlMjBzdHVkZW50c3xlbnwxfHx8fDE3NTcyNDYzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1400',
    title: {
      tr: 'Yapay Zeka ve Makine Öğrenmesi Workshop\'u',
      en: 'Artificial Intelligence and Machine Learning Workshop',
    },
    excerpt: {
      tr: 'Python ve TensorFlow kullanarak makine öğrenmesi modellerinin nasıl oluşturulacağını öğrendik.',
      en: 'We learned how to build machine learning models using Python and TensorFlow.',
    },
    author: {
      tr: 'IEEE ESTU',
      en: 'IEEE ESTU',
    },
    category: {
      tr: 'Teknik',
      en: 'Technical',
    },
    readTime: {
      tr: '7 dk okuma',
      en: '7 min read',
    },
    content: {
      tr: [
        'Atölye boyunca veri ön işleme, model eğitimi ve değerlendirme süreçlerini deneyimledik.',
        'Katılımcılar gerçek veri setleri üzerinde mini projeler tamamladı.',
        'Bir sonraki adım olarak derin öğrenme ve model optimizasyonu konularına odaklanacağız.',
      ],
      en: [
        'During the workshop we explored data preprocessing, model training, and evaluation.',
        'Participants completed mini projects on real datasets.',
        'Next, we plan to focus on deep learning and model optimization.',
      ],
    },
    highlights: {
      tr: [
        'Uygulamalı ML pipeline çalışmaları',
        'Gerçek veri setleri ile analiz',
        'Derin öğrenme yol haritası',
      ],
      en: [
        'Hands-on ML pipeline exercises',
        'Analysis with real datasets',
        'Deep learning roadmap',
      ],
    },
  },
  {
    slug: 'general-assembly-2025',
    date: '2025-08-05',
    image:
      'https://images.unsplash.com/photo-1672917187338-7f81ecac3d3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwcm9mZXNzaW9uYWwlMjBzdHVkZW50JTIwdGVhbSUyMG1lZXRpbmd8ZW58MXx8fHwxNzU3MjQ2MjcyfDA&ixlib=rb-4.1.0&q=80&w=1400',
    title: {
      tr: 'IEEE Genel Kurul Toplantısı 2025',
      en: 'IEEE General Assembly Meeting 2025',
    },
    excerpt: {
      tr: 'Yeni dönem yönetim kurulu seçimleri ve 2025 hedeflerimizi belirledik.',
      en: 'New board elections and setting our 2025 goals.',
    },
    author: {
      tr: 'IEEE ESTU',
      en: 'IEEE ESTU',
    },
    category: {
      tr: 'IEEE',
      en: 'IEEE',
    },
    readTime: {
      tr: '3 dk okuma',
      en: '3 min read',
    },
    content: {
      tr: [
        'Genel kurul toplantısında yeni dönem yönetim kurulunu belirledik.',
        '2025 yılı için teknik etkinlikler, sosyal sorumluluk ve kariyer gelişimi hedefleri netleştirildi.',
        'Toplantı sonunda üyelerden gelecek projeler için öneriler toplandı.',
      ],
      en: [
        'At the general assembly, we elected the new executive board.',
        'Goals for 2025 were defined around technical events, social responsibility, and career development.',
        'We also collected project ideas from members at the end of the meeting.',
      ],
    },
    highlights: {
      tr: [
        'Yeni yönetim kurulu duyuruldu',
        '2025 hedefleri belirlendi',
        'Üye önerileri toplandı',
      ],
      en: [
        'New board announced',
        '2025 goals defined',
        'Member ideas collected',
      ],
    },
  },
];
