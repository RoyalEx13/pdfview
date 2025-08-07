import { Component, OnInit } from '@angular/core';
import { sharedModule } from '../../core/shared/shared';
import { OnedrivePdfService } from '../../core/services/onedrive-pdf.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer',
  imports: [sharedModule],
  templateUrl: './pdf-viewer.html',
  styleUrl: './pdf-viewer.scss',
})
export class PdfViewer implements OnInit {
  isLoading: boolean = true;
  documentName:string = '';
  pdfFile: Blob = new Blob();
  pdfUrl: string = '';
  sanitizedPdfUrl: SafeResourceUrl | null = null;



  constructor(
    private route: ActivatedRoute,
    private pdfService: OnedrivePdfService,
    private spinner:  NgxSpinnerService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.documentName = params.get('name') || '';
      if (this.documentName) {
        this.fetchPdfUrl();
      }
    });
  }

  fetchPdfUrl() {
    this.showSpinner();
    this.pdfService.fetchPdfUrl(this.documentName).subscribe({
      next: (res: Blob) => {
        this.pdfFile = res;
        this.hideSpinner();
      },
      error: (err) => {
        console.error('Failed to load PDF:', err);
        this.hideSpinner();
      },
    });
  }

  showSpinner() {
    this.isLoading = true;
    this.spinner.show();
  }

  hideSpinner() {
    this.isLoading = false;
    this.spinner.hide();
  }
}
