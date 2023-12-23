import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

import { NavbarComponent, FooterComponent } from './components';

import { AuthService } from './services';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'money-manager-ui';
  userInfoSubscription: Subscription = new Subscription();
  logged: boolean = false;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    if (this._authService.validSessionToken()) {
      this.logged = true;
    }
    console.log(this.logged);

    this._authService.checkCurrentUserInfo();
    this.userInfoSubscription = this._authService.userInfoChanged.subscribe(
      () => {
        if (this._authService.validSessionToken()) {
          this.logged = true;
        } else {
          this.logged = false;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.userInfoSubscription.unsubscribe();
  }
}
