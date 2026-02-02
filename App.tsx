
import React, { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, Clock, Info, 
  Music, LayoutGrid, Bus, Phone, 
  Menu, X, ClipboardList, 
  Sparkles, Star, Mic2, Car, Accessibility,
  Heart, Map as MapIcon, Gift, ArrowRight,
  ChevronRight, Share2, ShieldCheck,
  Instagram, Youtube, Facebook, Globe,
  Settings, Save, Palette, Type, Send,
  Download, Eye, CheckCircle2, Search, Maximize2,
  Languages
} from 'lucide-react';
import { 
  FESTIVAL_NAME, FESTIVAL_NAME_EN, 
  FESTIVAL_SUBTITLE, FESTIVAL_SUBTITLE_EN, 
  FESTIVAL_DATE, FESTIVAL_DATE_EN, 
  FESTIVAL_TIME, FESTIVAL_TIME_EN, 
  FESTIVAL_PLACE, FESTIVAL_PLACE_EN, 
  PERFORMANCES, 
  BOOTHS, BUS_ROUTES, CONTACTS, SOCIAL_LINKS
} from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [lang, setLang] = useState<'KO' | 'EN'>('KO');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const t = (ko: string, en: string) => (lang === 'KO' ? ko : en);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitSuccess(true);
  };

  const NavItem = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => (
    <button
      onClick={() => { setActiveTab(id); setIsMenuOpen(false); window.scrollTo(0, 0); }}
      className={`relative flex flex-col items-center justify-center space-y-1 px-4 py-2 transition-all duration-300 ${
        activeTab === id ? 'text-pink-600 font-bold' : 'text-gray-400 hover:text-pink-400'
      }`}
    >
      <Icon size={24} className={activeTab === id ? 'scale-110' : ''} />
      <span className="text-[10px] sm:text-xs font-bold tracking-tight whitespace-nowrap">{label}</span>
      {activeTab === id && (
        <span className="absolute -bottom-1 w-1 h-1 bg-pink-600 rounded-full animate-ping"></span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0 bg-[#fffbfc] selection:bg-pink-100 selection:text-pink-600">
      {/* 헤더 */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-xl shadow-md py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => { setActiveTab('home'); setIsAdminMode(false); }}
          >
            <div className="bg-gradient-to-br from-pink-500 to-rose-400 p-2 rounded-2xl text-white shadow-lg shadow-pink-200 group-hover:rotate-12 transition-transform">
              <Sparkles size={24} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-black text-gray-900 leading-none tracking-tighter break-keep">
                {t(FESTIVAL_NAME, "A barrier-free village festival")}
              </h1>
              {lang === 'KO' && (
                <span className="text-[9px] font-black text-pink-400 mt-1 uppercase tracking-widest">
                  무장애 마을 축제
                </span>
              )}
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <NavItem id="home" label={t("홈", "Home")} icon={Info} />
            <NavItem id="schedule" label={t("공연", "Performances")} icon={Music} />
            <NavItem id="booth_map" label={t("부스", "Booths")} icon={MapIcon} />
            <NavItem id="transport" label={t("이동편의", "Transport")} icon={Bus} />
            <NavItem id="contact" label={t("문의", "Contact")} icon={Phone} />
            
            <div className="h-6 w-px bg-gray-100 mx-3"></div>
            
            <button 
              onClick={() => setLang(lang === 'KO' ? 'EN' : 'KO')}
              className="px-4 py-2 bg-pink-50 text-pink-600 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-pink-100 transition-colors border border-pink-100"
            >
              <Languages size={16} /> {lang === 'KO' ? 'EN' : '한글'}
            </button>

            <button 
              onClick={() => { setActiveTab('home'); setTimeout(() => {
                document.getElementById('feedback-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 100); }}
              className="bg-gray-900 text-white px-5 py-2.5 rounded-2xl text-sm font-black flex items-center gap-2 hover:bg-pink-600 transition-all shadow-xl shadow-gray-100 ml-2"
            >
              {t("의견 남기기", "Feedback")} <ClipboardList size={16} />
            </button>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <button 
              onClick={() => setLang(lang === 'KO' ? 'EN' : 'KO')}
              className="px-3 py-1.5 bg-pink-50 text-pink-600 rounded-lg text-xs font-black border border-pink-100"
            >
              {lang === 'KO' ? 'EN' : '한글'}
            </button>
            <button className="p-2 text-pink-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[72px] bg-white z-40 animate-in slide-in-from-right overflow-y-auto">
             <div className="flex flex-col p-8 space-y-6">
                {[
                  { id: 'home', label: t('메인 홈', 'Main Home') },
                  { id: 'schedule', label: t('공연 일정', 'Schedule') },
                  { id: 'booth_map', label: t('부스 안내', 'Booths') },
                  { id: 'transport', label: t('이동편의 노선', 'Transport') },
                  { id: 'contact', label: t('문의 안내', 'Contact') }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
                    className={`text-4xl font-black text-left flex items-center justify-between break-keep ${activeTab === item.id ? 'text-pink-600' : 'text-gray-200'}`}
                  >
                    {item.label}
                    <ChevronRight size={32} />
                  </button>
                ))}
                <div className="pt-8 border-t border-gray-100">
                   <button 
                    onClick={() => { setActiveTab('home'); setIsMenuOpen(false); setTimeout(() => {
                      document.getElementById('feedback-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 300); }}
                    className="w-full bg-pink-600 text-white p-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-2xl shadow-pink-100"
                   >
                     {t("의견 남기기", "Feedback")} <Send />
                   </button>
                </div>
             </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {isAdminMode ? (
          <AdminDashboard lang={lang} close={() => setIsAdminMode(false)} />
        ) : (
          <>
            {activeTab === 'home' && <HomeSection lang={lang} onFormSubmit={handleFormSubmit} />}
            {activeTab === 'schedule' && <ScheduleSection lang={lang} />}
            {activeTab === 'booth_map' && <BoothMapSection lang={lang} />}
            {activeTab === 'transport' && <TransportSection lang={lang} />}
            {activeTab === 'contact' && <ContactSection lang={lang} />}
          </>
        )}
      </main>

      {isSubmitSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] p-10 md:p-16 max-w-sm w-full shadow-2xl text-center transform animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4 break-keep">
              {t("제출이 완료되었습니다!", "Submission Complete!")}
            </h3>
            <p className="text-gray-500 font-bold mb-10 break-keep">
              {t("소중한 의견 감사합니다. 더 나은 축제로 보답하겠습니다.", "Thank you for your feedback.")}
            </p>
            <button 
              onClick={() => setIsSubmitSuccess(false)}
              className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-pink-600 transition-colors shadow-xl"
            >
              {t("확인", "Confirm")}
            </button>
          </div>
        </div>
      )}

      {/* 글로벌 푸터 */}
      <footer className="bg-gray-100 py-12 text-center border-t border-gray-200">
        <p className="text-indigo-600 font-black italic text-lg uppercase tracking-widest px-6">
          {t("누구도 배제되지 않는 마을", "No one is left behind")}
        </p>
      </footer>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-pink-50 flex justify-around py-3 px-6 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <NavItem id="home" label={t("홈", "Home")} icon={Info} />
        <NavItem id="schedule" label={t("공연", "Show")} icon={Music} />
        <NavItem id="booth_map" label={t("부스", "Booths")} icon={MapIcon} />
        <NavItem id="transport" label={t("이동", "Move")} icon={Bus} />
        <NavItem id="contact" label={t("문의", "Ask")} icon={Phone} />
      </nav>
    </div>
  );
};

const HomeSection: React.FC<{ lang: string, onFormSubmit: (e: React.FormEvent) => void }> = ({ lang, onFormSubmit }) => {
  const t = (ko: string, en: string) => (lang === 'KO' ? ko : en);
  return (
    <div className="animate-in fade-in duration-1000">
      <div className="relative pt-16 md:pt-24 pb-24 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-200/30 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100/30 blur-[120px] rounded-full -z-10"></div>

        <div className="max-w-5xl mx-auto text-center">
          <div className="flex flex-col items-center mb-8">
            <span className="text-pink-500 font-black text-lg md:text-2xl uppercase tracking-[0.4em] mb-4">
              {t("제4회 무장애마을축제", "The 4th")}
            </span>
            <h1 className={`font-black text-[#e91e63] leading-[1.05] md:leading-[0.8] tracking-tighter mb-8 break-keep drop-shadow-lg ${lang === 'KO' ? 'text-7xl md:text-[11rem]' : 'text-5xl md:text-7xl md:px-20 capitalize'}`}>
              {lang === 'KO' ? (
                <>{t("함께봄", "")}<br className="md:hidden"/> {t("가치봄", "")}</>
              ) : (
                "A barrier-free village festival"
              )}
            </h1>
          </div>
          
          <p className={`text-xl md:text-3xl font-bold mb-10 tracking-tight max-w-3xl mx-auto leading-tight break-keep italic ${lang === 'KO' ? 'text-gray-400' : 'text-indigo-600'}`}>
            "{t(FESTIVAL_SUBTITLE, FESTIVAL_SUBTITLE_EN)}"
          </p>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-left mb-16 md:mb-24 px-4">
            <div className="flex items-center gap-4 md:gap-6 group">
                <div className="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all"><Calendar size={22} /></div>
                <div>
                  <div className="text-[10px] font-black text-pink-400 uppercase tracking-widest mb-0.5">{t("일정", "Date")}</div>
                  <div className="text-base md:text-xl font-black text-gray-800 break-keep">{t(FESTIVAL_DATE, FESTIVAL_DATE_EN)}</div>
                  <div className="text-xs md:text-sm font-bold text-gray-400">{t(FESTIVAL_TIME, FESTIVAL_TIME_EN)}</div>
                </div>
            </div>
            <div className="flex items-center gap-4 md:gap-6 group">
                <div className="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all"><MapPin size={22} /></div>
                <div>
                  <div className="text-[10px] font-black text-pink-400 uppercase tracking-widest mb-0.5">{t("장소", "Location")}</div>
                  <div className="text-base md:text-xl font-black text-gray-800 break-keep">{t(FESTIVAL_PLACE, FESTIVAL_PLACE_EN)}</div>
                  <div className="text-xs md:text-sm font-bold text-gray-400">{t("세계로마트 건너편", "Across from Segyero Mart")}</div>
                </div>
            </div>
          </div>

          <section id="feedback-section" className="max-w-4xl mx-auto mb-20 md:mb-24 scroll-mt-24">
            <div className="bg-white rounded-[3.5rem] md:rounded-[4.5rem] border border-gray-100 p-8 md:p-16 shadow-2xl shadow-pink-100 relative overflow-hidden group text-left">
                <div className="absolute top-0 right-0 p-8 text-pink-50/20 group-hover:scale-125 transition-transform duration-700 hidden md:block"><ClipboardList size={220} /></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 bg-[#e91e63] text-white rounded-[1.5rem] flex items-center justify-center shadow-lg"><Send size={32} /></div>
                    <div>
                        <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter italic">
                          {t("행사 의견 바로 남기기", "Feedback")}
                        </h3>
                        <p className="text-sm md:text-lg text-gray-400 font-bold">
                          {t("여러분의 의견으로 더 나은 마을을 만듭니다.", "Help us build a better village.")}
                        </p>
                    </div>
                  </div>

                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" onSubmit={onFormSubmit}>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 ml-2 uppercase tracking-widest">{t("이름", "Name")}</label>
                        <input required type="text" placeholder={t("성함을 입력하세요", "Your name")} className="w-full bg-gray-50 border-none rounded-2xl p-5 md:p-7 text-base md:text-lg font-bold focus:ring-4 focus:ring-pink-100 transition-all shadow-inner" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 ml-2 uppercase tracking-widest">{t("연락처", "Phone")}</label>
                        <input required type="tel" placeholder={t("전화번호를 입력하세요", "Phone number")} className="w-full bg-gray-50 border-none rounded-2xl p-5 md:p-7 text-base md:text-lg font-bold focus:ring-4 focus:ring-pink-100 transition-all shadow-inner" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[11px] font-black text-gray-400 ml-2 uppercase tracking-widest">{t("의견", "Feedback")}</label>
                        <textarea required rows={4} placeholder={t("축제에 대한 소중한 한마디를 남겨주세요.", "Leave your words here.")} className="w-full bg-gray-50 border-none rounded-[2rem] p-7 md:p-10 text-base md:text-lg font-bold focus:ring-4 focus:ring-pink-100 transition-all resize-none shadow-inner"></textarea>
                    </div>
                    <div className="md:col-span-2 mt-4">
                        <button className="w-full bg-gray-900 text-white py-6 md:py-9 rounded-[2.5rem] text-xl md:text-3xl font-black shadow-2xl hover:bg-[#e91e63] transition-all flex items-center justify-center gap-4">
                          {t("의견 제출하기", "Submit")} <ArrowRight size={28} />
                        </button>
                    </div>
                  </form>
                </div>
            </div>
          </section>

          <div className="pt-12 text-center border-t border-gray-100/50">
            <p className="text-sm md:text-xl font-black text-gray-400 italic break-keep leading-relaxed">
              {t("시흥장애인종합복지관", "Siheung Welfare Center for the Disabled")} <span className="text-pink-400">031-431-9114</span><br/>
              {t("(정왕대로 233번길 27-1)", "(27-1, Jeongwang-daero 233beon-gil)")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const BoothMapSection: React.FC<{ lang: string }> = ({ lang }) => {
  const [filter, setFilter] = useState('전체');
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const t = (ko: string, en: string) => (lang === 'KO' ? ko : en);
  
  const categories = [
    { ko: '전체', en: 'All' },
    { ko: '놀이체험', en: 'Fun' },
    { ko: '장애인식개선', en: 'Awareness' },
    { ko: '다문화', en: 'Culture' },
    { ko: '환경', en: 'Eco' },
    { ko: '운영', en: 'Operations' }
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
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-7xl font-black text-gray-900 mb-4 tracking-tighter italic">
            {t("부스안내", "Booth Guide")}
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-bold italic">
            {t("미관광장에 준비된 테마별 체험과 서비스를 만나보세요.", "Explore themed experiences at the square.")}
          </p>
        </div>
      </div>

      <div className="mb-20">
         <div onClick={() => setIsMapExpanded(true)} className="relative cursor-zoom-in group bg-white rounded-[3rem] p-6 border-4 border-white shadow-2xl overflow-hidden aspect-[16/9] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-blue-50/50 -z-10"></div>
            <div className="relative w-full h-full border-4 border-dashed border-gray-100 rounded-[2rem] flex flex-col items-center justify-center gap-6">
                <div className="flex gap-4 font-black">
                   <div className="w-24 h-24 bg-[#e91e63] rounded-3xl flex items-center justify-center text-white shadow-xl rotate-3">{t("🚩 본부", "🚩 HQ")}</div>
                   <div className="w-24 h-24 bg-gray-900 rounded-3xl flex items-center justify-center text-white shadow-xl -rotate-2">{t("🎤 무대", "🎤 Stage")}</div>
                </div>
                <div className="bg-white/80 backdrop-blur-md px-8 py-4 rounded-full border border-pink-100 font-black text-pink-600 flex items-center gap-2 shadow-sm group-hover:scale-110 transition-transform">
                   <Maximize2 size={20} /> {t("지도를 크게 보려면 클릭하세요", "Click for map")}
                </div>
                <div className="absolute bottom-10 left-10 text-xl font-black">{t("🚐 셔틀", "🚐 Shuttle")}</div>
            </div>
         </div>
      </div>

      <div>
         <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(c => (
               <button 
                 key={c.ko} 
                 onClick={() => setFilter(c.ko)} 
                 className={`px-6 py-3 rounded-2xl text-sm font-black transition-all ${filter === c.ko ? 'bg-gray-900 text-white shadow-lg' : 'bg-white border-2 border-gray-100 text-gray-400 hover:border-pink-200'}`}
               >
                 {t(c.ko, c.en)}
               </button>
            ))}
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBooths.map((booth) => (
               <div key={booth.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center gap-6 hover:border-pink-200 hover:-translate-y-1 transition-all shadow-sm group">
                  <div className={`w-14 h-14 flex-shrink-0 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${categoryStyles[booth.category] || 'bg-gray-100 text-gray-400'}`}>
                    {booth.id}
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                       {booth.category}
                     </span>
                     <h4 className="text-lg md:text-xl font-black text-gray-900 group-hover:text-pink-600 transition-colors break-keep">
                       {t(booth.name, booth.nameEn)}
                     </h4>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {isMapExpanded && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300" onClick={() => setIsMapExpanded(false)}>
           <button className="absolute top-8 right-8 text-white"><X size={48} /></button>
           <div className="max-w-7xl w-full aspect-[16/9] bg-white rounded-[2rem] md:rounded-[4rem] p-10 md:p-20 relative overflow-hidden flex flex-col items-center justify-center text-center">
              <h3 className="text-4xl md:text-6xl font-black text-gray-900 mb-10 tracking-tighter italic">
                {t("무장애 마을 축제 공간 배치도", "Barrier-Free Site Map")}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl">
                 <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-[#e91e63] rounded-3xl flex items-center justify-center text-3xl shadow-xl">🚩</div>
                    <span className="font-black text-xl">{t("운영본부", "HQ")}</span>
                 </div>
                 <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center text-3xl shadow-xl">🚽</div>
                    <span className="font-black text-xl">{t("화장실", "Restroom")}</span>
                 </div>
                 <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-rose-500 rounded-3xl flex items-center justify-center text-3xl shadow-xl">🏥</div>
                    <span className="font-black text-xl">{t("의료지원처", "Medical")}</span>
                 </div>
                 <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-3xl shadow-xl">🚐</div>
                    <span className="font-black text-xl">{t("셔틀 정류장", "Shuttle")}</span>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const TransportSection: React.FC<{ lang: string }> = ({ lang }) => {
  const t = (ko: string, en: string) => (lang === 'KO' ? ko : en);
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 md:mb-24">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-8xl font-black text-gray-900 mb-6 tracking-tighter italic">
            {t("이동편의 노선", "Transport")}
          </h2>
          <p className="text-lg md:text-2xl text-gray-400 font-bold italic break-keep leading-tight">
            {t("축제장까지 안전하고 편리하게 오실 수 있는 정보를 안내합니다.", "Transportation information to the site.")}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 mb-24">
        <div className="space-y-12">
            <h3 className="text-2xl md:text-4xl font-black italic flex items-center gap-3">
              <Bus size={32} className="text-pink-600" /> {t("무료 셔틀버스 노선", "Free Shuttle")}
            </h3>
            <div className="space-y-10">
              {BUS_ROUTES.map(route => (
                <div key={route.id} className="relative pl-10 md:pl-12">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-pink-100 rounded-full"></div>
                    <div className="flex items-center gap-4 mb-6">
                      <h4 className="text-xl md:text-3xl font-black text-gray-900 italic">{t(route.name, route.nameEn)}</h4>
                      <span className="px-4 py-1.5 bg-gray-900 text-white rounded-full text-xs font-black">{t(route.intervals, route.intervalsEn)}</span>
                    </div>
                    <div className="space-y-6">
                      {(lang === 'KO' ? route.stops : route.stopsEn).map((stop, i) => (
                        <div key={i} className="flex items-center gap-6 group">
                            <div className={`w-4 h-4 rounded-full border-4 ${i === (route.stops.length - 1) ? 'border-pink-600 bg-pink-600 scale-150 ring-8 ring-pink-50' : 'border-gray-200 bg-white'}`}></div>
                            <span className={`text-lg md:text-2xl font-black ${i === (route.stops.length - 1) ? 'text-gray-900' : 'text-gray-400'}`}>{stop}</span>
                        </div>
                      ))}
                    </div>
                </div>
              ))}
            </div>
        </div>
        <div className="space-y-12">
            <h3 className="text-2xl md:text-4xl font-black italic flex items-center gap-3">
              <Car size={32} className="text-pink-600" /> {t("주차 및 보행 안내", "Parking")}
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-gray-100 shadow-sm flex items-start gap-8">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0"><Car size={28} /></div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-black mb-2 italic">{t("장애인 전용 주차구역", "Disabled Parking")}</h4>
                    <p className="text-gray-400 font-bold break-keep">{t("지하주차장 내 전용 구역 확보.", "Dedicated parking spots available.")}</p>
                  </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const ScheduleSection: React.FC<{ lang: string }> = ({ lang }) => {
  const t = (ko: string, en: string) => (lang === 'KO' ? ko : en);
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 animate-in fade-in duration-500">
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tighter italic break-keep">
          {t("공연시간표", "Time Table")}
        </h2>
      </div>
      
      <div className="bg-white border-2 border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="grid grid-cols-3 bg-gray-900 text-white py-4 px-6 font-black text-xs md:text-sm uppercase tracking-widest text-center">
           <div className="col-span-1 border-r border-white/10">{t("시간", "Time")}</div>
           <div className="col-span-2">{t("프로그램명", "Program")}</div>
        </div>
        <div className="divide-y-2 divide-gray-50">
          {PERFORMANCES.map((perf, idx) => (
            <div key={idx} className="grid grid-cols-3 py-4 md:py-5 px-6 items-center text-center hover:bg-pink-50/50 transition-colors">
              <div className="col-span-1 font-black text-pink-600 text-xs md:text-xl italic border-r border-gray-100">
                {perf.time.split(' - ')[0]}
              </div>
              <div className="col-span-2 text-sm md:text-2xl font-black text-gray-800 tracking-tight break-keep pl-4">
                {t(perf.title, perf.titleEn)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-8 text-center text-xs md:text-sm font-bold text-gray-300 italic">
        {t("※ 현장 상황에 따라 일정이 변경될 수 있습니다.", "* Schedule may change.")}
      </p>
    </div>
  );
};

const ContactSection: React.FC<{ lang: string }> = ({ lang }) => {
  const t = (ko: string, en: string) => (lang === 'KO' ? ko : en);
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 animate-in fade-in duration-500">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-4xl md:text-8xl font-black text-gray-900 mb-6 md:mb-8 tracking-tighter italic underline decoration-pink-100">
          {t("문의사항", "Inquiries")}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
        {CONTACTS.map((contact, i) => (
          <div key={i} className="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 flex flex-col justify-between group hover:border-pink-300 transition-all hover:shadow-xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all">
                <Phone size={28} />
              </div>
              <div>
                <span className="text-[10px] font-black text-pink-400 uppercase tracking-widest block">{t(contact.role, contact.roleEn)}</span>
                <h4 className="text-2xl font-black text-gray-900">{t(contact.name, contact.nameEn)}</h4>
              </div>
            </div>
            <a href={`tel:${contact.phone}`} className="text-2xl font-black text-gray-900 block group-hover:text-pink-600 transition-colors tracking-tighter">{contact.phone}</a>
          </div>
        ))}
      </div>

      {/* 소셜 링크 하단 배치 및 구체적인 라벨 추가 */}
      <div className="flex flex-col items-center pt-24 border-t-2 border-pink-50">
        <h4 className="text-2xl md:text-3xl font-black text-gray-900 mb-12 tracking-tight font-[Pretendard]">
          {t("복지관 사이트 둘러보기", "Explore Our Channels")}
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-4xl px-4">
          <a href={SOCIAL_LINKS.website} target="_blank" rel="noopener noreferrer" 
             className="flex flex-col items-center gap-4 p-8 bg-white border border-gray-100 rounded-[2.5rem] hover:border-pink-400 hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center group-hover:bg-[#e91e63] group-hover:text-white transition-all transform group-hover:-rotate-6">
              <Globe size={32} />
            </div>
            <span className="font-black text-gray-800 text-sm md:text-base">{t("홈페이지", "Home")}</span>
          </a>
          
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" 
             className="flex flex-col items-center gap-4 p-8 bg-white border border-gray-100 rounded-[2.5rem] hover:border-pink-400 hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center group-hover:bg-[#e91e63] group-hover:text-white transition-all transform group-hover:rotate-6">
              <Instagram size={32} />
            </div>
            <span className="font-black text-gray-800 text-sm md:text-base">{t("인스타그램", "Instagram")}</span>
          </a>

          <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" 
             className="flex flex-col items-center gap-4 p-8 bg-white border border-gray-100 rounded-[2.5rem] hover:border-pink-400 hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center group-hover:bg-[#e91e63] group-hover:text-white transition-all transform group-hover:-rotate-12">
              <Youtube size={32} />
            </div>
            <span className="font-black text-gray-800 text-sm md:text-base">{t("유튜브", "YouTube")}</span>
          </a>

          <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" 
             className="flex flex-col items-center gap-4 p-8 bg-white border border-gray-100 rounded-[2.5rem] hover:border-pink-400 hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center group-hover:bg-[#e91e63] group-hover:text-white transition-all transform group-hover:rotate-12">
              <Facebook size={32} />
            </div>
            <span className="font-black text-gray-800 text-sm md:text-base">{t("페이스북", "Facebook")}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC<{ lang: string, close: () => void }> = ({ lang, close }) => (
  <div className="max-w-4xl mx-auto px-6 py-16 animate-in slide-in-from-bottom duration-500">
    <div className="flex items-center justify-between mb-12">
       <h2 className="text-3xl font-black text-gray-900 italic">Admin Settings</h2>
       <button onClick={close} className="p-4 bg-gray-100 rounded-2xl"><X /></button>
    </div>
    <div className="p-10 bg-white rounded-3xl border border-gray-100">
      <p className="font-bold text-gray-400 italic">Settings disabled.</p>
    </div>
  </div>
);

export default App;
