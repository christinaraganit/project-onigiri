import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { AnimeMangaPullerComponent } from './anime-manga-puller/anime-manga-puller.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignupFormComponent } from './signup/signup-form/signup-form.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { connectFirestoreEmulator, enableIndexedDbPersistence } from 'firebase/firestore';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { MediaDetailsComponent } from './media-details/media-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoggedinAuthGuard } from './loggedin-auth.guard';
import { NotloggedinAuthGuard } from './notloggedin-auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    AnimeMangaPullerComponent,
    DashboardComponent,
    LandingPageComponent,
    LoginComponent,
    LoginFormComponent,
    SignupComponent,
    SignupFormComponent,
    MediaDetailsComponent,
    UserListComponent
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
      [{ path: 'dashboard', component: DashboardComponent, canActivate: [NotloggedinAuthGuard] },
      { path: 'login', component: LoginComponent, canActivate: [LoggedinAuthGuard] },
      { path: 'signup', component: SignupComponent, canActivate: [LoggedinAuthGuard] },
      { path: '', component: LandingPageComponent, canActivate: [LoggedinAuthGuard] },
      { path: 'media', component: AnimeMangaPullerComponent, canActivate: [NotloggedinAuthGuard]},
      { path: 'media/:id', component: MediaDetailsComponent, canActivate: [NotloggedinAuthGuard]},
      { path: 'mylist', component: UserListComponent, canActivate: [NotloggedinAuthGuard] }
      ]
    ),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
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
  providers: [LoggedinAuthGuard, NotloggedinAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}