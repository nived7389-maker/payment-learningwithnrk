import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBR535nQSvEW9XnLUqjPVfVOOqFaeBCfCo",
  authDomain: "payment-learningwithnrk.firebaseapp.com",
  databaseURL: "https://payment-learningwithnrk-default-rtdb.firebaseio.com",
  projectId: "payment-learningwithnrk",
  storageBucket: "payment-learningwithnrk.firebasestorage.app",
  messagingSenderId: "406598123835",
  appId: "1:406598123835:web:084a3d8c5084bf0b55f71e",
  measurementId: "G-YC53W7F2T2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
