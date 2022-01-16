import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router'; 
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
    )
  ],
  exports: [
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}