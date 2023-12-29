import { Component } from '@angular/core';
import { AngularCommonModule, AngularMaterialModule } from '../../shared';
import { ColDef } from 'ag-grid-community';
import {
  RegisterType,
  CategoryPurpose,
  TranferDataModalType,
} from '../../types';
import { MatDialog } from '@angular/material/dialog';
import { DynamicExpenseIncomeModalComponent } from '../../modals';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AngularCommonModule, AngularMaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private dialog: MatDialog) {}

  public columnDefs: ColDef[] = [
    { field: 'athlete' },
    { field: 'year', minWidth: 60 },
    { field: 'gold' },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
  };

  public rowData: any[] = [
    { athlete: 'athlete 1', year: '2020', gold: 35000 },
    { athlete: 'athlete 2', year: '2020', gold: 35000 },
    { athlete: 'athlete 3', year: '2020', gold: 35000 },
  ];

  addExpense(): void {
    const dataToModal = {
      data: null,
      module: CategoryPurpose.Expenses,
      action: 'Add',
    };

    this.dialog.open(DynamicExpenseIncomeModalComponent, {
      disableClose: false,
      data: dataToModal as TranferDataModalType<null>,
      width: '40%',
    });
  }

  addIncome(): void {
    const dataToModal = {
      data: null,
      module: CategoryPurpose.Incomes,
      action: 'Add',
    };

    this.dialog.open(DynamicExpenseIncomeModalComponent, {
      disableClose: false,
      data: dataToModal as TranferDataModalType<null>,
      width: '40%',
    });
  }
}
