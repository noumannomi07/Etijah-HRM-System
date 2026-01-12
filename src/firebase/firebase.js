import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB3qbwVEEb9g94dSik8g_JDn6ZJmvh_bZQ",
  authDomain: "etijah-e2cdd.firebaseapp.com",
  projectId: "etijah-e2cdd",
  storageBucket: "etijah-e2cdd.firebasestorage.app",
  messagingSenderId: "144099976132",
  appId: "1:144099976132:web:6e7453d130e63bf728fa91",
  measurementId: "G-7MF3VMVCK9",
};

const app = initializeApp(firebaseConfig);

// في حالة تشغيل داخل متصفح فقط (Firebase Analytics لا يعمل في SSR مثلاً)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { analytics, logEvent };
