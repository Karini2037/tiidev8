import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAE7MHse16gseg69lJNggTPgylqxmpFskY",
  authDomain: "tiidev8-e9d7c.firebaseapp.com",
  projectId: "tiidev8-e9d7c",
  storageBucket: "tiidev8-e9d7c.firebasestorage.app",
  messagingSenderId: "394607476235",
  appId: "1:394607476235:web:876050f33ba429e5e7110e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };