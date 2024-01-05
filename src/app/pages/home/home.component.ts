import { Component } from '@angular/core';
import { AngularCommonModule, AngularMaterialModule } from '../../shared';
import { DashboardComponent } from './components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AngularCommonModule, AngularMaterialModule, DashboardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
