export type Step = 'form' | 'payment' | 'processing' | 'success' | 'admin_login' | 'admin_dashboard';

export interface FormData {
  selectedClass: '+1' | '+2' | null;
  stream: 'biology science' | 'computer science' | null;
  loginName: string;
  phoneNumber: string;
  txnId: string;
  payerUpiId: string;
  status?: string;
}

export interface PaymentRecord extends FormData {
  id: string;
  timestamp: Date;
}
