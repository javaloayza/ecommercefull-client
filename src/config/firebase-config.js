// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCRnVVDE-qGcF7UeroVTN-1VQ3hUdNmW9I',
  authDomain: 'ecommerce1-c1f7f.firebaseapp.com',
  projectId: 'ecommerce1-c1f7f',
  storageBucket: 'ecommerce1-c1f7f.appspot.com',
  messagingSenderId: '469154343328',
  appId: '1:469154343328:web:95ee2968e91c2870cc1cc5'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

// eslint-disable-next-line no-multiple-empty-lines

/* // adding your firebase config here
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
// import 'firebase/analytics';

export const app = firebase.initializeApp({
  apiKey: 'AIzaSyAqNKTEkFak2jgSdgYZafaFVoAMY2BcSBI',
  authDomain: 'e-commercepf.firebaseapp.com',
  projectId: 'e-commercepf',
  storageBucket: 'e-commercepf.appspot.com',
  messagingSenderId: '281044447587',
  appId: '1:281044447587:web:0aece300a88a935c276356'
})

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig) //eslint-disable-line
// firebase.analytics();
 */
