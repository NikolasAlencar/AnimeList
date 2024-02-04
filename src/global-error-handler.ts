import { ErrorHandler, Injectable, inject } from '@angular/core';
import { AlertService } from './app/services/alert.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  alertService = inject(AlertService);

  handleError(error: any): void {
    this.alertService.showMessageError(error.message);
  }
}
