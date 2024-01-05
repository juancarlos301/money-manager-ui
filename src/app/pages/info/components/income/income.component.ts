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
import { IncomeService } from '../../../../services';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [AngularMaterialModule, TableComponent],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss',
})
export class IncomeComponent {
  data: RegisterType[] = [];
  selectedIncome: null | RegisterType = null;

  colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'category', headerName: 'Category' },
    { field: 'value', headerName: 'Value' },
    { field: 'category_info.name', headerName: 'Name Category' },
  ];

  constructor(
    private dialog: MatDialog,
    private _incomeService: IncomeService
  ) {}

  ngOnInit(): void {
    this.getAllIncomes();
  }

  getAllIncomes() {
    this._incomeService.getAllIncomes().subscribe({
      next: ({ data }) => {
        this.data = data.incomes;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  handleGetSelectedIncome(income: RegisterType) {
    this.selectedIncome = income;
  }

  openAddModal(): void {
    const dataToModal = {
      data: null,
      module: CategoryPurpose.Incomes,
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
        if (result === 'income') {
          this.selectedIncome = null;
          this.getAllIncomes();
        }
      });
  }

  openEditModal() {
    const dataToModal = {
      data: this.selectedIncome,
      module: CategoryPurpose.Incomes,
      action: 'Edit',
    };

    this.selectedIncome!.value = Number(
      this.selectedIncome?.value.toString().replace(/[^0-9\.]+/g, '')
    );

    this.dialog
      .open(DynamicExpenseIncomeModalComponent, {
        disableClose: false,
        data: dataToModal as TranferDataModalType<RegisterType>,
        width: '40%',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'income') {
          this.selectedIncome = null;
          this.getAllIncomes();
        }
      });
  }

  deleteIncome(): void {
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
        this.selectedIncome!.deleted = true;

        this._incomeService.deleteIncome(this.selectedIncome!).subscribe({
          next: (data) => {
            if (data.success) {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your income has been deleted.',
                icon: 'success',
              });

              this.selectedIncome = null;
              this.getAllIncomes();
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
