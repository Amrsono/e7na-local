import React, { useState } from 'react';
import { Bot, MessageSquare, X, Send, Sparkles, PhoneCall } from 'lucide-react';

export default function FloatingWidgets({ lang, onOpenRfq }) {
  const [aiOpen, setAiOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      textEn: "Salam! I am e7na's AI Brand & Export Advisor. Looking for Egyptian Cotton, Damietta Wood furniture, Fayoum ceramics, or local alternatives to Zara & IKEA?",
      textAr: "مرحباً بك! أنا مستشار إحنا الرقمي للبراندات والتصدير. هل تبحث عن قطن مصري، أثاث دمياطي، خزف الفيوم، أو بديل محلي لماركات عالمية؟"
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal;
    setMessages((prev) => [...prev, { sender: 'user', textEn: userText, textAr: userText }]);
    setInputVal('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          textEn: "Great query! I recommend checking 'Cottonique Giza Home' for 1000TC Egyptian Cotton or 'Damietta Crafts' for solid wood. You can also click 'Request RFQ' for wholesale export container rates!",
          textAr: "استفسار رائع! أرشح لك تصفح براند 'كوتونيك جيزة هوم' للقطن المصري أو 'صناع دمياط' للأثاث الزان. يمكنك أيضاً الضغط على 'طلب تسعيرة' لتلقي عروض الجملة."
        }
      ]);
    }, 600);
  };

  return (
    <>
      {/* Bottom Left WhatsApp Widget */}
      <a
        href="https://wa.me/201099887766?text=Hi%20e7na%20Digital%20Mall%20%E2%80%94%20I'd%20like%20to%20inquire%20about%20Egyptian%20brands%20export."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Export Desk WhatsApp"
        className="fixed bottom-6 left-6 z-40 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110 hover:opacity-90 border-2 border-white/20"
        style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
      >
        <svg width="30" height="30" viewBox="0 0 32 32" fill="#fff">
          <path d="M16.004 2.667c-7.36 0-13.333 5.973-13.333 13.333 0 2.351.616 4.652 1.787 6.681L2.667 29.333l6.84-1.793a13.27 13.27 0 0 0 6.497 1.655h.005c7.36 0 13.333-5.973 13.333-13.333 0-3.563-1.387-6.913-3.907-9.433-2.52-2.52-5.87-3.762-9.431-3.762zm0 24.146h-.004a11.03 11.03 0 0 1-5.62-1.539l-.403-.239-4.06 1.065 1.083-3.957-.262-.406a11.01 11.01 0 0 1-1.688-5.876c0-6.116 4.977-11.093 11.097-11.093 2.963 0 5.749 1.155 7.843 3.251a11.02 11.02 0 0 1 3.247 7.846c0 6.117-4.977 11.093-11.093 11.093z"></path>
        </svg>
      </a>

      {/* Bottom Right AI Assistant Widget */}
      <div className="fixed right-4 sm:right-6 z-40" style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}>
        {!aiOpen ? (
          <button
            onClick={() => setAiOpen(true)}
            className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full gmt-gradient-btn text-slate-950 font-black shadow-xl hover:scale-110 transition-transform relative group"
            aria-label="AI Brand Assistant"
          >
            <Bot className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
            </span>
          </button>
        ) : (
          <div className="w-[calc(100vw-3rem)] max-w-[340px] sm:max-w-[380px] h-[420px] sm:h-[450px] rounded-3xl gmt-panel border border-amber-400/40 shadow-2xl flex flex-col justify-between overflow-hidden bg-[color:var(--bg-surface)] animate-in slide-in-from-bottom duration-200">
            
            {/* AI Drawer Header */}
            <div className="p-4 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-sm">
                <Bot className="w-5 h-5" />
                <span>{lang === 'ar' ? 'مساعد إحنا الذكي للبراندات' : 'e7na AI Brand Advisor'}</span>
              </div>
              <button 
                onClick={() => setAiOpen(false)} 
                className="p-1 rounded-lg hover:bg-black/10 text-slate-950 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Conversation Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[82%] p-3 rounded-2xl ${
                      m.sender === 'user'
                        ? 'bg-amber-400 text-slate-950 font-bold rounded-br-none'
                        : 'bg-[color:var(--bg-surface-elevated)] border border-[color:var(--hairline)] text-[color:var(--ink)] rounded-bl-none leading-relaxed'
                    }`}
                  >
                    {lang === 'ar' ? m.textAr : m.textEn}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSend} className="p-3 border-t border-[color:var(--hairline)] bg-[color:var(--bg-overlay)] flex items-center gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={lang === 'ar' ? 'اسأل المساعد عن براند أو خامة مصرية...' : 'Ask AI about brands or Giza cotton...'}
                className="flex-1 p-2.5 rounded-xl bg-[color:var(--bg-surface-elevated)] border border-[color:var(--hairline)] text-xs text-[color:var(--ink)] outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}
      </div>
    </>
  );
}
