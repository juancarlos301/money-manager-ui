import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent, FooterComponent } from './components';

import { AuthService } from './services';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'money-manager-ui';
  isLogged = false;

  constructor(private _authService: AuthService) {
    this.isLogged = !!this._authService.validSessionToken();
  }
}
