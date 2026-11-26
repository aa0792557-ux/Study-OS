import { initializeApp, getApp, getApps } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// REPLACE WITH YOUR KEYS
const firebaseConfig = {
  apiKey: "AIzaSyDgQ1MvoKpVCMpOBkGWh37pAVKe0s0RAkA",
  authDomain: "crud-cbc10.firebaseapp.com",
  projectId: "crud-cbc10",
  storageBucket: "crud-cbc10.firebasestorage.app",
  messagingSenderId: "193283063890",
  appId: "1:193283063890:web:fe89ab844b786c20a95f8b",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const persistence = getReactNativePersistence(ReactNativeAsyncStorage);

function createAuth() {
  try {
    return initializeAuth(app, { persistence });
  } catch (error) {
    // initializeAuth throws if it already ran (for example after a fast refresh)
    return getAuth(app);
  }
}

export const auth = createAuth();
export const db = getFirestore(app);