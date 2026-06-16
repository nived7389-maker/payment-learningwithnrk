import React from 'react';
import { motion } from 'motion/react';

export function Coin({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-15, 15, -15], rotateY: [0, 360] }}
      transition={{ 
        y: { repeat: Infinity, duration: 3, ease: "easeInOut", delay },
        rotateY: { repeat: Infinity, duration: 4, ease: "linear", delay }
      }}
      className={`w-16 h-16 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.3)] flex items-center justify-center relative ${className}`}
      style={{ transformStyle: 'preserve-3d', background: 'radial-gradient(circle at 30% 30%, #FDE68A, #D97706)' }}
    >
      <div className="absolute inset-1 rounded-full border border-amber-300/50 flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-600 shadow-inner">
        <span className="text-amber-100 font-bold text-2xl drop-shadow-md" style={{ transform: 'translateZ(1px)' }}>₹</span>
      </div>
      <div className="absolute inset-0 rounded-full border-[3px] border-amber-300"></div>
    </motion.div>
  );
}
