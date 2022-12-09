import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPw-63pbz8Ed7iDE6X_RmLmyaFIOVrSGI",
  authDomain: "s40db-7882d.firebaseapp.com",
  projectId: "s40db-7882d",
  storageBucket: "s40db-7882d.appspot.com",
  messagingSenderId: "250643240766",
  appId: "1:250643240766:web:6595eddd824aee88ddfe6f",
  measurementId: "G-G0VEQP6D4H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createApp(App).mount('#app')
