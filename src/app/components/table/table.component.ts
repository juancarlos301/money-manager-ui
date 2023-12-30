import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T> {
  @Input() columns: ColDef[] = [];
  @Input() data: T[] = [];

  @Output() selectedRow = new EventEmitter<T>();

  private gridApi!: GridApi<T>;

  handleGetSelectedRows() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows) {
      this.selectedRow.emit(selectedRows[0]);
    }
    console.log(selectedRows);
  }

  onGridReady(params: GridReadyEvent<T>) {
    this.gridApi = params.api;
  }
}
