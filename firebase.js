// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'airbnb-944d7.firebaseapp.com',
  projectId: 'airbnb-944d7',
  storageBucket: 'airbnb-944d7.appspot.com',
  messagingSenderId: '416573766265',
  appId: '1:416573766265:web:c590700dec6164eb8372a8',
  measurementId: 'G-YHML7ZJQ3X',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)
const storage = getStorage(app)
export { app, db, storage }
