import { Component } from '@angular/core';
import { AngularCommonModule, AngularMaterialModule } from '../../shared';
import { ColDef } from 'ag-grid-community';
import { RegisterType } from '../../types';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseService } from '../../services';

import { ExpenseComponent } from './expense';
import { IncomeComponent } from './income';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AngularCommonModule,
    AngularMaterialModule,
    ExpenseComponent,
    IncomeComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
