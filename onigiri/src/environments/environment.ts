// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVOTwYBF7ajPXkYxlUI5E9TC0fau981Hc",
  authDomain: "onigiri-app.firebaseapp.com",
  projectId: "onigiri-app",
  storageBucket: "onigiri-app.appspot.com",
  messagingSenderId: "875030966525",
  appId: "1:875030966525:web:a07b9d50a0952a7cd5ce94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const environment = {
  production: false,
  firebase: {
    projectId: 'onigiri-app',
    appId: '1:875030966525:web:a07b9d50a0952a7cd5ce94',
    storageBucket: 'onigiri-app.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyAVOTwYBF7ajPXkYxlUI5E9TC0fau981Hc',
    authDomain: 'onigiri-app.firebaseapp.com',
    messagingSenderId: '875030966525',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
