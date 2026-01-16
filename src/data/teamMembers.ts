export interface TeamMemberData {
  tr: {
    name: string;
    position: string;
    department: string;
    bio: string;
  };
  en: {
    name: string;
    position: string;
    department: string;
    bio: string;
  };
  image: string;
  section: 'boardOfDirectors' | 'administrativeBoard' | 'auditBoard';
}

export const teamMembers: TeamMemberData[] = [
  // Yönetim Kurulumuz (4 kişi)
  {
    tr: {
      name: 'Gizem Tuğuz',
      position: 'Başkan',
      department: 'Bilgisayar Mühendisliği',
      bio: 'Yapay zeka, makine öğrenmesi, proje yönetimi',
    },
    en: {
      name: 'Gizem Tuğuz',
      position: 'Chair',
      department: 'Computer Engineering',
      bio: 'Artificial intelligence, machine learning, project management',
    },
    image:
      'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzYxMDc0OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    section: 'boardOfDirectors',
  },
  {
    tr: {
      name: 'Hüseyin Özcınar',
      position: 'Başkan Yardımcısı',
      department: 'Elektrik & Elektronik Mühendisliği',
      bio: 'Gömülü sistemler, IoT, elektronik tasarım',
    },
    en: {
      name: 'Hüseyin Özcınar',
      position: 'Vice Chair',
      department: 'Electrical & Electronics Engineering',
      bio: 'Embedded systems, IoT, electronic design',
    },
    image:
      'https://images.unsplash.com/photo-1654110455429-cf322b40a906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MTA3NDk5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    section: 'boardOfDirectors',
  },
  {
    tr: {
      name: 'Sıla Alhan',
      position: 'Sayman',
      department: 'Elektrik & Elektronik Mühendisliği',
      bio: 'Finans yönetimi, bütçe planlama',
    },
    en: {
      name: 'Sıla Alhan',
      position: 'Treasurer',
      department: 'Electrical & Electronics Engineering',
      bio: 'Financial management, budget planning',
    },
    image:
      'https://images.unsplash.com/photo-1743327608361-698da1c56900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMHByb2Zlc3Npb25hbCUyMHBob3RvfGVufDF8fHx8MTc2MTE3MDI4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    section: 'boardOfDirectors',
  },
  {
    tr: {
      name: 'Ahmet Hakan Erdur',
      position: 'Sekreter',
      department: 'Makina Mühendisliği',
      bio: 'Dokümantasyon, toplantı yönetimi',
    },
    en: {
      name: 'Ahmet Hakan Erdur',
      position: 'Secretary',
      department: 'Mechanical Engineering',
      bio: 'Documentation, meeting management',
    },
    image: '/images/ahmetKaanCan.png',
    section: 'boardOfDirectors',
  },
  // İdari Kurulumuz (7 kişi - Komite Koordinatörleri)
  {
    tr: {
      name: 'Umut Can Şahin',
      position: 'AESS Koordinatörü',
      department: 'Havacılık & Uzay Mühendisliği',
      bio: 'Havacılık sistemleri, uzay teknolojileri',
    },
    en: {
      name: 'Umut Can Şahin',
      position: 'AESS Coordinator',
      department: 'Aerospace Engineering',
      bio: 'Aerospace systems, space technologies',
    },
    image:
      'https://images.unsplash.com/photo-1654110455429-cf322b40a906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MTA3NDk5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    section: 'administrativeBoard',
  },
  {
    tr: {
      name: 'Beyza Nur Güngör',
      position: 'ComSoc Koordinatörü',
      department: 'Elektrik & Elektronik Mühendisliği',
      bio: 'İletişim sistemleri, kablosuz ağlar',
    },
    en: {
      name: 'Beyza Nur Güngör',
      position: 'ComSoc Coordinator',
      department: 'Electrical & Electronics Engineering',
      bio: 'Communication systems, wireless networks',
    },
    image:
      'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzYxMDc0OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    section: 'administrativeBoard',
  },
  {
    tr: {
      name: 'Efe Kaan Yılmaz',
      position: 'CS Koordinatörü',
      department: 'Bilgisayar Mühendisliği',
      bio: 'Yazılım geliştirme, algoritmalar, veri yapıları',
    },
    en: {
      name: 'Efe Kaan Yılmaz',
      position: 'CS Coordinator',
      department: 'Computer Engineering',
      bio: 'Software development, algorithms, data structures',
    },
    image:
      'https://images.unsplash.com/photo-1654110455429-cf322b40a906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MTA3NDk5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    section: 'administrativeBoard',
  },
  {
    tr: {
      name: 'Zeynep Sude Arslan',
      position: 'PES Koordinatörü',
      department: 'Elektrik & Elektronik Mühendisliği',
      bio: 'Güç sistemleri, yenilenebilir enerji',
    },
    en: {
      name: 'Zeynep Sude Arslan',
      position: 'PES Coordinator',
      department: 'Electrical & Electronics Engineering',
      bio: 'Power systems, renewable energy',
    },
    image:
      'https://images.unsplash.com/photo-1743327608361-698da1c56900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMHByb2Zlc3Npb25hbCUyMHBob3RvfGVufDF8fHx8MTc2MTE3MDI4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    section: 'administrativeBoard',
  },
  {
    tr: {
      name: 'Elif Naz Kaya',
      position: 'WIE Koordinatörü',
      department: 'Bilgisayar Mühendisliği',
      bio: 'Kadınların mühendislikteki rolü, mentorluk',
    },
    en: {
      name: 'Elif Naz Kaya',
      position: 'WIE Coordinator',
      department: 'Computer Engineering',
      bio: "Women's role in engineering, mentoring",
    },
    image:
      'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzYxMDc0OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    section: 'administrativeBoard',
  },
  {
    tr: {
      name: 'Barış Tuncer',
      position: 'KÖK Koordinatörü',
      department: 'Elektrik & Elektronik Mühendisliği',
      bio: 'Etkinlik organizasyonu, kampüs faaliyetleri',
    },
    en: {
      name: 'Barış Tuncer',
      position: 'KÖK Coordinator',
      department: 'Electrical & Electronics Engineering',
      bio: 'Event organization, campus activities',
    },
    image:
      'https://images.unsplash.com/photo-1654110455429-cf322b40a906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MTA3NDk5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    section: 'administrativeBoard',
  },
  {
    tr: {
      name: 'Meryem Bilgiç',
      position: 'PR Koordinatörü',
      department: 'Bulut Bilişim Operatörlüğü',
      bio: 'İletişim, sosyal medya, tasarım',
    },
    en: {
      name: 'Meryem Bilgiç',
      position: 'PR Coordinator',
      department: 'Cloud Computing Operatoring',
      bio: 'Communication, social media, design',
    },
    image:
      'https://images.unsplash.com/photo-1743327608361-698da1c56900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMHByb2Zlc3Npb25hbCUyMHBob3RvfGVufDF8fHx8MTc2MTE3MDI4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    section: 'administrativeBoard',
  },
  // Denetim Kurulumuz (3 kişi)
  {
    tr: {
      name: 'Ezgi Güner',
      position: 'Denetim Kurulu Üyesi',
      department: 'Elektrik & Elektronik Mühendisliği',
      bio: 'İç denetim',
    },
    en: {
      name: 'Ezgi Güner',
      position: 'Audit Board Member',
      department: 'Electrical & Electronics Engineering',
      bio: 'Internal audit',
    },
    image:
      'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzYxMDc0OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    section: 'auditBoard',
  },
  {
    tr: {
      name: 'Katre Azra Yıldırım',
      position: 'Denetim Kurulu Üyesi',
      department: 'Elektrik & Elektronik Mühendisliği',
      bio: 'İç denetim',
    },
    en: {
      name: 'Katre Azra Yıldırım',
      position: 'Audit Board Member',
      department: 'Electrical & Electronics Engineering',
      bio: 'Internal audit',
    },
    image:
      'https://images.unsplash.com/photo-1743327608361-698da1c56900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMHByb2Zlc3Npb25hbCUyMHBob3RvfGVufDF8fHx8MTc2MTE3MDI4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    section: 'auditBoard',
  },
  {
    tr: {
      name: 'Selin Gül Kurt',
      position: 'Denetim Kurulu Üyesi',
      department: 'Elektrik & Elektronik Mühendisliği',
      bio: 'İç denetim',
    },
    en: {
      name: 'Selin Gül Kurt',
      position: 'Audit Board Member',
      department: 'Electrical & Electronics Engineering',
      bio: 'Internal audit',
    },
    image:
      'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzYxMDc0OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    section: 'auditBoard',
  },
];
