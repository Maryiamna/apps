
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA9VzIExek9kHHLs0LT9GCRzPinissD3j0",
  authDomain: "autentica-usuario-758e4.firebaseapp.com",
  projectId: "autentica-usuario-758e4",
  storageBucket: "autentica-usuario-758e4.appspot.com",
  messagingSenderId: "3076769980",
  appId: "1:3076769980:web:fc6c46948f77027aac28b9"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);