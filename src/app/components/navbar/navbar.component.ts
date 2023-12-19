import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
