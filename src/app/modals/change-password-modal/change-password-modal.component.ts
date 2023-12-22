import { Component, Inject } from '@angular/core';
import { AngularMaterialModule, AngularCommonModule, ShowMessageService } from '../../shared';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecoverPasswordService } from '../../services';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChangePasswordType } from '../../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password-modal',
  standalone: true,
  imports: [AngularMaterialModule, AngularCommonModule],
  templateUrl: './change-password-modal.component.html',
  styleUrl: './change-password-modal.component.scss'
})
export class ChangePasswordModalComponent  {

  myFormChangePass: FormGroup;
  loading = false;
  email: string = '';
  modalChangePasswordSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private _changeService: RecoverPasswordService,
    private _showMessageService: ShowMessageService,
    private route: Router,
    private currentModal: MatDialogRef<ChangePasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.myFormChangePass = this.fb.group({
      restorePasscode: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },
    {
      validators: [validateFields]
    });

    this.email = data;
  }


  changePassword():void{
    
    this.loading = true;
    const changePasswordData = {
      email: this.email,
      password: this.myFormChangePass?.get('password')?.value || '',
      restoreCode: this.myFormChangePass?.get('restorePasscode')?.value || ''
    };

    this._changeService.changePassword(changePasswordData as ChangePasswordType).subscribe({
      next: (res) => {

        if(res.success){
          this.currentModal.close();
          this._showMessageService.showMessage('The password was changed successfully.', 2000);
          this.route.navigate(['/login']);
        }

        this.loading = false;
        
      },
      error: (error) => {
        this.loading = false;
        this._showMessageService.showMessage('Failed to change password, please try again.', 2000);
      },
    });

  }

}


function validateFields(control: AbstractControl) {
  return control.get('password')?.value === control.get('confirmPassword')?.value ? null : { misMatch: true};
}