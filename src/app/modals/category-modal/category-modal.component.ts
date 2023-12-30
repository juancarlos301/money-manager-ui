import { Component, Input, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogClose,
} from '@angular/material/dialog';

import { AngularMaterialModule, AngularCommonModule } from '../../shared';
import { CategoryPurpose, CategoryType } from '../../types';
import { CategoriesService } from '../../services';

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [AngularMaterialModule, AngularCommonModule, MatDialogClose],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss',
})
export class CategoryModalComponent implements OnInit {
  @Input() categoryType!: string;

  myForm!: FormGroup;
  options = [CategoryPurpose.Expenses, CategoryPurpose.Incomes];
  loading = false;

  constructor(
    private _categoriesService: CategoriesService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryType
  ) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      purpose: ['', [Validators.required]],
      icon: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.myForm.setValue({
        name: this.data.name,
        icon: this.data.icon,
        purpose: this.data.purpose,
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }

  saveCategory() {
    this.loading = true;

    const newCategory = {
      name: this.myForm?.get('name')?.value || '',
      purpose: this.myForm?.get('purpose')?.value || '',
      icon: this.myForm?.get('icon')?.value || '',
    };
    if (this.data) {
      this.editCategory(newCategory);
    } else {
      this.createCategory(newCategory);
    }
  }

  createCategory(newCategory: CategoryType) {
    this._categoriesService.createCategory(newCategory).subscribe({
      next: (res) => {
        if (res.success) {
          this.openSnackBar('success to create.', '');
          this.onNoClick('success');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
        this.openSnackBar('Failed to create, please try again.', '');
      },
    });
  }

  editCategory(newCategory: CategoryType) {
    this._categoriesService
      .updateCategory({ ...newCategory, id: this.data.id })
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.openSnackBar('success to edit.', '');
            this.onNoClick('success');
          }
          this.loading = false;
        },
        error: (error) => {
          console.error(error);
          this.loading = false;
          this.openSnackBar('Failed to edit, please try again.', '');
        },
      });
  }

  onNoClick(message?: string): void {
    this.dialogRef.close(message);
  }
}
