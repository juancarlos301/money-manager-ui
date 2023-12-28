import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AgGridModule],
  exports: [CommonModule, ReactiveFormsModule, RouterModule, AgGridModule],
})
export class AngularCommonModule {}
