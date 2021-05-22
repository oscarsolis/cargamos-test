import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly CLOSE = 'X';

  constructor(private readonly snackBar: MatSnackBar) { }

  private config(css: Array<string>, withTimeout: boolean): any {
    return {
      duration: withTimeout ? 3000 : 0,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: css,
    };
  }

  public success(message: string, withTimeout = true): void {
    this.snackBar.open(message, this.CLOSE, this.config(['notification', 'notification--success'], withTimeout));
  }

  public error(message: string, withTimeout = true): void {
    this.snackBar.open(message, this.CLOSE, this.config(['notification', 'notification--error'], withTimeout));
  }

  public info(message: string, withTimeout = true): void {
    this.snackBar.open(message, this.CLOSE, this.config(['notification', 'notification--info'], withTimeout));
  }

}
