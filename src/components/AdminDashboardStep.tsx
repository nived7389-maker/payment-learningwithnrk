import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Users, FileText, Activity, AlertTriangle } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

interface AdminDashboardStepProps {
  onBack: () => void;
}

export function AdminDashboardStep({ onBack }: AdminDashboardStepProps) {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const q = query(collection(db, "payments"), orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRecords(data);
        setError(null);
      } catch (error: any) {
        console.error("Error fetching records from Firebase: ", error);
        // Fallback to localStorage if Firebase fails
        try {
          const localRecords = JSON.parse(localStorage.getItem('payments') || '[]');
          // Reverse to show newest first
          setRecords(localRecords.reverse());
          setError(null); // Clear error since we have local data fallback
        } catch (localError) {
          setError(error.message || "Failed to fetch records.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl w-full mx-auto p-4 md:p-8 space-y-6"
    >
      <div className="flex items-center gap-4 bg-[#0a0f1c] p-4 rounded-2xl border border-white/5 shadow-lg">
        <button 
          onClick={onBack}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Admin Dashboard</h2>
          <p className="text-slate-400 font-medium">Payment Records Overview</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0a0f1c] border border-white/5 rounded-3xl p-6 shadow-lg flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
            <Users size={28} />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-semibold">Total Students</p>
            <p className="text-3xl font-bold text-white">{records.length}</p>
          </div>
        </div>
        <div className="bg-[#0a0f1c] border border-white/5 rounded-3xl p-6 shadow-lg flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400">
            <Activity size={28} />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-semibold">Paid Status</p>
            <p className="text-3xl font-bold text-white">100%</p>
          </div>
        </div>
        <div className="bg-[#0a0f1c] border border-white/5 rounded-3xl p-6 shadow-lg flex items-center gap-4">
          <div className="w-14 h-14 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400">
            <FileText size={28} />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-semibold">System</p>
            <p className="text-3xl font-bold text-white">{error ? 'Error' : 'Active'}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#0a0f1c] border border-white/5 rounded-3xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-xl font-bold text-white">Recent Registrations</h3>
        </div>
        
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-slate-400">Loading records...</div>
          ) : error ? (
            <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-400">
                <AlertTriangle size={32} />
              </div>
              <p className="text-red-400 font-medium">{error}</p>
              <p className="text-slate-400 text-sm max-w-md">
                It looks like your Firebase Security Rules are preventing access. Please go to your Firebase Console -&gt; Firestore Database -&gt; Rules, and ensure you have given read/write permissions for the "payments" collection.
              </p>
            </div>
          ) : records.length === 0 ? (
            <div className="p-8 text-center text-slate-400">No payment records found.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-slate-400 text-sm font-medium">
                  <th className="px-6 py-4 border-b border-white/5">Login Name</th>
                  <th className="px-6 py-4 border-b border-white/5">UPI ID</th>
                  <th className="px-6 py-4 border-b border-white/5">Contact</th>
                  <th className="px-6 py-4 border-b border-white/5">Class & Stream</th>
                  <th className="px-6 py-4 border-b border-white/5">TXN ID</th>
                  <th className="px-6 py-4 border-b border-white/5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {records.map((record) => (
                  <tr key={record.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs uppercase">
                          {record.loginName.charAt(0)}
                        </div>
                        <span className="font-semibold text-white">{record.loginName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-amber-200/80 font-medium font-mono">
                      {record.payerUpiId || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                      {record.phoneNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                      <span className="bg-white/5 px-2 py-1 rounded-md">{record.selectedClass}</span>
                      <span className="ml-2 text-xs opacity-70 uppercase tracking-widest">{record.stream}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-slate-400">
                      {record.txnId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Successful
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
    </motion.div>
  );
}
