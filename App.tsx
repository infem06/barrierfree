
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
  Car, ExternalLink
} from 'lucide-react';
import { 
  FESTIVAL_NAME, FESTIVAL_NAME_EN, FESTIVAL_NAME_ZH,
  FESTIVAL_SUBTITLE, FESTIVAL_SUBTITLE_EN, FESTIVAL_SUBTITLE_ZH,
  FESTIVAL_DATE, FESTIVAL_DATE_EN, FESTIVAL_DATE_ZH,
  FESTIVAL_TIME, FESTIVAL_TIME_EN, FESTIVAL_TIME_ZH,
  FESTIVAL_PLACE, FESTIVAL_PLACE_EN, FESTIVAL_PLACE_ZH,
  FESTIVAL_PLACE_MAP_URL,
  PERFORMANCES, 
  BOOTHS, BUS_ROUTES, CONTACTS, SOCIAL_LINKS, PARKING_LOCATIONS
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
      className={`relative flex flex-col items-center justify-center space-y-1 px-4 py-2 transition-all duration-300 ${
        activeTab === id ? 'text-pink-600 font-bold' : 'text-gray-400 hover:text-pink-400'
      }`}
    >
      <Icon size={24} aria-hidden="true" className={activeTab === id ? 'scale-110' : ''} />
      <span className="text-[10px] sm:text-xs font-bold tracking-tight whitespace-nowrap">{label}</span>
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
                    lang === l ? 'bg-pink-50 text-pink-600 border border-pink-100' : 'text-gray-400 hover:text-pink-400'
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
            <h3 className="text-3xl font-black text-gray-900 mb-4">{t("제출이 완료되었습니다!", "Submission Complete!", "提交成功！")}</h3>
            <p className="text-gray-500 font-bold mb-10">{t("소중한 의견 감사합니다.", "Thank you for your feedback.", "感谢您的宝贵意见。")}</p>
            <button onClick={() => setIsSubmitSuccess(false)} className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black">{t("확인", "Confirm", "确认")}</button>
          </div>
        </div>
      )}

      <footer className="bg-gray-100 py-12 text-center border-t border-gray-200">
        <p className="text-indigo-600 font-black italic text-lg uppercase tracking-widest px-6 mb-2">
          {t("누구도 배제되지 않는 마을", "No one is left behind", "不让任何人掉队的村庄")}
        </p>
        <p className="text-gray-500 font-bold text-sm">
          {t("주최/주관 시흥장애인종합복지관", "Organized by Siheung Welfare Center for the Disabled", "主办/承办 始兴市残疾人综合福利馆")}
        </p>
      </footer>

      <nav className="xl:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-pink-50 flex justify-around py-3 px-6 z-50 shadow-md" role="tablist">
        <NavItem id="home" label={t("홈", "Home", "主页")} icon={Info} />
        <NavItem id="schedule" label={t("공연", "Show", "表演")} icon={Music} />
        <NavItem id="booth_map" label={t("부스", "Booths", "展位")} icon={MapPin} />
        <NavItem id="transport" label={t("이동", "Move", "交通")} icon={Bus} />
        <NavItem id="parking" label={t("주차", "Park", "停车")} icon={Car} />
      </nav>
    </div>
  );
};

const MobileNavItem = ({ id, label, icon: Icon, active, onClick, setIsMenuOpen }: any) => (
  <button 
    onClick={() => { onClick(id); setIsMenuOpen(false); window.scrollTo(0, 0); }}
    className={`flex items-center gap-6 p-4 rounded-[1.5rem] transition-all ${active ? 'bg-pink-50 text-pink-600' : 'text-gray-400'}`}
  >
    <div className={`p-3 rounded-2xl ${active ? 'bg-white shadow-sm' : ''}`}><Icon size={32} /></div>
    <span className="text-2xl font-black tracking-tighter">{label}</span>
  </button>
);

const HomeSection: React.FC<{ lang: string, onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void, isSubmitting: boolean }> = ({ lang, onFormSubmit, isSubmitting }) => {
  const t = (ko: string, en: string, zh: string) => lang === 'EN' ? en : lang === 'ZH' ? zh : ko;
  return (
    <div className="animate-in fade-in duration-1000">
      <div className="relative pt-16 md:pt-24 pb-24 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-200/30 blur-[120px] rounded-full -z-10" aria-hidden="true"></div>
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-pink-500 font-black text-lg md:text-2xl uppercase tracking-[0.4em] mb-4 block">
            {t("제4회 무장애마을축제", "The 4th", "第4届")}
          </span>
          <h2 className={`font-black text-[#e91e63] leading-tight tracking-tighter mb-8 drop-shadow-lg ${lang === 'KO' ? 'text-7xl md:text-[11rem]' : 'text-5xl md:text-[8rem]'}`}>
            {lang === 'KO' ? (
                <>{t("함께봄", "", "")}<br className="md:hidden"/> {t("가치봄", "", "")}</>
              ) : (
                t("", FESTIVAL_NAME_EN, FESTIVAL_NAME_ZH)
              )}
          </h2>
          <p className="text-xl md:text-3xl font-bold mb-10 text-gray-400 italic">
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
                    className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-2xl text-[12px] font-black hover:bg-gray-900 transition-all shadow-md shadow-pink-100 border-2 border-pink-50"
                  >
                    {t("행사장소 확인", "Check Location", "确认地点")} <ExternalLink size={14} />
                  </a>
                </div>
                <span className="text-lg md:text-xl font-black text-gray-800">{t(FESTIVAL_PLACE, FESTIVAL_PLACE_EN, FESTIVAL_PLACE_ZH)}</span>
              </div>
            </div>
          </div>

          <section id="feedback-section" className="max-w-4xl mx-auto mb-20 md:mb-24 scroll-mt-24">
            <div className="bg-white rounded-[3.5rem] border border-gray-100 p-8 md:p-16 shadow-2xl text-left relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-pink-50/20 group-hover:scale-125 transition-transform duration-700 hidden md:block" aria-hidden="true"><ClipboardList size={220} /></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 bg-[#e91e63] text-white rounded-[1.5rem] flex items-center justify-center shadow-lg" aria-hidden="true"><Send size={32} /></div>
                    <div>
                        <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter italic">{t("행사 의견 바로 남기기", "Feedback", "即刻留言")}</h3>
                        <p className="text-sm md:text-lg text-gray-400 font-bold">{t("여러분의 의견으로 더 나은 마을을 만듭니다.", "Help us build a better village.", "您的意见将共建更美好的村庄。")}</p>
                    </div>
                  </div>

                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={onFormSubmit}>
                    <div className="space-y-2">
                      <label htmlFor="user-name" className="text-[11px] font-black text-gray-400 ml-2 uppercase tracking-widest">{t("이름", "Name", "姓名")}</label>
                      <input id="user-name" name="name" required type="text" placeholder={t("성함을 입력하세요", "Your name", "请输入姓名")} className="w-full bg-gray-50 border-none rounded-2xl p-5 text-lg font-bold focus:ring-4 focus:ring-pink-100 shadow-inner" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="user-phone" className="text-[11px] font-black text-gray-400 ml-2 uppercase tracking-widest">{t("연락처", "Phone", "电话")}</label>
                      <input id="user-phone" name="phone" required type="tel" placeholder={t("전화번호를 입력하세요", "Phone number", "请输入电话号码")} className="w-full bg-gray-50 border-none rounded-2xl p-5 text-lg font-bold focus:ring-4 focus:ring-pink-100 shadow-inner" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label htmlFor="user-message" className="text-[11px] font-black text-gray-400 ml-2 uppercase tracking-widest">{t("의견", "Feedback", "内容")}</label>
                      <textarea id="user-message" name="message" required rows={4} placeholder={t("축제에 대한 소중한 한마디를 남겨주세요.", "Leave your words here.", "请留下您对庆典의宝贵意见。")} className="w-full bg-gray-50 border-none rounded-[2rem] p-7 text-lg font-bold focus:ring-4 focus:ring-pink-100 resize-none shadow-inner"></textarea>
                    </div>
                    <div className="md:col-span-2 mt-4">
                      <button disabled={isSubmitting} className="w-full bg-gray-900 text-white py-6 md:py-9 rounded-[2.5rem] text-xl md:text-3xl font-black shadow-2xl hover:bg-[#e91e63] transition-all flex items-center justify-center gap-4 disabled:bg-gray-400">
                        {isSubmitting ? (
                          <><Loader2 className="animate-spin" size={28} /> {t("제출 중...", "Submitting...", "提交中...")}</>
                        ) : (
                          <>{t("의견 제출하기", "Submit", "提交")} <ArrowRight size={28} /></>
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
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
        <div className="max-w-2xl text-left">
          <h2 className="text-4xl md:text-7xl font-black text-gray-900 mb-4 tracking-tighter italic">{t("부스안내", "Booth Guide", "展位指南")}</h2>
          <p className="text-lg md:text-xl text-gray-500 font-bold italic">{t("미관광장에 준비된 테마별 체험과 서비스를 만나보세요.", "Explore themed experiences.", "在广场体验各种主题活动吧。")}</p>
        </div>
      </div>

      <div className="mb-20">
         <button onClick={() => setIsMapExpanded(true)} className="w-full relative cursor-zoom-in group bg-white rounded-[3rem] p-6 border-4 border-white shadow-2xl overflow-hidden aspect-[16/9] flex items-center justify-center" aria-label={t("지도 크게 보기", "Expand Map", "放大地图")}>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-blue-50/50 -z-10" aria-hidden="true"></div>
            <div className="relative w-full h-full border-4 border-dashed border-gray-100 rounded-[2rem] flex flex-col items-center justify-center gap-6">
                <div className="flex gap-4 font-black" aria-hidden="true">
                   <div className="w-24 h-24 bg-[#e91e63] rounded-3xl flex items-center justify-center text-white shadow-xl rotate-3">🚩 {t("본부", "HQ", "总部")}</div>
                   <div className="w-24 h-24 bg-gray-900 rounded-3xl flex items-center justify-center text-white shadow-xl -rotate-2">🎤 {t("무대", "Stage", "舞台")}</div>
                </div>
                <div className="bg-white/80 backdrop-blur-md px-8 py-4 rounded-full border border-pink-100 font-black text-pink-600 flex items-center gap-2 shadow-sm group-hover:scale-110 transition-transform">
                   <Maximize2 size={20} /> {t("지도를 크게 보려면 클릭하세요", "Click to expand", "点击查看放大地图")}
                </div>
            </div>
         </button>
      </div>

      <div>
         <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label={t("카테고리 필터", "Category Filter", "类别筛选")}>
            {categories.map(c => (
               <button 
                 key={c.ko} 
                 role="tab"
                 aria-selected={filter === c.ko}
                 onClick={() => setFilter(c.ko)} 
                 className={`px-6 py-3 rounded-2xl text-sm font-black transition-all ${filter === c.ko ? 'bg-gray-900 text-white shadow-lg' : 'bg-white border-2 border-gray-100 text-gray-400 hover:border-pink-200'}`}
               >
                 {t(c.ko, c.en, c.zh)}
               </button>
            ))}
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
            {filteredBooths.map((booth) => (
               <div key={booth.id} role="listitem" className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center gap-6 hover:border-pink-200 hover:-translate-y-1 transition-all shadow-sm group">
                  <div className={`w-14 h-14 flex-shrink-0 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${categoryStyles[booth.category] || 'bg-gray-100 text-gray-400'}`} aria-hidden="true">
                    {booth.id}
                  </div>
                  <div className="flex flex-col text-left">
                     <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{t(booth.category, booth.category, booth.category)}</span>
                     <h4 className="text-lg md:text-xl font-black text-gray-900 group-hover:text-pink-600 transition-colors break-keep">{t(booth.name, booth.nameEn, booth.nameZh)}</h4>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {isMapExpanded && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
           <button className="absolute top-8 right-8 text-white" onClick={() => setIsMapExpanded(false)} aria-label={t("닫기", "Close", "关闭")}><X size={48} /></button>
           <div className="max-w-7xl w-full aspect-[16/9] bg-white rounded-[2rem] md:rounded-[4rem] p-10 md:p-20 relative overflow-hidden flex flex-col items-center justify-center text-center">
              <h3 className="text-4xl md:text-6xl font-black text-gray-900 mb-10 tracking-tighter italic">{t("무장애 마을 축제 공간 배치도", "Barrier-Free Site Map", "无障碍村庄庆典空间分布图")}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl" aria-hidden="true">
                 <div className="flex flex-col items-center gap-4"><div className="w-20 h-20 bg-[#e91e63] rounded-3xl flex items-center justify-center text-3xl">🚩</div><span className="font-black text-xl">{t("운영본부", "HQ", "总部")}</span></div>
                 <div className="flex flex-col items-center gap-4"><div className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center text-3xl">🚽</div><span className="font-black text-xl">{t("화장실", "Restroom", "洗手间")}</span></div>
                 <div className="flex flex-col items-center gap-4"><div className="w-20 h-20 bg-rose-500 rounded-3xl flex items-center justify-center text-3xl">🏥</div><span className="font-black text-xl">{t("의료지원처", "Medical", "医疗站")}</span></div>
                 <div className="flex flex-col items-center gap-4"><div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-3xl">🚐</div><span className="font-black text-xl">{t("셔틀 정류장", "Shuttle", "班车站")}</span></div>
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
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 animate-in fade-in duration-500">
      <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-10 text-center italic">{t("공연시간표", "Time Table", "节目时间表")}</h2>
      <div className="bg-white border-2 border-gray-100 rounded-[2rem] overflow-hidden shadow-sm" role="table">
        <div className="grid grid-cols-3 bg-gray-900 text-white py-4 px-6 font-black text-xs md:text-sm text-center" role="rowgroup">
           <div className="col-span-1 border-r border-white/10" role="columnheader">{t("시간", "Time", "时间")}</div>
           <div className="col-span-2" role="columnheader">{t("프로그램명", "Program", "项目名称")}</div>
        </div>
        <div className="divide-y-2 divide-gray-50" role="rowgroup">
          {PERFORMANCES.map((perf, idx) => (
            <div key={idx} className="grid grid-cols-3 py-4 md:py-5 px-6 items-center text-center hover:bg-pink-50/50 transition-colors" role="row">
              <div className="col-span-1 font-black text-pink-600 text-xs md:text-xl italic border-r border-gray-100" role="cell">{perf.time.split(' - ')[0]}</div>
              <div className="col-span-2 text-sm md:text-2xl font-black text-gray-800 tracking-tight break-keep pl-4" role="cell">{t(perf.title, perf.titleEn, perf.titleZh)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TransportSection: React.FC<{ lang: string }> = ({ lang }) => {
  const t = (ko: string, en: string, zh: string) => lang === 'EN' ? en : lang === 'ZH' ? zh : ko;
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 animate-in fade-in duration-500 text-left">
      <h2 className="text-4xl md:text-8xl font-black text-gray-900 mb-16 tracking-tighter italic">{t("이동편의 노선", "Transport", "交通路线")}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
        <div className="space-y-12">
            <h3 className="text-2xl md:text-4xl font-black italic flex items-center gap-3"><Bus size={32} className="text-pink-600" aria-hidden="true" /> {t("무료 셔틀버스 노선", "Free Shuttle", "免费班车路线")}</h3>
            <div className="space-y-10">
              {BUS_ROUTES.map(route => (
                <div key={route.id} className="relative pl-10 md:pl-12">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-pink-100 rounded-full" aria-hidden="true"></div>
                    <div className="flex items-center gap-4 mb-6">
                      <h4 className="text-xl md:text-3xl font-black text-gray-900 italic">{t(route.name, route.nameEn, route.nameZh)}</h4>
                      <span className="px-4 py-1.5 bg-gray-900 text-white rounded-full text-xs font-black">{t(route.intervals, route.intervalsEn, route.intervalsZh)}</span>
                    </div>
                    <div className="space-y-4">
                      {(lang === 'KO' ? route.stops : lang === 'EN' ? route.stopsEn : route.stopsZh).map((stop, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${i === (route.stops.length - 1) ? 'bg-pink-600 scale-125' : 'bg-gray-200'}`} aria-hidden="true"></div>
                          <span className={`text-lg md:text-2xl font-black ${i === (route.stops.length - 1) ? 'text-gray-900' : 'text-gray-400'}`}>{stop}</span>
                        </div>
                      ))}
                    </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

const ParkingSection: React.FC<{ lang: string }> = ({ lang }) => {
  const t = (ko: string, en: string, zh: string) => lang === 'EN' ? en : lang === 'ZH' ? zh : ko;
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 animate-in fade-in duration-500 text-left">
      <div className="max-w-3xl mb-16">
        <h2 className="text-4xl md:text-8xl font-black text-gray-900 mb-6 tracking-tighter italic">{t("주차장 안내", "Parking", "停车场指南")}</h2>
        <p className="text-lg md:text-2xl text-gray-500 font-bold italic">{t("축제장 주변 주차 공간을 확인하세요. 가급적 대중교통 이용을 권장합니다.", "Check available parking spots.", "请确认庆典会场周边的停车空间。")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {PARKING_LOCATIONS.map(park => (
          <div key={park.id} className="bg-white rounded-[3rem] border border-gray-100 p-8 md:p-10 shadow-sm flex flex-col hover:border-pink-300 transition-all group">
            <div className="w-14 h-14 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-pink-600 group-hover:text-white transition-colors" aria-hidden="true">
              <Car size={32} />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 tracking-tighter break-keep leading-tight min-h-[3rem] flex items-center">{t(park.name, park.nameEn, park.nameZh)}</h3>
            <div className="space-y-4 mb-10 flex-grow">
              <div className="bg-gray-50 p-6 rounded-2xl">
                <span className="text-[10px] font-black text-pink-400 uppercase tracking-widest block mb-2">{t("주소", "Address", "地址")}</span>
                <p className="font-bold text-gray-800 text-sm md:text-lg leading-snug">{t(park.address, park.addressEn, park.addressZh)}</p>
              </div>
            </div>
            <a 
              href={park.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`${t(park.name, park.nameEn, park.nameZh)} ${t("네이버 지도에서 보기", "View in Naver Map", "在Naver地图中查看")}`}
              className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-[#03C75A] transition-all shadow-lg shadow-gray-100"
            >
              {t("네이버 지도 보기", "Naver Map", "Naver地图")} <ExternalLink size={20} />
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
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 animate-in fade-in duration-500 text-center">
      <h2 className="text-4xl md:text-8xl font-black text-gray-900 mb-16 italic decoration-pink-100 underline">{t("문의사항", "Inquiries", "咨询事项")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 text-left">
        {CONTACTS.map((contact, i) => (
          <div key={i} className="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm group hover:border-pink-300 transition-all">
            <span className="text-[10px] font-black text-pink-400 uppercase tracking-widest block mb-2">{t(contact.role, contact.roleEn, contact.roleZh)}</span>
            <h4 className="text-2xl font-black text-gray-900 mb-4">{t(contact.name, contact.nameEn, contact.nameZh)}</h4>
            <a href={`tel:${contact.phone}`} className="text-2xl font-black text-pink-600 hover:underline">{contact.phone}</a>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center pt-24 border-t-2 border-pink-50">
        <h4 className="text-2xl md:text-3xl font-black text-gray-900 mb-12 tracking-tight">
          {t("복지관 사이트 둘러보기", "Browse Welfare Center Sites", "浏览福利馆网站")}
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-4xl px-4">
          <a href={SOCIAL_LINKS.website} target="_blank" rel="noopener noreferrer" 
             className="flex flex-col items-center gap-4 p-8 bg-white border border-gray-100 rounded-[2.5rem] hover:border-pink-400 hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all transform group-hover:-rotate-6" aria-hidden="true">
              <Globe size={32} />
            </div>
            <span className="font-black text-gray-800 text-sm md:text-base">{t("홈페이지", "Home", "官网")}</span>
          </a>
          
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" 
             className="flex flex-col items-center gap-4 p-8 bg-white border border-gray-100 rounded-[2.5rem] hover:border-pink-400 hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all transform group-hover:rotate-6" aria-hidden="true">
              <Instagram size={32} />
            </div>
            <span className="font-black text-gray-800 text-sm md:text-base">{t("인스타그램", "Instagram", "照片墙")}</span>
          </a>

          <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" 
             className="flex flex-col items-center gap-4 p-8 bg-white border border-gray-100 rounded-[2.5rem] hover:border-pink-400 hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all transform group-hover:-rotate-12" aria-hidden="true">
              <Youtube size={32} />
            </div>
            <span className="font-black text-gray-800 text-sm md:text-base">{t("유튜브", "YouTube", "油管")}</span>
          </a>

          <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" 
             className="flex flex-col items-center gap-4 p-8 bg-white border border-gray-100 rounded-[2.5rem] hover:border-pink-400 hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all transform group-hover:rotate-12" aria-hidden="true">
              <Facebook size={32} />
            </div>
            <span className="font-black text-gray-800 text-sm md:text-base">{t("페이스북", "Facebook", "脸书")}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
