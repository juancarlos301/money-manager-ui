import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { AngularMaterialModule, AngularCommonModule } from '../../shared';
import { AuthService } from '../../services';
import { chPerm } from '../../helpers/role';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AngularMaterialModule, AngularCommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @ViewChild('sidenav')
  private sideMenu!: MatSidenav;
  logged = false;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    if (this._authService.validSessionToken()) {
      this.logged = true;
    }
  }

  onResize(event: Event): void {
    if (event.target instanceof Window) {
      let widthWindow: number = (event.target as Window).innerWidth;

      if (widthWindow > 800) {
        this.sideMenu.close();
      }
    }
  }

  logOut() {
    this._authService.logout();
  }

  checkPerm(profile: string[], strict?: boolean) {
    return chPerm(profile, this._authService.userInfo, !!strict);
  }
}
