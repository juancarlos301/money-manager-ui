import { Component, OnInit } from '@angular/core';

import { AngularCommonModule, AngularMaterialModule } from '../../shared';
import { ExpenseComponent } from './components/expense';
import { IncomeComponent } from './components/income';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    AngularCommonModule,
    AngularMaterialModule,
    ExpenseComponent,
    IncomeComponent,
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent implements OnInit {
  currentTabIndex: number = 0;

  constructor(private _route: ActivatedRoute) {}
  ngOnInit(): void {
    const index: number = +this._route.snapshot.paramMap.get('index')!;
    this.currentTabIndex = index;
  }
}
