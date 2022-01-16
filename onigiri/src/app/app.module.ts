import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router'; 

import { ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { AnimeMangaPullerComponent } from './anime-manga-puller/anime-manga-puller.component';
import { LandingPageComponent  } from './landing-page/landing-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { connectFirestoreEmulator, enableIndexedDbPersistence } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAVOTwYBF7ajPXkYxlUI5E9TC0fau981Hc",
  authDomain: "onigiri-app.firebaseapp.com",
  databaseURL: "https://onigiri-app-default-rtdb.firebaseio.com",
  projectId: "onigiri-app",
  storageBucket: "onigiri-app.appspot.com",
  messagingSenderId: "875030966525",
  appId: "1:875030966525:web:a07b9d50a0952a7cd5ce94"
};

@NgModule({
  declarations: [
    AppComponent,
    AnimeMangaPullerComponent,
    DashboardComponent,
    LandingPageComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot(
      [{path: 'dashboard', component: DashboardComponent},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: '', component: LandingPageComponent},
      {path: 'all-media', component: AnimeMangaPullerComponent},]
    ),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => {
      const firestore = getFirestore();
      connectFirestoreEmulator(firestore, 'localhost', 8080);
      enableIndexedDbPersistence(firestore);
      return firestore;
    })
  ],
  exports: [
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}