import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowRight, ArrowLeft } from 'lucide-react';

interface AdminLoginStepProps {
  key?: string;
  onSuccess: () => void;
  onBack: () => void;
}

export function AdminLoginStep({ onSuccess, onBack }: AdminLoginStepProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '123nfjhhgb') {
      onSuccess();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-md w-full mx-auto p-6 space-y-8"
    >
      <div className="flex items-center gap-4 pt-4">
        <button 
          onClick={onBack}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-500 tracking-tight">Admin Portal</h2>
      </div>

      <div className="bg-[#0a0f1c] rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-4 border border-blue-500/20">
            <Lock size={32} />
          </div>
          <h3 className="text-2xl font-bold text-white">Restricted Access</h3>
          <p className="text-slate-400 text-sm mt-2">Enter admin password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className="w-full bg-[#040608] border border-white/10 rounded-2xl px-5 py-4 text-center text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono tracking-widest shadow-inner"
            />
            {error && (
              <p className="text-red-400 text-sm text-center">Incorrect password.</p>
            )}
          </div>

          <button 
            type="submit"
            className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]"
          >
            Login <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
