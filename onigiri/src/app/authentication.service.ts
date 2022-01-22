import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from '@angular/fire/auth';
import { LoginData } from './shared/services/login-data';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userData: any;
  
  constructor(private auth: Auth) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user') || 'null');
      }
    })
  }

  getUser() {
    return this.auth.currentUser;
  }

  loggedIn() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return (user !== null) ? true : false;
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register({ email, password }: LoginData) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    console.log("Log out button clicked");
    localStorage.removeItem('user');
    return signOut(this.auth);
  }
}
