import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { USERS } from '../../services/mock-users';
import { AuthService } from '../../services/auth.service';

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

  constructor(private router: Router, private authService: AuthService) {}

  login(): void {
    const user = USERS.find(u => u.username === this.username && u.password === this.password);
    if (user) {
      this.authService.setLoggedIn(true);
      this.router.navigate(['/inventory']);
    } else {
      this.error = 'Invalid username or password';
    }
  }
}
