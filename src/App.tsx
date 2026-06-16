import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Step, FormData } from './types';
import { FormStep } from './components/FormStep';
import { PaymentStep } from './components/PaymentStep';
import { ProcessingStep } from './components/ProcessingStep';
import { SuccessStep } from './components/SuccessStep';
import { AdminLoginStep } from './components/AdminLoginStep';
import { AdminDashboardStep } from './components/AdminDashboardStep';
import { Coin } from './components/Coin';

export default function App() {
  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState<FormData>({
    selectedClass: null,
    stream: null,
    loginName: '',
    phoneNumber: '',
    txnId: '',
    payerUpiId: ''
  });

  const updateData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-[#070a0d] text-white flex flex-col font-sans selection:bg-amber-500/30 overflow-x-hidden relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/15 via-[#070a0d] to-[#040608] -z-10 pointer-events-none" />
      
      {/* Floating Animated Coins in Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
         <Coin className="absolute top-[10%] left-[5%] opacity-40 scale-75" delay={0} />
         <Coin className="absolute top-[20%] right-[10%] opacity-30 scale-125" delay={1} />
         <Coin className="absolute bottom-[20%] left-[15%] opacity-50 scale-150" delay={2} />
         <Coin className="absolute top-[60%] right-[5%] opacity-40 scale-100" delay={0.5} />
         <Coin className="absolute bottom-[10%] xl:right-[20%] right-[30%] opacity-20 scale-75" delay={1.5} />
      </div>
      
      <main className="flex-grow flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {step === 'form' && (
            <FormStep 
              key="form"
              data={formData} 
              updateData={updateData} 
              onNext={() => setStep('payment')} 
              onAdminAccess={() => setStep('admin_login')}
            />
          )}
          {step === 'payment' && (
            <PaymentStep 
              key="payment"
              data={formData} 
              updateData={updateData} 
              onNext={() => setStep('processing')}
              onBack={() => setStep('form')}
            />
          )}
          {step === 'processing' && (
            <ProcessingStep 
              key="processing"
              onComplete={() => setStep('success')} 
            />
          )}
          {step === 'success' && (
            <SuccessStep key="success" data={formData} />
          )}
          {step === 'admin_login' && (
            <AdminLoginStep 
              key="admin_login"
              onSuccess={() => setStep('admin_dashboard')}
              onBack={() => setStep('form')}
            />
          )}
          {step === 'admin_dashboard' && (
            <AdminDashboardStep 
              key="admin_dashboard"
              onBack={() => setStep('form')}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
