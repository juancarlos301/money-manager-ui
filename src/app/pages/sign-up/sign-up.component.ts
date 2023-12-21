import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AngularCommonModule, AngularMaterialModule } from '../../shared';
import { AuthService } from '../../services';
import { AuthUserType } from '../../types';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [AngularCommonModule, AngularMaterialModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
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
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  signUp() {
    this.loading = true;
    const user = {
      name: this.myForm?.get('name')?.value || '',
      email: this.myForm?.get('email')?.value || '',
      password: this.myForm?.get('password')?.value || '',
      role: 'superadmin',
    };

    this._authService.singup(user as AuthUserType).subscribe({
      next: (res) => {
        this.openSnackBar('you signed up successfully.', '');

        setTimeout(() => {
          this.loading = false;
          this.route.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
        this.openSnackBar('Failed to sign up, please try again.', '');
      },
    });
  }
}
