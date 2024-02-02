import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "./firebase.config";

const initializeAuthentication = () => {
  initializeApp(firebaseConfig);
  getAnalytics(initializeApp(firebaseConfig))
};

export default initializeAuthentication;
