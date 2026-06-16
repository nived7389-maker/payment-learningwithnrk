import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { FormData } from '../types';
import { ChevronRight, AlertCircle, ShieldCheck } from 'lucide-react';

interface FormStepProps {
  key?: string;
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onAdminAccess: () => void;
}

export function FormStep({ data, updateData, onNext, onAdminAccess }: FormStepProps) {
  const [classError, setClassError] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClassSelection = (cls: '+1' | '+2') => {
    if (cls === '+2') {
      setClassError(true);
      updateData({ selectedClass: null });
    } else {
      setClassError(false);
      updateData({ selectedClass: cls });
    }
  };

  const isFormValid = data.selectedClass === '+1' && data.stream && data.loginName.trim() !== '' && data.phoneNumber.trim() !== '';

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    if (newCount >= 6) {
      onAdminAccess();
      setClickCount(0); // reset
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        setClickCount(0);
      }, 2000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-md w-full mx-auto p-6 space-y-8 bg-[#0b0e14]/80 backdrop-blur-xl border border-white/5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10"
    >
      <div className="text-center space-y-4 pt-4 pb-2">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative inline-block cursor-pointer"
          onClick={handleLogoClick}
        >
          <img 
            src="https://yt3.ggpht.com/IArEytZ_TtPVq8bJ5qloBWIDQBFqBhWnr9yL01OOERZfgkVCEOq4_BYAnioWBh9juvkIK6ABKU_v=s690-nd-v1" 
            alt="NRK Logo" 
            className="relative h-28 mx-auto object-contain"
          />
        </motion.div>
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-500 tracking-tight leading-tight">
            Learning with nrk <br/> payment method
          </h1>
          <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-medium text-sm mt-2">
            <ShieldCheck size={16} />
            <span>100% Safe Payment Method</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-300">1. Which class are you in?</label>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClassSelection('+1')}
              className={`p-3.5 rounded-2xl border font-medium transition-all duration-300 ${
                data.selectedClass === '+1' 
                  ? 'bg-blue-500/20 border-blue-400 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              +1 Class
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClassSelection('+2')}
              className="p-3.5 rounded-2xl border font-medium bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              +2 Class
            </motion.button>
          </div>
          {classError && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -10 }} 
              animate={{ opacity: 1, height: 'auto', y: 0 }} 
              className="flex items-center gap-2 text-red-400 text-xs mt-2 bg-red-400/10 p-3 rounded-xl border border-red-400/20"
            >
              <AlertCircle size={14} />
              Currently this class is not available.
            </motion.div>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-300">2. Which stream do you want?</label>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => updateData({ stream: 'biology science' })}
              className={`p-3.5 rounded-2xl border font-medium flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                data.stream === 'biology science'
                  ? 'bg-blue-500/20 border-blue-400 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              Biology Science
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => updateData({ stream: 'computer science' })}
              className={`p-3.5 rounded-2xl border font-medium flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                data.stream === 'computer science'
                  ? 'bg-blue-500/20 border-blue-400 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              Computer Science
            </motion.button>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-300">3. App Login Name</label>
          <input 
            type="text" 
            placeholder="Enter your exact login name"
            value={data.loginName}
            onChange={(e) => updateData({ loginName: e.target.value })}
            className="w-full bg-[#090b14] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all shadow-inner"
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-300">4. App Sign-in Phone Number</label>
          <div className="flex bg-[#090b14] border border-white/10 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-400 transition-all shadow-inner relative">
            <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center pl-5 pr-3 text-slate-400 font-medium border-r border-white/10 bg-white/5 pointer-events-none">
              +91
            </div>
            <input 
              type="tel" 
              maxLength={10}
              placeholder="Enter 10-digit number"
              value={data.phoneNumber.replace(/^\+91\s*/, '')}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                updateData({ phoneNumber: `+91 ${val}` });
              }}
              className="w-full bg-transparent pl-[4.5rem] pr-5 py-4 text-white placeholder:text-slate-600 focus:outline-none tracking-wider"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 pb-8">
          <motion.button 
          whileTap={isFormValid ? { scale: 0.97 } : {}}
          onClick={onNext}
          disabled={!isFormValid}
          className="w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-600 bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
        >
          Next Step <ChevronRight size={20} strokeWidth={3} />
        </motion.button>
      </div>
    </motion.div>
  );
}
