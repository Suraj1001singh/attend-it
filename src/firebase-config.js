import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1fduyQ_d0BDkZmPDL1hber0Tx50u_cTk",
  authDomain: "attend-it-ff221.firebaseapp.com",
  projectId: "attend-it-ff221",
  storageBucket: "attend-it-ff221.appspot.com",
  messagingSenderId: "678320991295",
  appId: "1:678320991295:web:e8bad27656f6f6bf995c8a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const Auth = getAuth(app);
export { Auth };
export default db;
