
import React, { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, Info, 
  Music, Bus, Phone, 
  Menu, X, ClipboardList, 
  Sparkles, ArrowRight,
  ChevronRight, Globe,
  CheckCircle2, Maximize2,
  Languages, Loader2, Send,
  Instagram, Youtube, Facebook,
  Car, ExternalLink, Info as InfoIcon,
  MoveHorizontal
} from 'lucide-react';
import { 
  FESTIVAL_NAME, FESTIVAL_NAME_EN, FESTIVAL_NAME_ZH,
  FESTIVAL_SUBTITLE, FESTIVAL_SUBTITLE_EN, FESTIVAL_SUBTITLE_ZH,
  FESTIVAL_DATE, FESTIVAL_DATE_EN, FESTIVAL_DATE_ZH,
  FESTIVAL_TIME, FESTIVAL_TIME_EN, FESTIVAL_TIME_ZH,
  FESTIVAL_PLACE, FESTIVAL_PLACE_EN, FESTIVAL_PLACE_ZH,
  FESTIVAL_PLACE_MAP_URL,
  PERFORMANCES, 
  BOOTHS, BUS_STOPS, BUS_SCHEDULE, CONTACTS, SOCIAL_LINKS, PARKING_LOCATIONS
} from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [lang, setLang] = useState<'KO' | 'EN' | 'ZH'>('KO');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = (ko: string, en: string, zh: string) => {
    if (lang === 'EN') return en;
    if (lang === 'ZH') return zh;
    return ko;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const langMap = { 'KO': 'ko', 'EN': 'en', 'ZH': 'zh' };
    document.documentElement.lang = langMap[lang];
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lang]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("https://formspree.io/f/xqellgrq", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setIsSubmitSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        alert(t("오류가 발생했습니다.", "An error occurred.", "发生错误。"));
      }
    } catch (error) {
      alert(t("네트워크 오류가 발생했습니다.", "A network error occurred.", "网络错误。"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const NavItem = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => (
    <button
      role="tab"
      aria-selected={activeTab === id}
      aria-controls={`panel-${id}`}
      id={`tab-${id}`}
      onClick={() => { setActiveTab(id); setIsMenuOpen(false); window.scrollTo(0, 0); }}
      className={`relative flex flex-col items-center justify-center space-y-1 px-3 sm:px-4 py-2 transition-all duration-300 ${
        activeTab === id ? 'text-pink-600 font-bold' : 'text-gray-800 hover:text-pink-600'
      }`}
    >
      <Icon size={22} aria-hidden="true" className={`sm:w-6 sm:h-6 ${activeTab === id ? 'scale-110' : ''}`} />
      <span className="text-[9px] sm:text-xs font-black tracking-tight whitespace-nowrap">{label}</span>
      {activeTab === id && (
        <span className="absolute -bottom-1 w-1 h-1 bg-pink-600 rounded-full"></span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0 bg-[#fffbfc] selection:bg-pink-100 selection:text-pink-600">
      <header className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-xl shadow-md py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => { setActiveTab('home'); }}
            role="button"
            aria-label={t("홈으로 이동", "Go to Home", "回首页")}
          >
            <div className="bg-gradient-to-br from-pink-500 to-rose-400 p-2 rounded-2xl text-white shadow-lg" aria-hidden="true">
              <Sparkles size={24} />
            </div>
            <div className="flex flex-col text-left">
              <h1 className="text-lg md:text-xl font-black text-gray-900 leading-none tracking-tighter break-keep">
                {t(FESTIVAL_NAME, FESTIVAL_NAME_EN, FESTIVAL_NAME_ZH)}
              </h1>
              {lang === 'KO' && (
                <span className="text-[9px] font-black text-pink-400 mt-1 uppercase tracking-widest">
                  무장애 마을 축제
                </span>
              )}
            </div>
          </div>

          <nav className="hidden xl:flex items-center space-x-1" role="tablist">
            <NavItem id="home" label={t("홈", "Home", "主页")} icon={Info} />
            <NavItem id="schedule" label={t("공연", "Performances", "表演")} icon={Music} />
            <NavItem id="booth_map" label={t("부스", "Booths", "展位")} icon={MapPin} />
            <NavItem id="transport" label={t("이동편의", "Transport", "交通")} icon={Bus} />
            <NavItem id="parking" label={t("주차", "Parking", "停车")} icon={Car} />
            <NavItem id="contact" label={t("문의", "Contact", "咨询")} icon={Phone} />
            
            <div className="h-6 w-px bg-gray-100 mx-3" aria-hidden="true"></div>
            
            <div className="flex items-center gap-1" role="group" aria-label={t("언어 선택", "Language Selection", "选择语言")}>
              {(['KO', 'EN', 'ZH'] as const).map((l) => (
                <button 
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors ${
                    lang === l ? 'bg-pink-50 text-pink-600 border border-pink-100' : 'text-gray-800 hover:text-pink-600'
                  }`}
                >
                  {l === 'KO' ? '한글' : l === 'EN' ? 'EN' : '中文'}
                </button>
              ))}
            </div>

            <button 
              onClick={() => { setActiveTab('home'); setTimeout(() => {
                document.getElementById('feedback-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 100); }}
              className="bg-gray-900 text-white px-5 py-2.5 rounded-2xl text-sm font-black flex items-center gap-2 hover:bg-pink-600 transition-all shadow-xl shadow-gray-100 ml-2"
            >
              {t("의견 남기기", "Feedback", "留言")} <ClipboardList size={16} aria-hidden="true" />
            </button>
          </nav>

          <div className="flex items-center gap-2 xl:hidden">
            <div className="flex bg-pink-50/50 p-1 rounded-xl border border-pink-100">
              {(['KO', 'EN', 'ZH'] as const).map((l) => (
                <button 
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                    lang === l ? 'bg-pink-600 text-white shadow-sm' : 'text-pink-400 hover:text-pink-600'
                  }`}
                >
                  {l === 'KO' ? '한글' : l === 'EN' ? 'EN' : '中'}
                </button>
              ))}
            </div>
            <button className="p-2 text-pink-600" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? t("메뉴 닫기", "Close Menu", "关闭菜单") : t("메뉴 열기", "Open Menu", "打开菜单")}>
              {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white animate-in slide-in-from-right duration-300 xl:hidden">
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-12">
              <div className="bg-gradient-to-br from-pink-500 to-rose-400 p-2 rounded-2xl text-white shadow-lg"><Sparkles size={24} /></div>
              <button onClick={() => setIsMenuOpen(false)} className="text-pink-600"><X size={40} /></button>
            </div>
            <nav className="flex flex-col gap-6 text-left">
              <MobileNavItem id="home" label={t("홈", "Home", "主页")} icon={Info} active={activeTab === 'home'} onClick={setActiveTab} setIsMenuOpen={setIsMenuOpen} />
              <MobileNavItem id="schedule" label={t("공연 시간표", "Performances", "表演")} icon={Music} active={activeTab === 'schedule'} onClick={setActiveTab} setIsMenuOpen={setIsMenuOpen} />
              <MobileNavItem id="booth_map" label={t("부스 안내", "Booths", "展位")} icon={MapPin} active={activeTab === 'booth_map'} onClick={setActiveTab} setIsMenuOpen={setIsMenuOpen} />
              <MobileNavItem id="transport" label={t("이동편의 버스", "Transport", "交通")} icon={Bus} active={activeTab === 'transport'} onClick={setActiveTab} setIsMenuOpen={setIsMenuOpen} />
              <MobileNavItem id="parking" label={t("주차장 안내", "Parking", "停车场")} icon={Car} active={activeTab === 'parking'} onClick={setActiveTab} setIsMenuOpen={setIsMenuOpen} />
              <MobileNavItem id="contact" label={t("문의하기", "Contact", "咨询")} icon={Phone} active={activeTab === 'contact'} onClick={setActiveTab} setIsMenuOpen={setIsMenuOpen} />
            </nav>
            <div className="mt-auto pt-10 border-t border-pink-50">
               <button 
                  onClick={() => { setActiveTab('home'); setIsMenuOpen(false); setTimeout(() => {
                    document.getElementById('feedback-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100); }}
                  className="w-full bg-gray-900 text-white py-5 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3"
                >
                  {t("의견 남기기", "Feedback", "留言")} <ClipboardList size={24} />
               </button>
            </div>
          </div>
        </div>
      )}

      <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
        <div role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
          {activeTab === 'home' && <HomeSection lang={lang} onFormSubmit={handleFormSubmit} isSubmitting={isSubmitting} />}
          {activeTab === 'schedule' && <ScheduleSection lang={lang} />}
          {activeTab === 'booth_map' && <BoothMapSection lang={lang} />}
          {activeTab === 'transport' && <TransportSection lang={lang} />}
          {activeTab === 'parking' && <ParkingSection lang={lang} />}
          {activeTab === 'contact' && <ContactSection lang={lang} />}
        </div>
      </main>

      {isSubmitSuccess && (
        <div role="alert" className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] p-10 md:p-16 max-w-sm w-full shadow-2xl text-center transform animate-in zoom-in duration-300">
            <CheckCircle2 size={48} className="text-pink-600 mx-auto mb-8" aria-hidden="true" />
            <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">{t("제출이 완료되었습니다!", "Submission Complete!", "提交成功！")}</h3>
            <p className="text-gray-500 font-bold mb-10">{t("소중한 의견 감사합니다.", "Thank you for your feedback.", "感谢您的宝贵意见。")}</p>
            <button onClick={() => setIsSubmitSuccess(false)} className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black">{t("확인", "Confirm", "确认")}</button>
          </div>
        </div>
      )}

      <footer className="bg-white py-12 text-center border-t border-gray-100 shadow-inner">
        <p className="text-indigo-600 font-black italic text-lg uppercase tracking-widest px-6 mb-4">
          {t("누구도 배제되지 않는 마을", "No one is left behind", "不让任何人掉队的村庄")}
        </p>
        <div className="bg-gray-50 inline-block px-8 py-4 rounded-3xl border border-gray-200">
          <p className="text-gray-900 font-black text-lg md:text-2xl tracking-tighter px-4">
            {t("주최/주관 시흥장애인종합복지관", "Organized by Siheung Welfare Center for the Disabled", "主办/承办 始兴市残疾人综合福利馆")}
          </p>
        </div>
      </footer>

      <nav className="xl:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-pink-50 flex justify-around py-3 px-2 z-50 shadow-md" role="tablist">
        <NavItem id="home" label={t("홈", "Home", "主页")} icon={Info} />
        <NavItem id="schedule" label={t("공연", "Show", "表演")} icon={Music} />
        <NavItem id="booth_map" label={t("부스", "Booths", "展位")} icon={MapPin} />
        <NavItem id="transport" label={t("이동", "Move", "交通")} icon={Bus} />
        <NavItem id="parking" label={t("주차", "Park", "停车")} icon={Car} />
        <NavItem id="contact" label={t("문의", "Contact", "咨询")} icon={Phone} />
      </nav>
    </div>
  );
};

const MobileNavItem = ({ id, label, icon: Icon, active, onClick, setIsMenuOpen }: any) => (
  <button 
    onClick={() => { onClick(id); setIsMenuOpen(false); window.scrollTo(0, 0); }}
    className={`flex items-center gap-6 p-4 rounded-[1.5rem] transition-all ${active ? 'bg-pink-50 text-pink-600' : 'text-gray-800'}`}
  >
    <div className={`p-3 rounded-2xl ${active ? 'bg-white shadow-sm' : ''}`}><Icon size={32} /></div>
    <span className="text-2xl font-black tracking-tighter">{label}</span>
  </button>
);

const HomeSection: React.FC<{ lang: string, onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void, isSubmitting: boolean }> = ({ lang, onFormSubmit, isSubmitting }) => {
  const t = (ko: string, en: string, zh: string) => lang === 'EN' ? en : lang === 'ZH' ? zh : ko;
  return (
    <div className="animate-in fade-in duration-1000">
      <div className="relative pt-12 md:pt-24 pb-20 md:pb-32 px-4 md:px-6 overflow-hidden text-center">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-200/30 blur-[120px] rounded-full -z-10" aria-hidden="true"></div>
        <div className="max-w-5xl mx-auto">
          <span className="text-pink-500 font-black text-sm md:text-2xl uppercase tracking-[0.3em] md:tracking-[0.4em] mb-3 md:mb-4 block">
            {t("제4회 무장애마을축제", "The 4th Barrier-Free Village", "第4届 无障碍村庄")}
          </span>
          <h2 className={`font-black text-[#e91e63] leading-tight tracking-tighter mb-6 md:mb-8 drop-shadow-lg ${lang === 'KO' ? 'text-5xl md:text-[11rem]' : 'text-4xl md:text-[8rem]'}`}>
            {lang === 'KO' ? (
                <div className="flex flex-col md:block">
                  <span>함께봄</span> <span className="md:inline-block md:ml-4">가치봄</span>
                </div>
              ) : (
                t("", FESTIVAL_NAME_EN, FESTIVAL_NAME_ZH)
              )}
          </h2>
          <p className="text-base md:text-3xl font-bold mb-8 md:mb-10 text-gray-400 italic break-keep px-4">
            "{t(FESTIVAL_SUBTITLE, FESTIVAL_SUBTITLE_EN, FESTIVAL_SUBTITLE_ZH)}"
          </p>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-left mb-16 md:mb-24 px-4">
            <div className="flex items-center gap-4 group">
              <div className="bg-white p-3 rounded-2xl shadow-sm text-pink-600" aria-hidden="true"><Calendar size={22} /></div>
              <div>
                <span className="text-[10px] font-black text-pink-400 uppercase block">{t("일정", "Date", "日期")}</span>
                <span className="text-lg md:text-xl font-black text-gray-800">{t(FESTIVAL_DATE, FESTIVAL_DATE_EN, FESTIVAL_DATE_ZH)}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="bg-white p-3 rounded-2xl shadow-sm text-pink-600" aria-hidden="true"><MapPin size={22} /></div>
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-[10px] font-black text-pink-400 uppercase block">{t("장소", "Location", "地点")}</span>
                  <a 
                    href={FESTIVAL_PLACE_MAP_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-pink-600 text-white px-3 py-1.5 rounded-2xl text-[10px] md:text-[12px] font-black hover:bg-gray-900 transition-all shadow-md shadow-pink-100 border-2 border-pink-50"
                  >
                    {t("행사장소 확인", "Check Location", "确认地点")} <ExternalLink size={14} />
                  </a>
                </div>
                <span className="text-lg md:text-xl font-black text-gray-800 break-keep">{t(FESTIVAL_PLACE, FESTIVAL_PLACE_EN, FESTIVAL_PLACE_ZH)}</span>
              </div>
            </div>
          </div>

          <section id="feedback-section" className="max-w-4xl mx-auto mb-16 md:mb-24 scroll-mt-24 px-2">
            <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] border border-gray-100 p-6 md:p-16 shadow-2xl text-left relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-pink-50/20 group-hover:scale-125 transition-transform duration-700 hidden md:block" aria-hidden="true"><ClipboardList size={220} /></div>
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 md:mb-10">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-[#e91e63] text-white rounded-2xl md:rounded-[1.5rem] flex items-center justify-center shadow-lg" aria-hidden="true"><Send size={24} className="md:w-8 md:h-8" /></div>
                    <div className="flex-1">
                        <h3 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tighter italic leading-tight break-keep">{t("행사 의견 바로 남기기", "Feedback", "即刻留言")}</h3>
                        <p className="text-xs md:text-lg text-gray-400 font-bold mt-1 break-keep">{t("여러분의 의견으로 더 나은 마을을 만듭니다.", "Help us build a better village.", "您的意见将共建更美好的村庄。")}</p>
                    </div>
                  </div>

                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" onSubmit={onFormSubmit}>
                    <div className="space-y-2">
                      <label htmlFor="user-name" className="text-[10px] md:text-[11px] font-black text-gray-400 ml-2 uppercase tracking-widest">{t("이름", "Name", "姓名")}</label>
                      <input id="user-name" name="name" required type="text" placeholder={t("성함을 입력하세요", "Your name", "请输入姓名")} className="w-full bg-gray-50 border-none rounded-xl md:rounded-2xl p-4 md:p-5 text-sm md:text-lg font-bold focus:ring-4 focus:ring-pink-100 shadow-inner" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="user-phone" className="text-[10px] md:text-[11px] font-black text-gray-400 ml-2 uppercase tracking-widest">{t("연락처", "Phone", "电话")}</label>
                      <input id="user-phone" name="phone" required type="tel" placeholder={t("전화번호를 입력하세요", "Phone number", "请输入电话号码")} className="w-full bg-gray-50 border-none rounded-xl md:rounded-2xl p-4 md:p-5 text-sm md:text-lg font-bold focus:ring-4 focus:ring-pink-100 shadow-inner" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label htmlFor="user-message" className="text-[10px] md:text-[11px] font-black text-gray-400 ml-2 uppercase tracking-widest">{t("의견", "Feedback", "内容")}</label>
                      <textarea id="user-message" name="message" required rows={4} placeholder={t("축제에 대한 소중한 한마디를 남겨주세요.", "Leave your words here.", "请留下您对庆典的宝贵意见。")} className="w-full bg-gray-50 border-none rounded-2xl md:rounded-[2rem] p-5 md:p-7 text-sm md:text-lg font-bold focus:ring-4 focus:ring-pink-100 resize-none shadow-inner"></textarea>
                    </div>
                    <div className="md:col-span-2 mt-4">
                      <button disabled={isSubmitting} className="w-full bg-gray-900 text-white py-5 md:py-9 rounded-2xl md:rounded-[2.5rem] text-lg md:text-3xl font-black shadow-2xl hover:bg-[#e91e63] transition-all flex items-center justify-center gap-4 disabled:bg-gray-400">
                        {isSubmitting ? (
                          <><Loader2 className="animate-spin" size={24} /> {t("제출 중...", "Submitting...", "提交中...")}</>
                        ) : (
                          <>{t("의견 제출하기", "Submit", "提交")} <ArrowRight size={24} className="md:w-7 md:h-7" /></>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const BoothMapSection: React.FC<{ lang: string }> = ({ lang }) => {
  const [filter, setFilter] = useState('전체');
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const t = (ko: string, en: string, zh: string) => lang === 'EN' ? en : lang === 'ZH' ? zh : ko;
  
  const categories = [
    { ko: '전체', en: 'All', zh: '全部' },
    { ko: '놀이체험', en: 'Fun', zh: '游乐' },
    { ko: '장애인식개선', en: 'Awareness', zh: '认识提升' },
    { ko: '다문화', en: 'Culture', zh: '多元文化' },
    { ko: '환경', en: 'Eco', zh: '环境' },
    { ko: '운영', en: 'Operations', zh: '运营' }
  ];
  
  const categoryStyles: Record<string, string> = {
    '운영': 'bg-rose-500 text-white',
    '장애인식개선': 'bg-blue-500 text-white',
    '다문화': 'bg-amber-500 text-white',
    '환경': 'bg-emerald-500 text-white',
    '놀이체험': 'bg-pink-500 text-white'
  };

  const filteredBooths = filter === '전체' ? BOOTHS : BOOTHS.filter(b => b.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 md:mb-16 text-left">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-7xl font-black text-gray-900 mb-3 md:mb-4 tracking-tighter italic">{t("부스안내", "Booth Guide", "展位指南")}</h2>
          <p className="text-sm md:text-xl text-gray-500 font-bold italic break-keep">{t("미관광장에 준비된 테마별 체험과 서비스를 만나보세요.", "Explore themed experiences.", "在广场体验各种主题活动吧。")}</p>
        </div>
      </div>

      {/* 스탬프 이벤트 안내 배너 */}
      <div className="mb-10 bg-pink-50 border-2 border-pink-100 rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 flex flex-col md:flex-row items-center gap-4 md:gap-6 shadow-sm animate-pulse-slow">
        <div className="bg-pink-600 text-white p-3 rounded-xl md:rounded-2xl shadow-lg flex-shrink-0" aria-hidden="true">
          <Sparkles size={24} className="md:w-8 md:h-8" />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-lg md:text-3xl font-black text-gray-900 tracking-tighter mb-1 break-keep">
            {t("부스에서 스탬프를 모으시면 기념품을 드립니다.", "Collect stamps at booths to receive a souvenir.", "在展位收集印章即可获得纪念品。")}
          </h3>
          <p className="text-pink-600 font-bold text-xs md:text-lg">
            {t("* 기념품 수령처에서 확인 후 수령 가능합니다.", "* Can be collected at the Gift Station.", "* 确认后可在纪念品领取处领取。")}
          </p>
        </div>
      </div>

      <div className="mb-16 md:mb-20">
         <button onClick={() => setIsMapExpanded(true)} className="w-full relative cursor-zoom-in group bg-white rounded-[2rem] md:rounded-[3rem] p-4 md:p-6 border-2 md:border-4 border-white shadow-2xl overflow-hidden aspect-[16/9] flex items-center justify-center" aria-label={t("지도 크게 보기", "Expand Map", "放大地图")}>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-blue-50/50 -z-10" aria-hidden="true"></div>
            <div className="relative w-full h-full border-2 md:border-4 border-dashed border-gray-100 rounded-2xl md:rounded-[2rem] flex flex-col items-center justify-center gap-4 md:gap-6">
                <div className="flex gap-2 md:gap-4 font-black" aria-hidden="true">
                   <div className="w-16 h-16 md:w-24 md:h-24 bg-[#e91e63] rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-xl rotate-3 text-xs md:text-base">🚩 {t("본부", "HQ", "总部")}</div>
                   <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-900 rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-xl -rotate-2 text-xs md:text-base">🎤 {t("무대", "Stage", "舞台")}</div>
                </div>
                <div className="bg-white/80 backdrop-blur-md px-4 py-2 md:px-8 md:py-4 rounded-full border border-pink-100 font-black text-pink-600 text-xs md:text-base flex items-center gap-2 shadow-sm group-hover:scale-110 transition-transform">
                   <Maximize2 size={16} className="md:w-5 md:h-5" /> {t("지도를 크게 보려면 클릭하세요", "Click to expand", "点击查看放大地图")}
                </div>
            </div>
         </button>
      </div>

      <div>
         <div className="flex flex-wrap gap-2 mb-8 md:mb-10" role="tablist" aria-label={t("카테고리 필터", "Category Filter", "类别筛选")}>
            {categories.map(c => (
               <button 
                 key={c.ko} 
                 role="tab"
                 aria-selected={filter === c.ko}
                 onClick={() => setFilter(c.ko)} 
                 className={`px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[10px] md:text-sm font-black transition-all ${filter === c.ko ? 'bg-gray-900 text-white shadow-lg' : 'bg-white border-2 border-gray-100 text-gray-800 hover:border-pink-200'}`}
               >
                 {t(c.ko, c.en, c.zh)}
               </button>
            ))}
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
            {filteredBooths.map((booth) => (
               <div key={booth.id} role="listitem" className="bg-white p-5 md:p-6 rounded-2xl md:rounded-[2rem] border border-gray-100 flex items-center gap-4 md:gap-6 hover:border-pink-200 hover:-translate-y-1 transition-all shadow-sm group">
                  <div className={`w-12 h-12 md:w-14 md:h-14 flex-shrink-0 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-lg md:text-xl shadow-inner ${categoryStyles[booth.category] || 'bg-gray-100 text-gray-400'}`} aria-hidden="true">
                    {booth.id}
                  </div>
                  <div className="flex flex-col text-left">
                     <span className="text-[9px] md:text-[10px] font-black text-gray-300 uppercase tracking-widest">{t(booth.category, booth.category, booth.category)}</span>
                     <h4 className="text-base md:text-xl font-black text-gray-900 group-hover:text-pink-600 transition-colors break-keep">{t(booth.name, booth.nameEn, booth.nameZh)}</h4>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {isMapExpanded && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
           <button className="absolute top-6 right-6 md:top-8 md:right-8 text-white" onClick={() => setIsMapExpanded(false)} aria-label={t("닫기", "Close", "关闭")}><X size={40} className="md:w-12 md:h-12" /></button>
           <div className="max-w-7xl w-full aspect-[16/9] bg-white rounded-2xl md:rounded-[4rem] p-6 md:p-20 relative overflow-hidden flex flex-col items-center justify-center text-center">
              <h3 className="text-2xl md:text-6xl font-black text-gray-900 mb-6 md:mb-10 tracking-tighter italic break-keep">{t("무장애 마을 축제 공간 배치도", "Barrier-Free Site Map", "无障碍村庄庆典空间分布图")}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl" aria-hidden="true">
                 <div className="flex flex-col items-center gap-2 md:gap-4"><div className="w-14 h-14 md:w-20 md:h-20 bg-[#e91e63] rounded-2xl flex items-center justify-center text-xl md:text-3xl shadow-lg">🚩</div><span className="font-black text-xs md:text-xl">{t("운영본부", "HQ", "总部")}</span></div>
                 <div className="flex flex-col items-center gap-2 md:gap-4"><div className="w-14 h-14 md:w-20 md:h-20 bg-blue-500 rounded-2xl flex items-center justify-center text-xl md:text-3xl shadow-lg">🚽</div><span className="font-black text-xs md:text-xl">{t("화장실", "Restroom", "洗手间")}</span></div>
                 <div className="flex flex-col items-center gap-2 md:gap-4"><div className="w-14 h-14 md:w-20 md:h-20 bg-rose-500 rounded-2xl flex items-center justify-center text-xl md:text-3xl shadow-lg">🏥</div><span className="font-black text-xs md:text-xl">{t("의료지원처", "Medical", "医疗站")}</span></div>
                 <div className="flex flex-col items-center gap-2 md:gap-4"><div className="w-14 h-14 md:w-20 md:h-20 bg-emerald-500 rounded-2xl flex items-center justify-center text-xl md:text-3xl shadow-lg">🚐</div><span className="font-black text-xs md:text-xl">{t("셔틀 정류장", "Shuttle", "班车站")}</span></div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const ScheduleSection: React.FC<{ lang: string }> = ({ lang }) => {
  const t = (ko: string, en: string, zh: string) => lang === 'EN' ? en : lang === 'ZH' ? zh : ko;
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-24 animate-in fade-in duration-500">
      <h2 className="text-3xl md:text-7xl font-black text-gray-900 mb-8 md:mb-14 text-center italic tracking-tighter">{t("공연시간표", "Time Table", "节目时间表")}</h2>
      <div className="bg-white border-2 md:border-4 border-gray-100 rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl" role="table">
        <div className="grid grid-cols-[100px_1fr] md:grid-cols-[180px_1fr] bg-gray-900 text-white py-5 px-6 md:px-10 font-black text-sm md:text-2xl" role="rowgroup">
           <div className="border-r border-white/10 text-center pr-4 md:pr-10" role="columnheader">{t("시간", "Time", "时间")}</div>
           <div className="pl-6 md:pl-10" role="columnheader">{t("프로그램명", "Program", "项目名称")}</div>
        </div>
        <div className="divide-y divide-gray-100" role="rowgroup">
          {PERFORMANCES.map((perf, idx) => (
            <div key={idx} className="grid grid-cols-[100px_1fr] md:grid-cols-[180px_1fr] py-5 md:py-9 px-6 md:px-10 items-center hover:bg-pink-50/30 transition-colors" role="row">
              <div className="font-black text-pink-600 text-lg md:text-3xl italic border-r border-gray-100 text-center pr-4 md:pr-10" role="cell">
                {perf.time.split(' - ')[0]}
              </div>
              <div className="text-xl md:text-4xl font-black text-gray-800 tracking-tight break-keep pl-6 md:pl-10 leading-tight" role="cell">
                {t(perf.title, perf.titleEn, perf.titleZh)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TransportSection: React.FC<{ lang: string }> = ({ lang }) => {
  const [showScrollHint, setShowScrollHint] = useState(false);
  const t = (ko: string, en: string, zh: string) => lang === 'EN' ? en : lang === 'ZH' ? zh : ko;

  useEffect(() => {
    setShowScrollHint(true);
    const timer = setTimeout(() => setShowScrollHint(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24 animate-in fade-in duration-500 text-left">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 md:mb-16">
        <div className="max-w-2xl text-left">
          <h2 className="text-3xl md:text-8xl font-black text-gray-900 mb-4 md:mb-6 tracking-tighter italic">{t("이동편의버스", "Transport Bus", "交通巴士")}</h2>
          <p className="text-base md:text-2xl text-[#8b1a1a] font-bold italic break-keep">
            {t("장애인을 위한 이동편의버스노선입니다.", "This is a transport bus route for the disabled.", "这是为残疾人提供的交通巴士路线。")}
          </p>
        </div>
      </div>

      <div className="relative">
        {showScrollHint && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/10 backdrop-blur-[1px] pointer-events-none rounded-[2rem] md:rounded-[3rem] animate-out fade-out duration-1000 fill-mode-forwards" style={{ animationDelay: '2.5s' }}>
            <div className="bg-white/90 p-6 rounded-2xl shadow-xl flex flex-col items-center gap-3 scale-90 md:scale-100 animate-bounce">
              <MoveHorizontal size={32} className="text-pink-600" />
              <p className="font-black text-gray-900 text-sm md:text-lg whitespace-nowrap">{t("옆으로 밀어보기", "Swipe to see more", "侧向滑动查看更多")}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 border-2 border-gray-100 shadow-xl overflow-x-auto relative">
          <div className="min-w-[1000px] py-6 md:py-10">
            <div className="grid grid-cols-[80px_repeat(6,1fr)] mb-16 md:mb-24 gap-4">
              <div className="flex items-center justify-center">
                <span className="text-pink-600 font-black italic">{t("회차", "Round", "次")}</span>
              </div>
              {BUS_STOPS.map((stop, idx) => (
                <div key={idx} className="text-center flex flex-col items-center">
                  <span className={`text-[15px] md:text-[18px] font-black leading-tight whitespace-pre-line mb-4 min-h-[3.5rem] flex items-center justify-center break-keep ${stop.isPoint ? 'text-[#8b1a1a]' : 'text-gray-900'}`}>
                    {t(stop.name, stop.nameEn, stop.nameZh)}
                  </span>
                  <a 
                    href={stop.mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-pink-100 text-gray-800 hover:text-pink-600 px-3 py-1.5 rounded-xl text-[10px] font-black transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <MapPin size={12} /> {t("위치보기", "Location", "查看位置")}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-12 md:space-y-20 relative px-4">
              {BUS_SCHEDULE.map((row, rowIdx) => (
                <div key={rowIdx} className="grid grid-cols-[80px_repeat(6,1fr)] items-center relative z-10">
                  <div className="text-xl md:text-3xl font-black text-[#8b1a1a] italic text-center">
                    {row.round}
                  </div>
                  
                  {row.times.map((time, colIdx) => (
                    <div key={colIdx} className="flex flex-col items-center group relative">
                      <div className="w-4 h-4 md:w-5 md:h-5 bg-black rounded-full mb-3 shadow-md group-hover:scale-125 transition-transform" aria-hidden="true"></div>
                      <span className="text-lg md:text-2xl font-black text-gray-800 tracking-tight">{time}</span>
                    </div>
                  ))}

                  <div className="absolute top-[8px] md:top-[10px] left-[15%] right-[7%] h-0.5 bg-gray-800/20 -z-10" aria-hidden="true"></div>
                  <div className="absolute top-[8px] md:top-[10px] left-[15%] right-[7%] h-0.5 bg-gradient-to-r from-gray-800 via-gray-800 to-transparent -z-10" aria-hidden="true" style={{ width: '85%' }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-16 bg-pink-50/50 p-6 md:p-12 rounded-3xl md:rounded-[2.5rem] border-2 border-pink-100 flex items-start gap-4 md:gap-6">
        <div className="bg-pink-600 text-white p-2.5 md:p-3 rounded-xl md:rounded-2xl flex-shrink-0" aria-hidden="true"><InfoIcon size={24} className="md:w-7 md:h-7" /></div>
        <div className="space-y-2 md:space-y-4">
          <p className="text-base md:text-2xl font-black text-gray-900 leading-snug break-keep">
            {t("미관광장의 이동편의 탑승 장소는 정류장에 휠체어 모양이 그려진 곳에서 탑승해야 하며,", "Please board at the designated spot marked with a wheelchair at the Aesthetic Square stop,", "在美观广场站，请在标有轮椅图案의 지정地点上车，")}
            <br className="hidden md:block" />
            <span className="text-pink-600"> {t("출발 시간보다 10분 전에 도착해 있어야 합니다.", "and please arrive 10 minutes before the departure time.", "并请在出发时间前10分钟到达。")}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const ParkingSection: React.FC<{ lang: string }> = ({ lang }) => {
  const t = (ko: string, en: string, zh: string) => lang === 'EN' ? en : lang === 'ZH' ? zh : ko;
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24 animate-in fade-in duration-500 text-left">
      <div className="max-w-3xl mb-12">
        <h2 className="text-3xl md:text-8xl font-black text-gray-900 mb-4 md:mb-6 tracking-tighter italic">{t("주차장 안내", "Parking", "停车场指南")}</h2>
        <p className="text-sm md:text-2xl text-gray-500 font-bold italic break-keep">{t("축제장 주변 주차 공간을 확인하세요. 가급적 대중교통 이용을 권장합니다.", "Check available parking spots.", "请确认庆典会场周边的停车空间。")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
        {PARKING_LOCATIONS.map(park => (
          <div key={park.id} className="bg-white rounded-3xl md:rounded-[3rem] border border-gray-100 p-6 md:p-10 shadow-sm flex flex-col hover:border-pink-300 transition-all group">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-pink-50 text-pink-600 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-pink-600 group-hover:text-white transition-colors flex-shrink-0" aria-hidden="true">
              <Car size={28} className="md:w-8 md:h-8" />
            </div>
            <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-4 tracking-tighter break-keep leading-tight min-h-[2.5rem] md:min-h-[3rem] flex items-center">{t(park.name, park.nameEn, park.nameZh)}</h3>
            <div className="space-y-4 mb-8 md:mb-10 flex-grow">
              <div className="bg-gray-50 p-4 md:p-6 rounded-2xl">
                <span className="text-[9px] md:text-[10px] font-black text-pink-400 uppercase tracking-widest block mb-1.5 md:mb-2">{t("주소", "Address", "地址")}</span>
                <p className="font-bold text-gray-800 text-xs md:text-lg leading-snug break-all">{t(park.address, park.addressEn, park.addressZh)}</p>
              </div>
            </div>
            <a 
              href={park.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`${t(park.name, park.nameEn, park.nameZh)} ${t("네이버 지도에서 보기", "View in Naver Map", "在Naver地图中查看")}`}
              className="w-full bg-gray-900 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-sm md:text-lg flex items-center justify-center gap-2 md:gap-3 hover:bg-[#03C75A] transition-all shadow-lg shadow-gray-100"
            >
              {t("네이버 지도 보기", "Naver Map", "Naver地图")} <ExternalLink size={16} className="md:w-5 md:h-5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContactSection: React.FC<{ lang: string }> = ({ lang }) => {
  const t = (ko: string, en: string, zh: string) => lang === 'EN' ? en : lang === 'ZH' ? zh : ko;
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-24 animate-in fade-in duration-500 text-center">
      <h2 className="text-3xl md:text-8xl font-black text-gray-900 mb-12 md:mb-16 italic decoration-pink-100 underline">{t("문의사항", "Inquiries", "咨询事项")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16 text-left">
        {CONTACTS.map((contact, i) => (
          <div key={i} className="bg-white p-6 md:p-12 rounded-3xl md:rounded-[3rem] border border-gray-100 shadow-sm group hover:border-pink-300 transition-all">
            <span className="text-[9px] md:text-[10px] font-black text-pink-400 uppercase tracking-widest block mb-1 md:mb-2">{t(contact.role, contact.roleEn, contact.roleZh)}</span>
            <h4 className="text-xl md:text-2xl font-black text-gray-900 mb-3 md:mb-4">{t(contact.name, contact.nameEn, contact.nameZh)}</h4>
            <a href={`tel:${contact.phone}`} className="text-lg md:text-2xl font-black text-pink-600 hover:underline">{contact.phone}</a>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center pt-16 md:pt-24 border-t-2 border-pink-50 px-4">
        <h4 className="text-xl md:text-3xl font-black text-gray-900 mb-10 md:mb-12 tracking-tight">
          {t("복지관 사이트 둘러보기", "Browse Welfare Center Sites", "浏览福利馆网站")}
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl">
          <a href={SOCIAL_LINKS.website} target="_blank" rel="noopener noreferrer" 
             className="flex flex-col items-center gap-3 md:gap-4 p-6 md:p-8 bg-white border border-gray-100 rounded-[2rem] md:rounded-[2.5rem] hover:border-pink-400 hover:shadow-xl transition-all group">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-pink-50 text-pink-600 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all transform group-hover:-rotate-6" aria-hidden="true">
              <Globe size={24} className="md:w-8 md:h-8" />
            </div>
            <span className="font-black text-gray-800 text-xs md:text-base">{t("홈페이지", "Home", "官网")}</span>
          </a>
          
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" 
             className="flex flex-col items-center gap-3 md:gap-4 p-6 md:p-8 bg-white border border-gray-100 rounded-[2rem] md:rounded-[2.5rem] hover:border-pink-400 hover:shadow-xl transition-all group">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-pink-50 text-pink-600 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all transform group-hover:rotate-6" aria-hidden="true">
              <Instagram size={24} className="md:w-8 md:h-8" />
            </div>
            <span className="font-black text-gray-800 text-xs md:text-base">{t("인스타그램", "Instagram", "照片墙")}</span>
          </a>

          <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" 
             className="flex flex-col items-center gap-3 md:gap-4 p-6 md:p-8 bg-white border border-gray-100 rounded-[2rem] md:rounded-[2.5rem] hover:border-pink-400 hover:shadow-xl transition-all group">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-pink-50 text-pink-600 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all transform group-hover:-rotate-12" aria-hidden="true">
              <Youtube size={24} className="md:w-8 md:h-8" />
            </div>
            <span className="font-black text-gray-800 text-xs md:text-base">{t("유튜브", "YouTube", "油管")}</span>
          </a>

          <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" 
             className="flex flex-col items-center gap-3 md:gap-4 p-6 md:p-8 bg-white border border-gray-100 rounded-[2rem] md:rounded-[2.5rem] hover:border-pink-400 hover:shadow-xl transition-all group">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-pink-50 text-pink-600 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all transform group-hover:rotate-12" aria-hidden="true">
              <Facebook size={24} className="md:w-8 md:h-8" />
            </div>
            <span className="font-black text-gray-800 text-xs md:text-base">{t("페이스북", "Facebook", "脸书")}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
