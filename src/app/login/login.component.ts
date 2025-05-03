import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
import { Component } from '@angular/core';
import { USERS } from '../services/mock-users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  isLoggedIn = false;

  login() {
    const user = USERS.find(u => u.username === this.username && u.password === this.password);
    if (user) {
      this.isLoggedIn = true;
      this.error = '';
    } else {
      this.error = 'Invalid username or password';
    }
  }
}
