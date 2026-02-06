
import { Performance, Booth, BusRoute, ContactInfo, ParkingLocation } from './types';

export const FESTIVAL_NAME = "함께봄 가치봄";
export const FESTIVAL_NAME_EN = "A barrier-free village festival";
export const FESTIVAL_NAME_ZH = "第四届 共看春天·共享价值 无障碍村庄庆典";

export const FESTIVAL_SUBTITLE = "누구도 배제되지 않는 무장애 마을 축제";
export const FESTIVAL_SUBTITLE_EN = "A festival where no one is left behind";
export const FESTIVAL_SUBTITLE_ZH = "一个不让任何人掉队的无障碍村庄庆典";

export const FESTIVAL_DATE = "2026년 4월 25일 (토)";
export const FESTIVAL_DATE_EN = "April 25, 2026 (Sat)";
export const FESTIVAL_DATE_ZH = "2026年 4月 25日 (周六)";

export const FESTIVAL_TIME = "11:00 - 16:00";
export const FESTIVAL_TIME_EN = "11:00 AM - 4:00 PM";
export const FESTIVAL_TIME_ZH = "11:00 - 16:00";

export const FESTIVAL_PLACE = "정왕동 미관광장";
export const FESTIVAL_PLACE_EN = "Jeongwang-dong Aesthetic Square";
export const FESTIVAL_PLACE_ZH = "正往洞 美观广场";
export const FESTIVAL_PLACE_MAP_URL = "https://map.naver.com/v5/search/정왕동 1799-7";

export const SOCIAL_LINKS = {
  website: "https://www.shwcd.org/",
  instagram: "https://www.instagram.com/jangbok__2?igshid=YmMyMTA2M2Y%3D",
  youtube: "https://www.youtube.com/channel/UCg659UnIt2OYY_I9OSzBIWA?view_as=subscriber",
  facebook: "https://www.facebook.com/shroom18009"
};

export const PERFORMANCES: Performance[] = [
  { time: "11:00 - 11:30", title: "개막식 및 축사", titleEn: "Opening Ceremony", titleZh: "开幕式及致辞", description: "", descriptionEn: "", descriptionZh: "", type: 'local' },
  { time: "11:30 - 12:00", title: "지역 실버 합창단", titleEn: "Local Silver Choir", titleZh: "社区老年合唱团", description: "", descriptionEn: "", descriptionZh: "", type: 'local' },
  { time: "12:10 - 12:40", title: "어린이 태권무 공연", titleEn: "Children's Taekwondo", titleZh: "儿童跆拳舞表演", description: "", descriptionEn: "", descriptionZh: "", type: 'local' },
  { time: "13:00 - 13:40", title: "가치봄 매직 쇼", titleEn: "Barrier-Free Magic Show", titleZh: "同行魔术秀", description: "", descriptionEn: "", descriptionZh: "", type: 'magic' },
  { time: "14:00 - 14:40", title: "초청 가수 공연", titleEn: "Guest Singer", titleZh: "特邀歌手表演", description: "", descriptionEn: "", descriptionZh: "", type: 'guest' },
  { time: "15:00 - 15:40", title: "무장애 댄스 퍼포먼스", titleEn: "Inclusive Dance", titleZh: "无障碍舞蹈表演", description: "", descriptionEn: "", descriptionZh: "", type: 'guest' },
  { time: "15:40 - 16:00", title: "폐막식 및 경품 추첨", titleEn: "Closing & Raffle", titleZh: "闭幕式及抽奖", description: "", descriptionEn: "", descriptionZh: "", type: 'local' },
];

export const BOOTHS: Booth[] = [
  { id: 1, name: "운영본부", nameEn: "Operations HQ", nameZh: "运营总部", category: '운영', location: "Entrance", isStamping: false },
  { id: 2, name: "기념품 수령처", nameEn: "Gift Station", nameZh: "纪念品领取处", category: '운영', location: "Entrance", isStamping: false },
  { id: 5, name: "점자 명함 만들기", nameEn: "Braille Cards", nameZh: "制作盲文名片", category: '장애인식개선', location: "Zone A", isStamping: true },
  { id: 6, name: "휠체어 면허 따기", nameEn: "Wheelchair License", nameZh: "轮椅驾照体验", category: '장애인식개선', location: "Zone A", isStamping: true },
  { id: 10, name: "세계 전통 놀이", nameEn: "Traditional Games", nameZh: "世界传统游戏", category: '다문화', location: "Zone B", isStamping: true },
  { id: 13, name: "에코백 만들기", nameEn: "Eco-bag Craft", nameZh: "制作环保袋", category: '환경', location: "Zone C", isStamping: true },
  { id: 16, name: "페이스 페인팅", nameEn: "Face Painting", nameZh: "面부彩绘", category: '놀이체험', location: "Zone D", isStamping: true },
];

export const BUS_STOPS = [
  { 
    name: "미관광장3호\n(행사장)", 
    nameEn: "Aesthetic Sq 3\n(Festival)", 
    nameZh: "美观广场3号\n(庆典)", 
    isPoint: true,
    mapUrl: "https://map.naver.com/v5/search/시흥시 정왕동 1799-7"
  },
  { 
    name: "장현 19단지\n정문\n버스정류장", 
    nameEn: "Janghyeon 19\nMain Gate\nBus Stop", 
    nameZh: "长岘19园区\n正门\n巴士站", 
    isPoint: false,
    mapUrl: "https://map.naver.com/v5/search/장곡동 879"
  },
  { 
    name: "목감 7단지\n정문\n버스정류장", 
    nameEn: "Mokgam 7\nMain Gate\nBus Stop", 
    nameZh: "牧甘7园区\n正门\n巴士站", 
    isPoint: false,
    mapUrl: "https://map.naver.com/v5/search/목감7단지정문 버스정류장"
  },
  { 
    name: "능곡초등학교\n맞은편\n(육교 밑)", 
    nameEn: "Opposite\nNeunggok ES\n(Footbridge)", 
    nameZh: "陵谷小学\n对面\n(天桥下)", 
    isPoint: false,
    mapUrl: "https://map.naver.com/v5/search/능곡초등학교"
  },
  { 
    name: "시흥시청\n정문 맞은편\n버스정류장", 
    nameEn: "Opposite\nSiheung City Hall\nBus Stop", 
    nameZh: "始兴市政厅\n正门对面\n巴士站", 
    isPoint: false,
    mapUrl: "https://map.naver.com/v5/search/시흥시청정문"
  },
  { 
    name: "미관광장3호\n(행사장)", 
    nameEn: "Aesthetic Sq 3\n(Festival)", 
    nameZh: "美观广场3号\n(庆典)", 
    isPoint: true,
    mapUrl: "https://map.naver.com/v5/search/시흥시 정왕동 1799-7"
  },
];

export const BUS_SCHEDULE = [
  { round: "1회", times: ["9:30", "9:45", "10:00", "10:20", "10:30", "10:50"] },
  { round: "2회", times: ["11:30", "11:45", "12:00", "12:20", "12:30", "12:50"] },
  { round: "3회", times: ["13:30", "13:45", "14:00", "14:20", "14:30", "14:50"] },
  { round: "4회", times: ["16:00", "16:15", "16:30", "16:50", "17:00", "17:20"] },
];

export const CONTACTS: ContactInfo[] = [
  { role: "총괄 팀장", roleEn: "Project Lead", roleZh: "总负责人", name: "김함께", nameEn: "Ham-kke Kim", nameZh: "金同行", phone: "031-431-9114", email: "together@shwcd.org" },
  { role: "자원봉사 지원", roleEn: "Volunteer Support", roleZh: "志愿服务支持", name: "이봉사", nameEn: "Bong-sa Lee", nameZh: "李志愿", phone: "031-431-9114", email: "volunteer@shwcd.org" },
];

export const PARKING_LOCATIONS: ParkingLocation[] = [
  {
    id: 1,
    name: "미관광장 주변 주차",
    nameEn: "Near Aesthetic Square",
    nameZh: "美观广场周边停车",
    address: "경기도 시흥시 정왕동 1799-7",
    addressEn: "1799-7, Jeongwang-dong, Siheung-si",
    addressZh: "京畿道始兴市正往洞1799-7",
    capacity: "",
    distance: "",
    distanceEn: "",
    distanceZh: "",
    mapUrl: "https://map.naver.com/v5/search/경기도 시흥시 정왕동 1799-7"
  },
  {
    id: 2,
    name: "시흥시남부노인복지관",
    nameEn: "Siheung Southern Welfare Center",
    nameZh: "始兴南部老人福利馆",
    address: "경기도 시흥시 마유로 372-22",
    addressEn: "372-22, Mayu-ro, Siheung-si",
    addressZh: "京畿道始兴市摩游路372-22",
    capacity: "",
    distance: "",
    distanceEn: "",
    distanceZh: "",
    mapUrl: "https://map.naver.com/v5/search/경기도 시흥시 마유로 372-22"
  },
  {
    id: 3,
    name: "청년스테이션",
    nameEn: "Youth Station",
    nameZh: "青年驿站",
    address: "경기도 시흥시 정왕대로233번길 19-1",
    addressEn: "19-1, Jeongwang-daero 233beon-gil, Siheung-si",
    addressZh: "京畿道始兴市正往大路233番街19-1",
    capacity: "",
    distance: "",
    distanceEn: "",
    distanceZh: "",
    mapUrl: "https://map.naver.com/v5/search/경기도 시흥시 정왕대로233번길 19-1"
  }
];
