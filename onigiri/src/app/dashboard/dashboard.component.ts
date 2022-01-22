import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication.service';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userName: string;
  email: string;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private fireService: FirestoreService
  ) { }

  ngOnInit(): void {
    const curr_user = this.authService.getUser();
    if (curr_user) {
      this.setUserInfo(curr_user.uid);
    }
  }

  async setUserInfo(userId: string) {
    const current = await this.fireService.getUser(userId);
    const data = current.data();
    if (data) {
      this.email = data['email'];
      this.userName = data['first_name'] + ' ' + data['last_name'];
    }
  }

  media() {
    this.router.navigate(['/media']);
  }

  list() {
    this.router.navigate(['/mylist']);
  }

  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message));
  }
}
