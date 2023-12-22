import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AngularMaterialModule, AngularCommonModule, ShowMessageService } from '../../shared';

import { RecoverPasswordService } from '../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChangePasswordModalComponent } from '../change-password-modal';

@Component({
  selector: 'app-recover-passwors-modal',
  standalone: true,
  imports: [AngularCommonModule, AngularMaterialModule],
  templateUrl: './recover-passwors-modal.component.html',
  styleUrl: './recover-passwors-modal.component.scss',
})
export class RecoverPassworsModalComponent {
  myFormRecover: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private _recoverPasswordService: RecoverPasswordService,
    private _showMessageService: ShowMessageService,
    private _snackBar: MatSnackBar,
    private currentModal: MatDialogRef<RecoverPassworsModalComponent>,
    private dialog: MatDialog
  ) {
    this.myFormRecover = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  recoverPassword(): void {
    this.loading = true;
    const email: string = this.myFormRecover?.get('email')?.value || '';

    this._recoverPasswordService.recoverPassword(email).subscribe({
      next: (res) => {
        if (res.success) {
          this.currentModal.close('true');

          this._showMessageService.showMessage('A passcode was send to the email.', 4000);

          this.dialog.open(ChangePasswordModalComponent, {
            disableClose: true,
            data: email,
            width: '40%',
          });
        }

        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this._showMessageService.showMessage('Failed to recover password, please try again.', 2000);
      },
    });
  }

}
