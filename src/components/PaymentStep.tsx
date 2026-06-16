import React from 'react';
import { motion } from 'motion/react';
import { FormData } from '../types';
import { ArrowLeft, QrCode, ScanLine } from 'lucide-react';

interface PaymentStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PaymentStep({ data, updateData, onNext, onBack }: PaymentStepProps) {
  const upiLink = "upi://pay?pa=nivednrk@fam&pn=%20&am=199&cu=INR";
  
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(upiLink)}&color=0a0f1c&bgcolor=ffffff`;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-md w-full mx-auto p-6 space-y-8"
    >
      <div className="flex items-center gap-4 pt-4">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="p-3 rounded-full bg-white/5 hover:bg-white/15 text-white transition-colors border border-white/5"
        >
          <ArrowLeft size={20} />
        </motion.button>
        <h2 className="text-2xl font-bold text-white tracking-tight">Payment Setup</h2>
      </div>

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-white rounded-[2rem] p-8 flex flex-col items-center justify-center space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"></div>
        
        <div className="text-center space-y-1">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Amount Due</p>
          <p className="text-4xl font-extrabold text-slate-900 tracking-tight">₹199</p>
        </div>

        <div className="relative p-3 bg-slate-50 rounded-3xl border-2 border-slate-100 shadow-inner group">
          <img 
            src={qrUrl} 
            alt="Payment QR Code" 
            className="w-48 h-48 rounded-xl object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 border-2 border-dashed border-blue-500/30 rounded-3xl pointer-events-none transition-all duration-500 group-hover:border-blue-500/60 group-hover:rotate-1"></div>
          <motion.div 
            animate={{ y: [0, -5, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -bottom-4 -right-4 text-blue-600 bg-white shadow-xl rounded-full p-2 border-4 border-slate-50"
          >
            <ScanLine size={32} />
          </motion.div>
        </div>

        <p className="text-slate-600 font-bold text-sm tracking-wide bg-slate-100 px-4 py-2 rounded-full">UPI ID: nivednrk@fam</p>

        <div className="w-full h-px bg-slate-200"></div>

        <div className="w-full space-y-4">
          <motion.a 
            whileTap={{ scale: 0.95 }}
            href={upiLink}
            className="w-full py-4 px-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all bg-[#0a0f1c] hover:bg-black text-white shadow-xl"
          >
            <QrCode size={20} /> Pay with Phone UPI App
          </motion.a>
        </div>
      </motion.div>

      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.2 }}
         className="space-y-5 pt-4"
      >
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-300">Enter Transaction ID</label>
          <p className="text-sm text-slate-400 pb-1 font-medium">After paying, copy the 12-digit UPI TXN ID and paste it here.</p>
          <input 
            type="text" 
            placeholder="e.g. 301234567890"
            value={data.txnId}
            onChange={(e) => updateData({ txnId: e.target.value })}
            className="w-full bg-[#090b14] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all font-mono tracking-wider shadow-inner"
          />
        </div>
        
        <motion.button 
          whileTap={data.txnId.trim().length >= 6 ? { scale: 0.97 } : {}}
          onClick={onNext}
          disabled={data.txnId.trim().length < 6}
          className="w-full py-4 flex items-center justify-center gap-2 rounded-2xl font-bold text-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:shadow-none"
        >
          Process Payment
        </motion.button>
      </motion.div>
      
      <div className="h-safe pb-8"></div>
    </motion.div>
  );
}
