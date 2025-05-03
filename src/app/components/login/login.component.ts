import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { USERS } from '../../services/mock-users';
import { AuthService } from '../../services/auth.service';  // Auth state tracking

@Component({
  selector: 'app-login',
  standalone: true,                  // Using standalone component
  imports: [CommonModule, FormsModule],  // Required for *ngIf, ngModel
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    console.log('Attempting login:', this.username, this.password);//Debug
    console.log('Users:', USERS);//Debug
    const user = USERS.find((u: any) => u.username === this.username && u.password === this.password);
    if (user) {
      this.authService.setLoggedIn(true);   // Store auth state
      this.router.navigate(['/inventory']); /// redirects
    } else {
      this.error = 'Invalid username or password';
    }
  }
}
