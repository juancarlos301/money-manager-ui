import { Component } from '@angular/core';
import { AngularMaterialModule, AngularCommonModule } from '../../../../shared';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AngularMaterialModule, AngularCommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
