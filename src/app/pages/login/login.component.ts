import { Component } from '@angular/core';
import { AngularCommonModule } from '../../shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatFormFieldModule } from '@angular/material/form-field'; // change this for angular module
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../services';
import { AuthUserType } from '../../types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    AngularCommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  myForm!: FormGroup;
  hide = true;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) {
    this.myForm = this.fb.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  logIn() {
    console.log(this.myForm);

    this.loading = true;
    const user = {
      email: this.myForm?.get('email')?.value || '',
      password: this.myForm?.get('password')?.value || '',
    };

    this._authService.login(user as AuthUserType).subscribe({
      next: (res) => {
        console.log(res);

        this.openSnackBar('you logged in successfully.', '');

        setTimeout(() => {
          this.loading = false;
          this.route.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
        this.openSnackBar('Failed to log in, please try again.', '');
      },
    });
  }
}
