import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: false
})
export class ResetPasswordPage {
  email: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.resetPassword(this.email);
  }
}
