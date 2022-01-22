// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  firebase: {
    projectId: 'onigiri-app',
    appId: '1:875030966525:web:a07b9d50a0952a7cd5ce94',
    databaseURL: 'https://onigiri-app-default-rtdb.firebaseio.com',
    storageBucket: 'onigiri-app.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyAVOTwYBF7ajPXkYxlUI5E9TC0fau981Hc',
    authDomain: 'onigiri-app.firebaseapp.com',
    messagingSenderId: '875030966525',
  },
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAVOTwYBF7ajPXkYxlUI5E9TC0fau981Hc",
    authDomain: "onigiri-app.firebaseapp.com",
    databaseURL: "https://onigiri-app-default-rtdb.firebaseio.com",
    projectId: "onigiri-app",
    storageBucket: "onigiri-app.appspot.com",
    messagingSenderId: "875030966525",
    appId: "1:875030966525:web:a07b9d50a0952a7cd5ce94"
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
