import { getApp, getApps, initializeApp } from 'firebase/app';
import {
    initializeAuth,
    getReactNativePersistence,
    getAuth,
} from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBfyQw5wnPof_ETQ4qOcYj5PAmUudm7G9U',
    authDomain: 'pim-project-71e40.firebaseapp.com',
    projectId: 'pim-project-71e40',
    storageBucket: 'pim-project-71e40.appspot.com',
    messagingSenderId: '571448097344',
    appId: '1:571448097344:web:f17abce7634f46b7547da5',
    measurementId: 'G-HK1QCKMS93',
};

const FIREBASE_APP = !getApps().length
    ? initializeApp(firebaseConfig)
    : getApp();

export const FIREBASE_AUTH =
    getAuth(FIREBASE_APP) ||
    initializeAuth(FIREBASE_APP, {
        persistence: getReactNativePersistence(AsyncStorage),
    });

export const FIREBASE_DB = initializeFirestore(FIREBASE_APP, {
    experimentalForceLongPolling: true,
});
