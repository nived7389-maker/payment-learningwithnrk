import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, MessageCircle } from 'lucide-react';
import { FormData } from '../types';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

interface SuccessStepProps {
  data: FormData;
}

export function SuccessStep({ data }: SuccessStepProps) {
  const [showFallback, setShowFallback] = useState(false);
  const [dataSaved, setDataSaved] = useState(false);

  useEffect(() => {
    if (!dataSaved && data.txnId) {
      const saveData = async () => {
        // Save to localStorage as a fallback/redundant local cache
        try {
          const localRecords = JSON.parse(localStorage.getItem('payments') || '[]');
          const newRecord = {
            id: Date.now().toString(),
            ...data,
            timestamp: new Date().toISOString()
          };
          localRecords.push(newRecord);
          localStorage.setItem('payments', JSON.stringify(localRecords));
        } catch (e) {
          console.error("Error saving to localStorage", e);
        }

        try {
          await addDoc(collection(db, "payments"), {
            ...data,
            timestamp: Timestamp.now()
          });
          setDataSaved(true);
        } catch (e) {
          console.error("Error saving to Firebase", e);
          // If firebase fails, we at least have local storage now
          setDataSaved(true); 
        }
      };
      saveData();
    }
  }, [data, dataSaved]);

  const text = `Payment will be successful`;

  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://wa.me/918848198680?text=${encodedText}`;

  const handleManualRedirect = () => {
    // Opening in a new tab works best for bypassing iframe restrictions
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    // We attempt an auto-redirect, but it's often blocked by browsers in iframes.
    // The prominent button ensures users can always proceed.
    const timer = setTimeout(() => {
      try {
        window.location.assign(whatsappUrl);
      } catch (e) {
        console.error("Auto-redirect blocked:", e);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [whatsappUrl]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, backgroundColor: '#10b981' }} // emerald-500
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-white text-center overflow-y-auto"
    >
      <motion.div 
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 mt-8 shadow-[0_0_50px_rgba(255,255,255,0.6)] border-[5px] border-emerald-100 shrink-0"
      >
        <Check size={56} className="text-emerald-500" strokeWidth={4} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="space-y-4 max-w-sm w-full"
      >
        <h1 className="text-5xl font-extrabold tracking-tight text-white drop-shadow-md pb-2">Successful</h1>
        
        <p className="text-emerald-50 text-lg font-medium tracking-wide">
          Payment transaction complete
        </p>

        <div className="bg-black/15 backdrop-blur-md rounded-2xl p-5 text-left space-y-3 mb-6 mt-2 text-sm text-emerald-50 shadow-inner border border-white/10">
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="opacity-80">UPI ID</span>
            <span className="font-semibold text-white">{data.payerUpiId}</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="opacity-80">Login Name</span>
            <span className="font-semibold text-white">{data.loginName}</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="opacity-80">Class & Stream</span>
            <span className="font-semibold text-white">{data.selectedClass} • {data.stream}</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-80">TXN ID</span>
            <span className="font-mono font-semibold text-white">{data.txnId.slice(0, 15)}{data.txnId.length > 15 ? '...' : ''}</span>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
          className="w-full pb-8"
        >
          <button
            onClick={handleManualRedirect}
            className="w-full py-4 px-6 bg-white text-emerald-600 font-bold rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.15)] group"
          >
            <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
            Send Details to WhatsApp
          </button>
          <p className="text-xs text-emerald-100/90 mt-4 leading-relaxed px-4">
            Click the button above if you haven't been redirected to WhatsApp automatically. We need these details to activate your account.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
