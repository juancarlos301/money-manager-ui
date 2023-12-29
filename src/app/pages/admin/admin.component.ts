import { Component } from '@angular/core';

import { AngularMaterialModule } from '../../shared';
import { CategoriesComponent, UsersComponent } from './components';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AngularMaterialModule, UsersComponent, CategoriesComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}
