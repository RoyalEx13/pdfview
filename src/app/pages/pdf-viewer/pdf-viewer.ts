import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { sharedModule } from '../../core/shared/shared';
import { PdfService } from '../../core/services/pdf.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-pdf-viewer',
  imports: [sharedModule],
  templateUrl: './pdf-viewer.html',
  styleUrl: './pdf-viewer.scss',
})
export class PdfViewer implements OnInit {
  @ViewChild('flipbookContainer', { static: true })
  container!: ElementRef<HTMLDivElement>;
  isLoading: boolean = true;
  documentName: string = '';
  pdfFile: Blob = new Blob();
  pdfUrl: string = '';
  images: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private pdfService: PdfService,
    private spinner: NgxSpinnerService,
    private router: Router
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
    this.pdfService.blobStorage(this.documentName).subscribe({
      next: (res: Blob) => {
        this.pdfFile = res;
        this.hideSpinner();
      },
      error: (err) => {
        console.error('Failed to load PDF:', err);
        this.hideSpinner();
        this.router.navigate(['/']);
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
