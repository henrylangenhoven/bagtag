import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({
      "projectId": "bagtag-lang",
      "appId": "1:256848826132:web:0098f362f4485eea00fc01",
      "storageBucket": "bagtag-lang.appspot.com",
      "apiKey": "AIzaSyAEw4HsDXhFtP76drx0Imc-p6VUNOKv22Y",
      "authDomain": "bagtag-lang.firebaseapp.com",
      "messagingSenderId": "256848826132",
      "measurementId": "G-T6LFH84B36"
    }))),
    importProvidersFrom(provideFirestore(() => getFirestore()))]
};
