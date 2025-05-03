import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';   
import { FormsModule } from '@angular/forms';       
import { USERS } from '../../services/mock-users';

@Component({
  selector: 'app-login',
  standalone: true,                                 
  imports: [CommonModule, FormsModule],            
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  isLoggedIn = false;

  constructor(private router: Router) {}

  login() {
    const user = USERS.find((u: any) => u.username === this.username && u.password === this.password);
    if (user) {
      this.isLoggedIn = true;
      this.error = '';
      this.router.navigate(['/inventory']);
    } else {
      this.error = 'Invalid username or password';
    }
  }
}
