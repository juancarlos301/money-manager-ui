import { Component, Inject } from '@angular/core';
import {
  AngularMaterialModule,
  AngularCommonModule,
  ShowMessageService,
} from '../../shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExpensesOrIncomesType, modules, TranferDataModalType } from '../../types';

@Component({
  selector: 'app-dynamic-expense-income-modal',
  standalone: true,
  imports: [AngularCommonModule, AngularMaterialModule],
  templateUrl: './dynamic-expense-income-modal.component.html',
  styleUrl: './dynamic-expense-income-modal.component.scss'
})
export class DynamicExpenseIncomeModalComponent {

  myForm: FormGroup;
  module!: string;

  constructor(private fb: FormBuilder,
    private currentModal: MatDialogRef<DynamicExpenseIncomeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TranferDataModalType<ExpensesOrIncomesType>){
    this.myForm = this.fb.group(
      {
        value: ['', [Validators.required]],
        purpose : ['', [Validators.required]],
        category: ['', [Validators.required]],
      }
    );

    this.module = data.module;

  }

}
