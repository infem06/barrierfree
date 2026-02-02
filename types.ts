
export interface Performance {
  time: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  type: 'local' | 'guest' | 'magic';
}

export interface Booth {
  id: number;
  name: string;
  nameEn: string;
  category: '놀이체험' | '장애인식개선' | '다문화' | '환경' | '운영';
  location: string;
  isStamping: boolean;
}

export interface BusRoute {
  id: number;
  name: string;
  nameEn: string;
  stops: string[];
  stopsEn: string[];
  intervals: string;
  intervalsEn: string;
}

export interface ContactInfo {
  role: string;
  roleEn: string;
  name: string;
  nameEn: string;
  phone: string;
  email: string;
}
