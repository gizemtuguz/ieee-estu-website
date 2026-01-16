export interface TeamMemberData {
  tr: {
    name: string;
    position: string;
    department: string;
  };
  en: {
    name: string;
    position: string;
    department: string;
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
    },
    en: {
      name: 'Gizem Tuğuz',
      position: 'Chair',
      department: 'Computer Engineering',
    },
    image: '/images/gt.jpg',
    section: 'boardOfDirectors',
  },
  {
    tr: {
      name: 'Hüseyin Özcınar',
      position: 'Başkan Yardımcısı',
      department: 'Elektrik & Elektronik Mühendisliği',
    },
    en: {
      name: 'Hüseyin Özcınar',
      position: 'Vice Chair',
      department: 'Electrical & Electronics Engineering',
    },
    image: '/images/ho.jpg',
    section: 'boardOfDirectors',
  },
  {
    tr: {
      name: 'Sıla Alhan',
      position: 'Sayman',
      department: 'Elektrik & Elektronik Mühendisliği',
    },
    en: {
      name: 'Sıla Alhan',
      position: 'Treasurer',
      department: 'Electrical & Electronics Engineering',
    },
    image: '/images/sa.jpeg',
    section: 'boardOfDirectors',
  },
  {
    tr: {
      name: 'Ahmet Hakan Erdur',
      position: 'Sekreter',
      department: 'Makina Mühendisliği',
    },
    en: {
      name: 'Ahmet Hakan Erdur',
      position: 'Secretary',
      department: 'Mechanical Engineering',
    },
    image: '/images/ahe.jpeg',
    section: 'boardOfDirectors',
  },
  // İdari Kurulumuz (7 kişi - Komite Koordinatörleri)
  {
    tr: {
      name: 'Efe Aral',
      position: 'AESS Başkanı',
      department: 'Havacılık & Uzay Mühendisliği',
    },
    en: {
      name: 'Efe Aral',
      position: 'AESS President',
      department: 'Aerospace Engineering',
    },
    image: '/images/ea.jpg',
    section: 'administrativeBoard',
  },
  {
    tr: {
      name: 'Kutay Demirel',
      position: 'ComSoc Başkanı',
      department: 'Elektrik & Elektronik Mühendisliği',
    },
    en: {
      name: 'Kutay Demirel',
      position: 'ComSoc President',
      department: 'Electrical & Electronics Engineering',
    },
    image: '/images/kd.jpg',
    section: 'administrativeBoard',
  },
  {
    tr: {
      name: 'Alp Karınca',
      position: 'CS Başkanı',
      department: 'Bilgisayar Mühendisliği',
    },
    en: {
      name: 'Alp Karınca',
      position: 'CS President',
      department: 'Computer Engineering',
    },
    image: '/images/ak.jpg',
    section: 'administrativeBoard',
  },
  {
    tr: {
      name: 'Ahmet Kaan Can',
      position: 'PES Başkanı',
      department: 'Elektrik & Elektronik Mühendisliği',
    },
    en: {
      name: 'Ahmet Kaan Can',
      position: 'PES President',
      department: 'Electrical & Electronics Engineering',
    },
    image: '/images/akc.jpg',
    section: 'administrativeBoard',
  },
  {
    tr: {
      name: 'Şenay Doğan',
      position: 'WIE Başkanı',
      department: 'Çevre Mühendisliği',
    },
    en: {
      name: 'Şenay Doğan',
      position: 'WIE President',
      department: 'Environmental Engineering',
    },
    image: '/images/sd.jpg',
    section: 'administrativeBoard',
  },
  {
    tr: {
      name: 'Mahmut Kırgil',
      position: 'KÖK Koordinatörü',
      department: 'Elektrik & Elektronik Mühendisliği',
    },
    en: {
      name: 'Mahmut Kırgil',
      position: 'KÖK Coordinator',
      department: 'Electrical & Electronics Engineering',
    },
    image: '/images/mk.png',
    section: 'administrativeBoard',
  },
  {
    tr: {
      name: 'Meryem Bilgiç',
      position: 'PR Koordinatörü',
      department: 'Bulut Bilişim Operatörlüğü',
    },
    en: {
      name: 'Meryem Bilgiç',
      position: 'PR Coordinator',
      department: 'Cloud Computing Operatoring',
    },
    image: '/images/mb.jpg',
    section: 'administrativeBoard',
  },
  // Denetim Kurulumuz (3 kişi)
  {
    tr: {
      name: 'Ezgi Güner',
      position: 'Denetim Kurulu Üyesi',
      department: 'Elektrik & Elektronik Mühendisliği',
    },
    en: {
      name: 'Ezgi Güner',
      position: 'Audit Board Member',
      department: 'Electrical & Electronics Engineering',
    },
    image: '/images/eg.jpeg',
    section: 'auditBoard',
  },
  {
    tr: {
      name: 'Katre Azra Yıldırım',
      position: 'Denetim Kurulu Üyesi',
      department: 'Elektrik & Elektronik Mühendisliği',
    },
    en: {
      name: 'Katre Azra Yıldırım',
      position: 'Audit Board Member',
      department: 'Electrical & Electronics Engineering',
    },
    image: '/images/kay.jpeg',
    section: 'auditBoard',
  },
  {
    tr: {
      name: 'Selin Gül Kurt',
      position: 'Denetim Kurulu Üyesi',
      department: 'Elektrik & Elektronik Mühendisliği',
    },
    en: {
      name: 'Selin Gül Kurt',
      position: 'Audit Board Member',
      department: 'Electrical & Electronics Engineering',
    },
    image: '/images/sg.jpeg',
    section: 'auditBoard',
  },
];
