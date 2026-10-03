import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  X, 
  Eye, 
  EyeOff, 
  KeyRound, 
  Zap, 
  AlertCircle,
  Building2,
  Sparkles
} from 'lucide-react';
import { useMall } from '../context/MallContext';

export default function AdminLoginModal({ lang = 'en', onClose, onSuccess }) {
  const { loginAdmin } = useMall();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const res = loginAdmin(username, password);
      setIsLoading(false);
      if (res.success) {
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      } else {
        setErrorMsg(
          lang === 'ar' 
            ? 'بيانات الدخول غير صحيحة! يرجى التأكد من اسم المستخدم وكلمة المرور' 
            : res.error || 'Invalid credentials'
        );
      }
    }, 350);
  };

  const handleQuickFill = () => {
    setUsername('Admin');
    setPassword('Password@26');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl border border-cyan-500/30 bg-[#070c1a] p-6 sm:p-8 shadow-2xl relative overflow-hidden text-left rtl:text-right">
        
        {/* Neon Top Glowing Cyber Stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-amber-400 to-pink-500" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-md shadow-cyan-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 block">
              {lang === 'ar' ? 'بوابة الإدارة المركزية والتحكم' : 'E7NA LOCAL COMMAND CENTER'}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {lang === 'ar' ? 'نظام المصانع والتصدير' : 'Factory & Export Administration'}
            </span>
          </div>
        </div>

        <h3 className="text-2xl font-black text-white tracking-tight mt-1">
          {lang === 'ar' ? 'تسجيل دخول مدير المنصة' : 'Admin Portal Login'}
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          {lang === 'ar' 
            ? 'الوصول الكامل إلى كتالوج المصانع، طلبات منافذ البيع، وعروض تصدير طريق الحرير.'
            : 'Access brand onboarding, outlet dispatch orders, and Silk Road wholesale RFQs.'}
        </p>

        {/* Quick Credentials Info Box */}
        <div className="mt-4 p-3 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs">
          <div className="flex items-center justify-between text-cyan-300 font-semibold mb-1">
            <span className="flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'ar' ? 'بيانات الاعتماد الرسمية:' : 'Authorized Credentials:'}</span>
            </span>
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-[10px] px-2 py-0.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-black border border-amber-400/40 transition flex items-center gap-1"
            >
              <Zap className="w-3 h-3" />
              <span>{lang === 'ar' ? 'تعبئة سريعة' : 'Quick Fill'}</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-mono mt-1">
            <div className="bg-slate-900/60 p-1.5 rounded-lg border border-white/5">
              <span className="text-slate-500 text-[10px] block">Username:</span>
              <strong className="text-cyan-400">Admin</strong>
            </div>
            <div className="bg-slate-900/60 p-1.5 rounded-lg border border-white/5">
              <span className="text-slate-500 text-[10px] block">Password:</span>
              <strong className="text-amber-400">Password@26</strong>
            </div>
          </div>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mt-3 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              {lang === 'ar' ? 'اسم المستخدم' : 'Username'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin"
                required
                className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              {lang === 'ar' ? 'كلمة المرور' : 'Password'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password@26"
                required
                className="w-full pl-9 rtl:pl-10 rtl:pr-9 pr-10 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 pr-3 rtl:pr-0 rtl:pl-3 flex items-center text-slate-400 hover:text-slate-200 transition"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white font-black text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2 mt-6 cursor-pointer"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-cyan-200" />
                <span>{lang === 'ar' ? 'دخول لوحة التحكم' : 'Authenticate & Open Dashboard'}</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>e7na Local Platform 2026</span>
          </span>
          <span className="text-cyan-400 font-mono">Role: Super Admin</span>
        </div>

      </div>
    </div>
  );
}
