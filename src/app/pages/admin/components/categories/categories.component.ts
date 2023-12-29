import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';

import { TableComponent } from '../../../../components';
import { CategoriesService } from '../../../../services';
import { CategoryModalComponent } from '../../../../modals';
import { CategoryType } from '../../../../types';
import { AngularMaterialModule } from '../../../../shared';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TableComponent, MatDialogClose, AngularMaterialModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'purpose', headerName: 'Purpose' },
    { field: 'icon', headerName: 'Icon Angular' },
  ];

  data: CategoryType[] = [];
  selectedCategory: null | CategoryType = null;

  constructor(
    private _categoriesService: CategoriesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this._categoriesService.getAllCategories().subscribe({
      next: ({ data }) => {
        this.data = data.categories;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  handleGetSelectedCategory(category: CategoryType) {
    this.selectedCategory = category;
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      width: '40%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.selectedCategory = null;
        this.getAllCategories();
      }
    });
  }

  openEditModal() {
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      data: this.selectedCategory,
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.selectedCategory = null;
        this.getAllCategories();
      }
    });
  }
}
