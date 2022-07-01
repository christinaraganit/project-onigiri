import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication.service';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-new-account-add-to-list',
  templateUrl: './new-account-add-to-list.component.html',
  styleUrls: ['./new-account-add-to-list.component.css']
})
export class NewAccountAddToListComponent implements OnInit {

  userName: string;
  email: string;

  constructor(
    private authService: AuthService, 
    private fireService: FirestoreService
  ) { }

  async ngOnInit() {
    const curr_user = this.authService.getUser();
    if (curr_user) {
      await this.setUserInfo(curr_user.uid);
    }
    this.userName = JSON.parse(localStorage.getItem('name') || 'null');
    this.email = JSON.parse(localStorage.getItem('email') || 'null');
  }

  async setUserInfo(userId: string) {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    if (name === null && email === null) {
      const current = await this.fireService.getUser(userId);
      const data = current.data();
      if (data) {
        localStorage.setItem('email', JSON.stringify(data['email']));
        const name = data['first_name'] + data['last_name'];
        localStorage.setItem('name', JSON.stringify(name));
      } else {
        localStorage.setItem('email', 'null');
        localStorage.setItem('name', 'null');
      }
    }
  }
}
