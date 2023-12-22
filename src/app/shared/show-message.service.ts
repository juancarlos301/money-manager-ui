import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ShowMessageService {

  constructor(private _snackBar: MatSnackBar) { }

  showMessage(message: string, duration: number): void {
    this._snackBar.open(message, '', { duration: duration });
  }
  
}
