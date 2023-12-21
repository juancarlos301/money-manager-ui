import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

import { AuthService } from '../../services';
import { AuthUserType } from '../../types';
import { TableComponent } from '../../components';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'role', headerName: 'Role' },
  ];

  data: AuthUserType[] = [];

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {}

  getAllUsers() {
    this._authService.getAllUsers().subscribe({
      next: (data) => {
        this.data = data.users;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
