import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

import { TableComponent } from '../../../../components';
import { AuthService } from '../../../../services';
import { AuthUserType } from '../../../../types';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
  ];

  data: AuthUserType[] = [];

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this._authService.getAllUsers().subscribe({
      next: ({ data }) => {
        this.data = data.users;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
