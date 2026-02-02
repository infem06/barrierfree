
import { Performance, Booth, BusRoute, ContactInfo } from './types';

export const FESTIVAL_NAME = "제 4회 함께봄 가치봄";
export const FESTIVAL_NAME_EN = "A Barrier-Free Village Festival";
export const FESTIVAL_SUBTITLE = "누구도 배제되지 않는 무장애 마을 축제";
export const FESTIVAL_SUBTITLE_EN = "No one is left behind";
export const FESTIVAL_DATE = "2026년 4월 25일 (토)";
export const FESTIVAL_DATE_EN = "April 25, 2026 (Sat)";
export const FESTIVAL_TIME = "11:00 - 16:00";
export const FESTIVAL_TIME_EN = "11:00 AM - 4:00 PM";
export const FESTIVAL_PLACE = "정왕동 미관광장";
export const FESTIVAL_PLACE_EN = "Jeongwang-dong Aesthetic Square";

export const SOCIAL_LINKS = {
  website: "https://www.shwcd.org/",
  instagram: "https://www.instagram.com/jangbok__2?igshid=YmMyMTA2M2Y%3D",
  youtube: "https://www.youtube.com/channel/UCg659UnIt2OYY_I9OSzBIWA?view_as=subscriber",
  facebook: "https://www.facebook.com/shroom18009"
};

export const PERFORMANCES: Performance[] = [
  { 
    time: "11:00 - 11:30", 
    title: "개막식 및 축사", titleEn: "Opening Ceremony",
    description: "축제의 시작을 알리는 공식 행사", descriptionEn: "Official event marking the start of the festival",
    type: 'local' 
  },
  { 
    time: "11:30 - 12:00", 
    title: "지역 실버 합창단", titleEn: "Local Silver Choir",
    description: "아름다운 선율로 여는 오프닝 공연", descriptionEn: "Opening performance with beautiful melodies",
    type: 'local' 
  },
  { 
    time: "12:10 - 12:40", 
    title: "어린이 태권무 공연", titleEn: "Children's Taekwondo Dance",
    description: "정왕동 꿈나무들의 박진감 넘치는 무대", descriptionEn: "Energetic stage performance by local children",
    type: 'local' 
  },
  { 
    time: "13:00 - 13:40", 
    title: "가치봄 매직 쇼", titleEn: "Value-See Magic Show",
    description: "눈앞에서 펼쳐지는 환상적인 마술 공연", descriptionEn: "Fantastic magic performance right before your eyes",
    type: 'magic' 
  },
  { 
    time: "14:00 - 14:40", 
    title: "초청 가수 '희망 밴드'", titleEn: "Guest Singer 'Hope Band'",
    description: "모두가 하나 되는 열정의 라이브 무대", descriptionEn: "Passionate live stage where everyone becomes one",
    type: 'guest' 
  },
  { 
    time: "15:00 - 15:40", 
    title: "무장애 댄스 퍼포먼스", titleEn: "Barrier-free Dance Performance",
    description: "차별 없는 표현, 장애인 댄스팀 공연", descriptionEn: "Expression without discrimination, performance by dance team for the disabled",
    type: 'guest' 
  },
  { 
    time: "15:40 - 16:00", 
    title: "폐막식 및 기념품 추첨", titleEn: "Closing & Gift Raffle",
    description: "축제를 갈무리하는 마지막 시간", descriptionEn: "Final session to wrap up the festival",
    type: 'local' 
  },
];

export const BOOTHS: Booth[] = [
  { id: 1, name: "운영본부 🚩", nameEn: "Operation Headquarters 🚩", category: '운영', location: "Entrance", isStamping: false },
  { id: 2, name: "기념품 수령처 🎁", nameEn: "Souvenir Pick-up 🎁", category: '운영', location: "Entrance", isStamping: false },
  { id: 3, name: "의료지원/미아보호소 🏥", nameEn: "Medical/Missing Children 🏥", category: '운영', location: "Stage Side", isStamping: false },
  { id: 4, name: "휠체어/유모차 대여 ♿", nameEn: "Wheelchair/Stroller Rental ♿", category: '운영', location: "Entrance", isStamping: false },
  { id: 5, name: "점자 명함 만들기", nameEn: "Making Braille Cards", category: '장애인식개선', location: "Zone A", isStamping: true },
  { id: 6, name: "휠체어 면허 따기 체험", nameEn: "Wheelchair License Experience", category: '장애인식개선', location: "Zone A", isStamping: true },
  { id: 7, name: "수어 한마디 배우기", nameEn: "Learn Basic Sign Language", category: '장애인식개선', location: "Zone A", isStamping: true },
  { id: 8, name: "안대 쓰고 물건 맞히기", nameEn: "Blindfold Guessing Game", category: '장애인식개선', location: "Zone A", isStamping: true },
  { id: 9, name: "보조공학기기 전시회", nameEn: "Assistive Technology Exhibition", category: '장애인식개선', location: "Zone A", isStamping: true },
  { id: 10, name: "세계 전통 놀이 체험", nameEn: "World Traditional Games", category: '다문화', location: "Zone B", isStamping: true },
  { id: 11, name: "베트남 논라 꾸미기", nameEn: "Vietnamese Non-la Decorating", category: '다문화', location: "Zone B", isStamping: true },
  { id: 12, name: "다문화 의상 포토존", nameEn: "Multicultural Costume Photo Zone", category: '다문화', location: "Zone B", isStamping: true },
  { id: 13, name: "폐현수막 에코백 만들기", nameEn: "Eco-bag from Old Banners", category: '환경', location: "Zone C", isStamping: true },
  { id: 14, name: "천연 비누 만들기", nameEn: "Natural Soap Making", category: '환경', location: "Zone C", isStamping: true },
  { id: 15, name: "분리배출 퀴즈왕", nameEn: "Recycling Quiz King", category: '환경', location: "Zone C", isStamping: true },
  { id: 16, name: "페이스 페인팅", nameEn: "Face Painting", category: '놀이체험', location: "Zone D", isStamping: true },
  { id: 17, name: "가족 스티커 사진", nameEn: "Family Sticker Photos", category: '놀이체험', location: "Zone D", isStamping: true },
  { id: 18, name: "비눗방울 놀이터", nameEn: "Bubble Playground", category: '놀이체험', location: "Zone D", isStamping: true },
  { id: 19, name: "전통 떡메치기 체험", nameEn: "Traditional Rice Pounding", category: '놀이체험', location: "Zone D", isStamping: true },
  { id: 20, name: "함께 만드는 대형 퍼즐", nameEn: "Group Giant Jigsaw Puzzle", category: '놀이체험', location: "Zone D", isStamping: true },
];

export const BUS_ROUTES: BusRoute[] = [
  {
    id: 1,
    name: "A노선 (정왕역 방면)", nameEn: "Route A (To Jeongwang Stn)",
    stops: ["정왕역 1번출구", "시화병원", "이마트 정왕점", "축제장(미관광장)"],
    stopsEn: ["Jeongwang Stn Exit 1", "Sihwa Hospital", "E-Mart Jeongwang", "Festival Site"],
    intervals: "20분 간격 (10:30~16:30)", intervalsEn: "Every 20m (10:30~16:30)"
  },
  {
    id: 2,
    name: "B노선 (배곧 방면)", nameEn: "Route B (To Baegot)",
    stops: ["배곧 한울공원", "시흥신세계아울렛", "배곧생명공원", "축제장(미관광장)"],
    stopsEn: ["Baegot Hanul Park", "Siheung Premium Outlets", "Baegot Life Park", "Festival Site"],
    intervals: "30분 간격 (10:00~16:00)", intervalsEn: "Every 30m (10:00~16:00)"
  }
];

export const CONTACTS: ContactInfo[] = [
  { role: "총괄 팀장", roleEn: "Project Manager", name: "김함께", nameEn: "Ham-kke Kim", phone: "031-123-4567", email: "together@festival.kr" },
  { role: "자원봉사 지원", roleEn: "Volunteer Support", name: "이봉사", nameEn: "Bong-sa Lee", phone: "031-123-4568", email: "volunteer@festival.kr" },
  { role: "부스 참여 문의", roleEn: "Booth Inquiries", name: "박가치", nameEn: "Ga-chi Park", phone: "031-123-4569", email: "booth@festival.kr" },
];
