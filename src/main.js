import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: import.meta.env.VUE_APP_API_KEY,
//   authDomain: import.meta.env.VUE_APP_AUTH_DOMAIN,
//   databaseURL: import.meta.env.VUE_APP_DATABASE_URL,
//   projectId: import.meta.env.VUE_APP_PROJECT_ID,
//   storageBucket: import.meta.env.VUE_APP_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VUE_APP_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VUE_APP_APP_ID,
//   measurementId: import.meta.env.VUE_APP_MEASUREMENT_ID
// };
const firebaseConfig = {
  apiKey: "AIzaSyBPw-63pbz8Ed7iDE6X_RmLmyaFIOVrSGI",
  authDomain: "s40db-7882d.firebaseapp.com",
  databaseURL: "https://s40db-7882d-default-rtdb.firebaseio.com",
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
