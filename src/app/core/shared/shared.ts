import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DecimalPipe } from '@angular/common';

export const sharedModule = [
  NgxExtendedPdfViewerModule,
  NgxSpinnerModule,
  DecimalPipe
];
