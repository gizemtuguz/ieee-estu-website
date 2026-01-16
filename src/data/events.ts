export type LocaleKey = 'tr' | 'en';

export interface EventDetail {
  slug: string;
  status: 'upcoming' | 'past';
  date: string;
  time: string;
  image: string;
  title: Record<LocaleKey, string>;
  description: Record<LocaleKey, string>;
  location: Record<LocaleKey, string>;
  category: Record<LocaleKey, string>;
  participants: Record<LocaleKey, string>;
  statusLabel: Record<LocaleKey, string>;
  longDescription: Record<LocaleKey, string[]>;
  highlights: Record<LocaleKey, string[]>;
  registrationUrl?: string;
}

export const EVENTS: EventDetail[] = [
  {
    slug: 'ai-ml-workshop',
    status: 'upcoming',
    date: '2025-09-15',
    time: '14:00 - 17:00',
    image:
      'https://images.unsplash.com/photo-1596496356933-9b6e0b186b88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwd29ya3Nob3AlMjBzdHVkZW50c3xlbnwxfHx8fDE3NTcyNDYzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1400',
    title: {
      tr: 'Yapay Zeka ve Makine Öğrenmesi Workshop\'u',
      en: 'Artificial Intelligence and Machine Learning Workshop',
    },
    description: {
      tr: 'Python ve TensorFlow ile pratik uygulamalarla makine öğrenmesine giriş yapıyoruz.',
      en: 'Hands-on introduction to machine learning with Python and TensorFlow.',
    },
    location: {
      tr: 'ESTU Mühendislik Fakültesi',
      en: 'ESTU Faculty of Engineering',
    },
    category: {
      tr: 'Workshop',
      en: 'Workshop',
    },
    participants: {
      tr: '100+ katılımcı',
      en: '100+ participants',
    },
    statusLabel: {
      tr: 'Kayıt Açık',
      en: 'Registration Open',
    },
    longDescription: {
      tr: [
        'Bu atölyede temel makine öğrenmesi kavramlarını gerçek veri setleri üzerinde uygulayacağız.',
        'Katılımcılar model kurma, değerlendirme ve iyileştirme adımlarını uygulamalı olarak deneyimleyecek.',
      ],
      en: [
        'In this workshop, we will apply core machine learning concepts on real datasets.',
        'Participants will practice building, evaluating, and improving models step by step.',
      ],
    },
    highlights: {
      tr: [
        'Uygulamalı model eğitimi',
        'Veri ön işleme teknikleri',
        'Model performansını iyileştirme',
      ],
      en: [
        'Hands-on model training',
        'Data preprocessing techniques',
        'Improving model performance',
      ],
    },
    registrationUrl: 'https://forms.gle/example-ai-ml-workshop',
  },
  {
    slug: 'ieee-xtreme-18',
    status: 'upcoming',
    date: '2025-10-26',
    time: '00:01 - 23:59',
    image:
      'https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb2RpbmclMjBjb21wZXRpdGlvbiUyMGhhY2thdGhvbnxlbnwxfHx8fDE3NTcxODg4NDF8MA&ixlib=rb-4.1.0&q=80&w=1400',
    title: {
      tr: 'IEEE Xtreme 18.0 Programlama Yarışması',
      en: 'IEEE Xtreme 18.0 Programming Competition',
    },
    description: {
      tr: '24 saat süren küresel maratonda takımımızla algoritma problemleri çözüyoruz.',
      en: 'We solve algorithmic challenges as a team in the 24-hour global marathon.',
    },
    location: {
      tr: 'Online',
      en: 'Online',
    },
    category: {
      tr: 'Yarışma',
      en: 'Competition',
    },
    participants: {
      tr: '200+ katılımcı',
      en: '200+ participants',
    },
    statusLabel: {
      tr: 'Yakında',
      en: 'Coming Soon',
    },
    longDescription: {
      tr: [
        'IEEE Xtreme, dünya çapındaki IEEE öğrenci kollarını 24 saatlik kodlama maratonunda buluşturur.',
        'Takım stratejisi, dayanıklılık ve problem çözme yetenekleri bu etkinlikte öne çıkar.',
      ],
      en: [
        'IEEE Xtreme brings student branches worldwide together for a 24-hour coding marathon.',
        'Team strategy, endurance, and problem-solving skills stand out in this event.',
      ],
    },
    highlights: {
      tr: [
        '24 saat kesintisiz yarışma',
        'Uluslararası sıralama',
        'Takım çalışması ve strateji',
      ],
      en: [
        '24-hour continuous contest',
        'International ranking',
        'Teamwork and strategy',
      ],
    },
    registrationUrl: 'https://forms.gle/example-ieee-xtreme',
  },
  {
    slug: 'cybersecurity-seminar',
    status: 'past',
    date: '2025-08-20',
    time: '19:00 - 21:00',
    image:
      'https://images.unsplash.com/photo-1646579886135-068c73800308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxlbmdpbmVlcmluZyUyMGNvbmZlcmVuY2UlMjBzZW1pbmFyfGVufDF8fHx8MTc1NzI0NjM5M3ww&ixlib=rb-4.1.0&q=80&w=1400',
    title: {
      tr: 'Siber Güvenlik Semineri',
      en: 'Cybersecurity Seminar',
    },
    description: {
      tr: 'Sektör uzmanlarıyla güvenlik trendleri ve kariyer fırsatlarını konuştuk.',
      en: 'Industry experts shared security trends and career insights.',
    },
    location: {
      tr: 'ESTU Konferans Salonu',
      en: 'ESTU Conference Hall',
    },
    category: {
      tr: 'Seminer',
      en: 'Seminar',
    },
    participants: {
      tr: '150+ katılımcı',
      en: '150+ participants',
    },
    statusLabel: {
      tr: 'Tamamlandı',
      en: 'Completed',
    },
    longDescription: {
      tr: [
        'Seminerde güncel siber güvenlik tehditleri ve savunma stratejileri ele alındı.',
        'Katılımcılar kariyer planlama ve sertifikasyon yolları hakkında bilgi aldı.',
      ],
      en: [
        'The seminar covered current cybersecurity threats and defense strategies.',
        'Participants learned about career planning and certification paths.',
      ],
    },
    highlights: {
      tr: [
        'Sektör profesyonelleriyle network',
        'Güncel güvenlik trendleri',
        'Kariyer odaklı oturumlar',
      ],
      en: [
        'Networking with industry professionals',
        'Current security trends',
        'Career-focused sessions',
      ],
    },
  },
  {
    slug: 'rov-project-day',
    status: 'past',
    date: '2025-07-10',
    time: '10:00 - 16:00',
    image:
      'https://images.unsplash.com/photo-1562758778-e5638b5b6607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyb2JvdGljcyUyMGNvbXBldGl0aW9uJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzU3MjQ2MzkzfDA&ixlib=rb-4.1.0&q=80&w=1400',
    title: {
      tr: 'ROV Proje Günü',
      en: 'ROV Project Day',
    },
    description: {
      tr: 'Takımlarımızın geliştirdiği prototipleri tanıttığımız proje günü gerçekleştirdik.',
      en: 'We showcased prototypes developed by our teams during project day.',
    },
    location: {
      tr: 'ESTU Laboratuvarları',
      en: 'ESTU Laboratories',
    },
    category: {
      tr: 'Proje Günü',
      en: 'Project Day',
    },
    participants: {
      tr: '80+ katılımcı',
      en: '80+ participants',
    },
    statusLabel: {
      tr: 'Tamamlandı',
      en: 'Completed',
    },
    longDescription: {
      tr: [
        'ROV ekibimizin geliştirdiği prototipler, katılımcılara canlı olarak gösterildi.',
        'Mekanik tasarım, kontrol yazılımı ve görev senaryoları anlatıldı.',
      ],
      en: [
        'ROV prototypes developed by our team were demonstrated live to attendees.',
        'Mechanical design, control software, and mission scenarios were presented.',
      ],
    },
    highlights: {
      tr: [
        'Canlı demo ve sunumlar',
        'Takımın teknik çıktıları',
        'Prototip geri bildirimleri',
      ],
      en: [
        'Live demo and presentations',
        'Technical outputs from the team',
        'Prototype feedback session',
      ],
    },
  },
];
