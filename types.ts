
export interface Performance {
  time: string;
  title: string;
  titleEn: string;
  titleZh: string;
  description: string;
  descriptionEn: string;
  descriptionZh: string;
  type: 'local' | 'guest' | 'magic';
}

export interface Booth {
  id: number;
  name: string;
  nameEn: string;
  nameZh: string;
  category: '놀이체험' | '장애인식개선' | '다문화' | '환경' | '운영';
  location: string;
  isStamping: boolean;
}

export interface BusRoute {
  id: number;
  name: string;
  nameEn: string;
  nameZh: string;
  stops: string[];
  stopsEn: string[];
  stopsZh: string[];
  intervals: string;
  intervalsEn: string;
  intervalsZh: string;
}

export interface ContactInfo {
  role: string;
  roleEn: string;
  roleZh: string;
  name: string;
  nameEn: string;
  nameZh: string;
  phone: string;
  email: string;
}

export interface ParkingLocation {
  id: number;
  name: string;
  nameEn: string;
  nameZh: string;
  address: string;
  addressEn: string;
  addressZh: string;
  capacity: string;
  distance: string;
  distanceEn: string;
  distanceZh: string;
  mapUrl: string;
}
