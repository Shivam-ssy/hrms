
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// firebase deploy
// firebase init
// firebase login
const config={
  apiKey:String(import.meta.env.VITE_apiKey),
    authDomain: String(import.meta.env.VITE_authDomain),
    projectId: String(import.meta.env.VITE_projectId),
    storageBucket: String(import.meta.env.VITE_storageBucket),
    messagingSenderId: String(import.meta.env.VITE_messagingSenderId),
    appId: String(import.meta.env.VITE_appId),
    measurementId: String(import.meta.env.VITE_measurementId)
}
const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket:config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId:config.appId,
  measurementId: config.measurementId
};
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage=getStorage()

export {db, app ,auth,storage}