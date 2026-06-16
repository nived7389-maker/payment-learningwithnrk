import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Step, FormData } from './types';
import { FormStep } from './components/FormStep';
import { PaymentStep } from './components/PaymentStep';
import { ProcessingStep } from './components/ProcessingStep';
import { SuccessStep } from './components/SuccessStep';
import { AdminLoginStep } from './components/AdminLoginStep';
import { AdminDashboardStep } from './components/AdminDashboardStep';

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
    <div className="min-h-screen bg-[#070a0d] text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/15 via-[#070a0d] to-[#040608] -z-10 pointer-events-none" />
      
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
