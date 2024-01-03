import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';

import { AngularMaterialModule } from '../../../../shared';
import {
  CategoryPurpose,
  RegisterType,
  TranferDataModalType,
} from '../../../../types';
import { DynamicExpenseIncomeModalComponent } from '../../../../modals';
import { TableComponent } from '../../../../components';
import { ExpenseService } from '../../../../services';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [AngularMaterialModule, TableComponent],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss',
})
export class ExpenseComponent implements OnInit {
  data: RegisterType[] = [];
  selectedExpense: null | RegisterType = null;

  colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'category', headerName: 'Category' },
    { field: 'value', headerName: 'Value' },
  ];

  constructor(
    private dialog: MatDialog,
    private _expenseService: ExpenseService
  ) {}

  ngOnInit(): void {
    this.getAllExpenses();
  }

  getAllExpenses() {
    this._expenseService.getAllExpenses().subscribe({
      next: ({ data }) => {
        this.data = data.expenses;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  handleGetSelectedExpense(expense: RegisterType) {
    this.selectedExpense = expense;
  }

  openAddModal(): void {
    const dataToModal = {
      data: null,
      module: CategoryPurpose.Expenses,
      action: 'Add',
    };

    this.dialog
      .open(DynamicExpenseIncomeModalComponent, {
        disableClose: false,
        data: dataToModal as TranferDataModalType<null>,
        width: '40%',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'expense') {
          this.selectedExpense = null;
          this.getAllExpenses();
        }
      });
  }

  openEditModal() {
    const dataToModal = {
      data: this.selectedExpense,
      module: CategoryPurpose.Expenses,
      action: 'Edit',
    };

    this.selectedExpense!.value = Number(
      this.selectedExpense?.value.toString().replace(/[^0-9\.]+/g, '')
    );

    this.dialog
      .open(DynamicExpenseIncomeModalComponent, {
        disableClose: false,
        data: dataToModal as TranferDataModalType<RegisterType>,
        width: '40%',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'expense') {
          this.selectedExpense = null;
          this.getAllExpenses();
        }
      });
  }

  deleteExpense(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.selectedExpense!);

        this.selectedExpense!.deleted = true;

        this._expenseService.deleteExpense(this.selectedExpense!).subscribe({
          next: (data) => {
            if (data.success) {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your expense has been deleted.',
                icon: 'success',
              });

              this.selectedExpense = null;
              this.getAllExpenses();
            }
          },
          error: (error) => {
            console.error(error);
          },
        });
      }
    });
  }
}
