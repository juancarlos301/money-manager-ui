import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AngularCommonModule, AngularMaterialModule } from '../../shared';
import { AuthService } from '../../services';
import { AuthUserType } from '../../types';
import { MatDialog } from '@angular/material/dialog';

import { RecoverPassworsModalComponent } from '../../modals';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AngularCommonModule, AngularMaterialModule],
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
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.myForm = this.fb.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }

  logIn() {
    this.loading = true;
    const user = {
      email: this.myForm?.get('email')?.value || '',
      password: this.myForm?.get('password')?.value || '',
    };

    this._authService.login(user as AuthUserType).subscribe({
      next: (res) => {
        this.loading = false;
        this.route.navigate(['/']);
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
        this.openSnackBar('Failed to log in, please try again.', '');
      },
    });
  }

  showModalRecoverPass():void{

    this.dialog.open(RecoverPassworsModalComponent, {
      disableClose: false,
      width: '40%'
    });

  }
}
