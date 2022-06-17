import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication.service';
import { FirestoreService } from '../firestore.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userName: string;
  email: string;
  path: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fireService: FirestoreService,
    private location: Location
  ) {
    this.router.events.subscribe((val) => {
      this.path = this.location.path();
    });
  }

  async ngOnInit() {
    const curr_user = this.authService.getUser();
    if (curr_user) {
      await this.setUserInfo(curr_user.uid);
    }
    this.userName = JSON.parse(localStorage.getItem('name') || 'null');
    this.email = JSON.parse(localStorage.getItem('email') || 'null');
  }

  async setUserInfo(userId: string) {
    const name = JSON.parse(localStorage.getItem('name') || 'null');
    const email = JSON.parse(localStorage.getItem('email') || 'null');
    if (name === null && email === null) {
      const current = await this.fireService.getUser(userId);
      const data = current.data();
      if (data) {
        localStorage.setItem('email', JSON.stringify(data['email']));
        const name = data['first_name'] + ' ' + data['last_name'];
        localStorage.setItem('name', JSON.stringify(name));
      } else {
        localStorage.setItem('email', 'null');
        localStorage.setItem('name', 'null');
      }
    }
  }

  media() {
    this.router.navigate(['/media']);
  }

  list() {
    this.router.navigate(['/my-list']);
  }

  dashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.authService
      .logout()
      .then(() => {
        this.router.navigate(['/'])
        localStorage.removeItem('email');
        localStorage.removeItem('name');
      })
      .catch((e) => console.log(e.message));
  }
}
