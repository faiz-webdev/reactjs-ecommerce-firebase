import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDPg3BT-X6Ak7Gu_HnGdvE8v80Kwp2kXg",
  authDomain: "reactjs-ecommerce-7a449.firebaseapp.com",
  projectId: "reactjs-ecommerce-7a449",
  storageBucket: "reactjs-ecommerce-7a449.appspot.com",
  messagingSenderId: "60816354260",
  appId: "1:60816354260:web:e525f556e2c1214b788441",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app)

export { fireDB, auth };