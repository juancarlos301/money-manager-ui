import { Component, Inject, OnInit } from '@angular/core';
import {
  AngularMaterialModule,
  AngularCommonModule,
  ShowMessageService,
} from '../../shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {
  RegisterType,
  CategoryType,
  TranferDataModalType,
  CategoryPurpose,
} from '../../types';
import {
  CategoriesService,
  ExpenseService,
  IncomeService,
} from '../../services';

@Component({
  selector: 'app-dynamic-expense-income-modal',
  standalone: true,
  imports: [AngularCommonModule, AngularMaterialModule],
  templateUrl: './dynamic-expense-income-modal.component.html',
  styleUrl: './dynamic-expense-income-modal.component.scss',
})
export class DynamicExpenseIncomeModalComponent implements OnInit {
  myForm: FormGroup;
  module!: string;
  action: string;
  categories: CategoryType[] = [];
  optionSelected: number = -1;
  title: string = '';
  loading: boolean = false;
  id: number = -1;
  tranferedData: RegisterType | null = null;

  constructor(
    private fb: FormBuilder,
    private _expenseService: ExpenseService,
    private _categoriesService: CategoriesService,
    private _incomeService: IncomeService,
    private _showMessageService: ShowMessageService,
    private currentModal: MatDialogRef<DynamicExpenseIncomeModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: TranferDataModalType<RegisterType>
  ) {
    this.myForm = this.fb.group({
      value: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });

    this.action = data.action;
    this.module = data.module;

    this.tranferedData = data.data;
  }
  ngOnInit(): void {
    if (this.module == CategoryPurpose.Expenses) {
      if (this.action == 'Add') {
        this.id = -1;
        this.title = 'Add expense';
      } else {
        this.id = this.tranferedData?.id || 0;
        this.title = 'Edit expense';

        this.myForm.setValue({
          value: this.tranferedData?.value,
          category: this.tranferedData?.category,
        });
      }
    } else {
      if (this.action == 'Add') {
        this.id = -1;
        this.title = 'Add income';
      } else {
        this.id = this.tranferedData?.id || 0;
        this.title = 'Edit income';

        this.myForm.setValue({
          value: this.tranferedData?.value,
          category: this.tranferedData?.category,
        });
      }
    }

    this._categoriesService
      .getAllCategories({ purpose: this.module })
      .subscribe({
        next: ({ data }) => {
          this.categories = data.categories;
          if (this.action == 'Edit')
            this.optionSelected = this.tranferedData?.category || 0;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  selectOption(id?: number): void {
    this.optionSelected = id as number;
  }

  doTask(): void {
    this.loading = true;

    const dataCategoryOrIncome = {
      id: this.id,
      value: this.myForm?.get('value')?.value || '',
      category: this.myForm?.get('category')?.value || '',
      purpose: this.module == CategoryPurpose.Expenses ? 'expenses' : 'incomes',
    };

    if (this.module == CategoryPurpose.Expenses) {
      if (this.action == 'Add') {
        this.addExpense(dataCategoryOrIncome as RegisterType);
      } else {
        this.editExpense(dataCategoryOrIncome as RegisterType);
      }
    } else {
      if (this.action == 'Add') {
        this.addIncome(dataCategoryOrIncome as RegisterType);
      } else {
        this.editIncome(dataCategoryOrIncome as RegisterType);
      }
    }
  }

  addExpense(data: RegisterType): void {
    this._expenseService.addExpense(data).subscribe({
      next: (res) => {
        if (res.success) {
          this.currentModal.close('expense');

          this._showMessageService.showMessage(
            'Expense was added successfully.',
            4000
          );
        }

        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this._showMessageService.showMessage(
          'Failed to add expense, please try again.',
          2000
        );
      },
    });
  }

  editExpense(data: RegisterType): void {
    this._expenseService.editExpense(data).subscribe({
      next: (res) => {
        if (res.success) {
          this.currentModal.close('expense');

          this._showMessageService.showMessage(
            'Expense was edited successfully.',
            4000
          );
        }

        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this._showMessageService.showMessage(
          'Failed to edit expense, please try again.',
          2000
        );
      },
    });
  }

  addIncome(data: RegisterType): void {
    this._incomeService.addIncome(data).subscribe({
      next: (res) => {
        if (res.success) {
          this.currentModal.close('income');

          this._showMessageService.showMessage(
            'Income was added successfully.',
            4000
          );
        }

        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this._showMessageService.showMessage(
          'Failed to add income, please try again.',
          2000
        );
      },
    });
  }

  editIncome(data: RegisterType): void {
    this._incomeService.editIncome(data).subscribe({
      next: (res) => {
        if (res.success) {
          this.currentModal.close('income');

          this._showMessageService.showMessage(
            'Income was edited successfully.',
            4000
          );
        }

        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this._showMessageService.showMessage(
          'Failed to edit income, please try again.',
          2000
        );
      },
    });
  }
}
