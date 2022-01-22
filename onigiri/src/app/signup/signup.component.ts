import { LoginData } from './../shared/services/login-data';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../firestore.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {

  }

  SignUp(loginData: any) {
    console.log("register function called");
    loginData.first
    this.authService
      .register(loginData)
      .then((userCredential) => {
        const email = userCredential.user.email;
        if (email) {
          this.firestoreService.addUser(
            userCredential.user.uid,
            email,
            loginData.firstName,
            loginData.lastName,
            loginData.anime,
            loginData.manga
          ).then(() => {
          });
          this.router.navigate(['/dashboard'])
        }
      })
      .catch((e) => console.log(e.message));
  }
}
