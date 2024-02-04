import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  dialog = inject(MatDialog);

  showMessageError(errorMessage: string) {
    this.dialog.open(ErrorMessageComponent, {
      data: {
        errorMessage,
        closeDialog: () => this.dialog.closeAll(),
      },
    });
  }
}
