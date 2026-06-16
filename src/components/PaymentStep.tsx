import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FormData } from '../types';
import { ArrowLeft, QrCode, ScanLine, X } from 'lucide-react';

interface PaymentStepProps {
  key?: string;
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PaymentStep({ data, updateData, onNext, onBack }: PaymentStepProps) {
  const [showUpiApps, setShowUpiApps] = useState(false);
  const upiLink = "upi://pay?pa=nivednrk@fam&pn=%20&am=199&cu=INR";
  
  const handleUpiAppSelect = (appScheme: string) => {
    const targetLink = appScheme === 'gpay' ? 'gpay://upi/pay?pa=nivednrk@fam&pn=%20&am=199&cu=INR' :
                       appScheme === 'phonepe' ? 'phonepe://pay?pa=nivednrk@fam&pn=%20&am=199&cu=INR' :
                       appScheme === 'paytm' ? 'paytmmp://pay?pa=nivednrk@fam&pn=%20&am=199&cu=INR' :
                       upiLink;
    window.location.assign(targetLink);
    setShowUpiApps(false);
  };

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
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-500 tracking-tight">Secure Payment</h2>
      </div>

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-white rounded-[2rem] p-8 flex flex-col items-center justify-center space-y-6 shadow-[0_20px_50px_rgba(59,130,246,0.2)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
        
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
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUpiApps(true)}
            className="w-full py-4 px-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all bg-[#0a0f1c] hover:bg-black text-blue-500 shadow-xl border border-blue-500/20"
          >
            <QrCode size={20} /> Pay with Phone UPI App
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.2 }}
         className="space-y-5 pt-4"
      >
        <div className="space-y-3">
          <label className="text-sm font-semibold text-blue-100">Enter Transaction ID</label>
          <p className="text-sm text-slate-400 pb-1 font-medium">After paying, copy the 12-digit UPI TXN ID and paste it here.</p>
          <input 
            type="text" 
            placeholder="e.g. 301234567890"
            value={data.txnId}
            onChange={(e) => updateData({ txnId: e.target.value })}
            className="w-full bg-[#090b14] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all font-mono tracking-wider shadow-inner"
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-blue-100">What is your UPI ID?</label>
          <p className="text-xs text-slate-400 pb-1 font-medium">Please enter your UPI ID used for payment.</p>
          <input 
            type="text" 
            placeholder="e.g. personalname@upi"
            value={data.payerUpiId}
            onChange={(e) => updateData({ payerUpiId: e.target.value })}
            className="w-full bg-[#090b14] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all shadow-inner"
          />
        </div>
        
        <motion.button 
          whileTap={(data.txnId.trim().length >= 6 && data.payerUpiId.trim().length >= 3) ? { scale: 0.97 } : {}}
          onClick={onNext}
          disabled={data.txnId.trim().length < 6 || data.payerUpiId.trim().length < 3}
          className="w-full py-4 flex items-center justify-center gap-2 rounded-2xl font-bold text-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:shadow-none"
        >
          Process Payment
        </motion.button>
      </motion.div>
      
      <div className="h-safe pb-8"></div>

      {/* UPI App Selection Modal */}
      <AnimatePresence>
        {showUpiApps && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#0a0f1c] w-full max-w-sm rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden relative"
            >
              <div className="p-6 pb-2 flex justify-between items-center border-b border-white/5">
                <h3 className="text-xl font-bold text-white">Select UPI App</h3>
                <button 
                  onClick={() => setShowUpiApps(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-3">
                <button 
                  onClick={() => handleUpiAppSelect('gpay')}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-md p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" className="w-full h-full object-contain" />
                  </div>
                  <span className="font-bold text-lg text-white">Google Pay</span>
                </button>

                <button 
                  onClick={() => handleUpiAppSelect('phonepe')}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-[#5f259f] rounded-xl shadow-md p-2 flex items-center justify-center text-white font-bold text-2xl leading-none">
                    पे
                  </div>
                  <span className="font-bold text-lg text-white">PhonePe</span>
                </button>

                <button 
                  onClick={() => handleUpiAppSelect('paytm')}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-md p-1.5 flex items-center justify-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" alt="Paytm" className="w-full h-full object-contain" />
                  </div>
                  <span className="font-bold text-lg text-white">Paytm</span>
                </button>

                <button 
                  onClick={() => handleUpiAppSelect('other')}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-slate-800 rounded-xl shadow-md p-2 flex items-center justify-center text-slate-300">
                    <QrCode size={24} />
                  </div>
                  <span className="font-bold text-lg text-white">Other UPI Apps</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </motion.div>
  );
}
