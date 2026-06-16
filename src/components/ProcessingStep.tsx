import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Clock } from 'lucide-react';

interface ProcessingStepProps {
  onComplete: () => void;
}

export function ProcessingStep({ onComplete }: ProcessingStepProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [processTime, setProcessTime] = useState(0);

  useEffect(() => {
    // Simple counter for "process time" visual
    const interval = setInterval(() => {
      setProcessTime(prev => prev + 1);
    }, 1000);

    // Show popup after 2.5 seconds
    const popupTimer = setTimeout(() => {
      setShowPopup(true);
      
      // Wait 3 seconds, then go to success automatically
      const finishTimer = setTimeout(() => {
        setShowPopup(false);
        setTimeout(() => {
          onComplete();
        }, 400); // brief transition time
      }, 3000);

      return () => clearTimeout(finishTimer);
    }, 2500);

    return () => {
      clearTimeout(popupTimer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-[80vh] flex flex-col items-center justify-center p-6 relative w-full max-w-md mx-auto"
    >
      <motion.div 
        animate={{ rotateY: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="w-24 h-24 mb-6 relative flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.5)] rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-4 border-amber-300"
      >
        <span className="text-amber-100 font-bold text-4xl drop-shadow-md">₹</span>
      </motion.div>
      
      <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">100% Secure Payment</h2>
      <p className="text-blue-200/80 text-center max-w-xs mb-4">
        Processing your transaction... {processTime > 0 ? `(${processTime}s)` : ''}
      </p>

      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-[#0a0f1c] border border-blue-500/20 p-8 rounded-3xl shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] max-w-sm w-full space-y-5 text-center"
            >
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-4 border border-blue-500/30">
                <Clock size={32} />
              </div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-500 tracking-tight">100% Secure Payment</h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                Activation will occur within 4 to 6 hours.
              </p>
              <div className="pt-2">
                <div className="w-full bg-[#151923] rounded-full h-1.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
