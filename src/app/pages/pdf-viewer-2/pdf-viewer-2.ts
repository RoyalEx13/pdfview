import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { environment } from '../../environment/environment';
import { sharedModule } from '../../core/shared/shared';

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

@Component({
  selector: 'app-pdf-viewer-2',
  imports: [sharedModule],
  templateUrl: './pdf-viewer-2.html',
  styleUrl: './pdf-viewer-2.scss',
})
export class PdfViewer2 implements OnInit, AfterViewInit {
  @ViewChild('flipbookContainer', { static: true })
  flipbookContainer!: ElementRef<HTMLDivElement>;

  pages: string[] = [];
  displayPageIndex: number = 0;
  selectedPageIndex: number = 0;
  isFlippingNext = false;
  isFlippingNextHalf = false;
  isFlippingPrev = false;
  isFlippingPrevHalf = false;
  zoomLevel = 1;
  offsetX = 0;
  offsetY = 0;
  startX = 0;
  startY = 0;
  isDragging = false;
  documentName: string = '';
  isLoading: boolean = true;
  sidebarOpen: boolean = true;
  pdfUrl: string = '';
  clickThreshold = 5;

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.showSpinner();
    const baseUrl = environment.blobStoragePdfUrl;
    const blobSasToken = environment.blobSasToken;
    document.addEventListener('mouseup', this.endDrag.bind(this));

    this.route.paramMap.subscribe((params) => {
      this.documentName = params.get('name') || '';
      if (this.documentName) {
        this.pdfUrl = `${baseUrl}/${this.documentName}.pdf?${blobSasToken}`;

        this.getPdfTotalPages(this.pdfUrl).then(async (numPages) => {
          const promises = Array.from({ length: numPages }, (_, i) =>
            this.convertPdfPageToImage(this.pdfUrl, i + 1, 300)
          );

          this.pages = await Promise.all(promises).then((pages) => {
            this.hideSpinner();
            return pages;
          });
        });
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.offsetX = 0;
      this.offsetY = 0;
    });
  }

  next(): void {
    if (this.isFlippingNext || this.isFlippingPrev) {
      return;
    }
    if (this.displayPageIndex < this.pages.length - 1) {
      this.isFlippingNext = true;
      setTimeout(() => (this.isFlippingNextHalf = true), 100);
      setTimeout(
        () => (
          (this.isFlippingNextHalf = false),
          (this.isFlippingNext = false),
          (this.displayPageIndex += 2),
          (this.selectedPageIndex = this.pages?.[this.displayPageIndex]
            ? this.displayPageIndex
            : this.displayPageIndex - 1)
        ),
        200
      );
    }
  }

  prev(): void {
    if (this.isFlippingNext || this.isFlippingPrev) {
      return;
    }
    if (this.displayPageIndex >= 1) {
      this.isFlippingPrev = true;
      setTimeout(() => (this.isFlippingPrevHalf = true), 100);
      setTimeout(
        () => (
          (this.isFlippingPrevHalf = false),
          (this.isFlippingPrev = false),
          (this.displayPageIndex -= 2),
          (this.selectedPageIndex = this.displayPageIndex)
        ),
        200
      );
    }
  }

  async convertPdfPageToImage(
    pdfUrl: string,
    displayPageIndexber: number,
    dpi: number = 300
  ): Promise<string> {
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(displayPageIndexber);

    const viewport = page.getViewport({ scale: dpi / 72 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    await page.render(renderContext).promise;

    return canvas.toDataURL('image/png');
  }

  async getPdfTotalPages(pdfUrl: string): Promise<number> {
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    return pdf.numPages;
  }

  zoomIn() {
    this.zoomLevel += 0.5;
  }

  zoomOut() {
    if (this.zoomLevel >= 1.5) {
      this.zoomLevel -= 0.5;
    }
    if (this.zoomLevel == 1) {
      this.resetZoom();
    }
  }

  resetZoom() {
    this.zoomLevel = 1;
    this.isDragging = false;

    this.offsetX = 0;
    this.offsetY = 0;
  }

  startDrag(event: MouseEvent) {
    this.isDragging = true;
    const flipbook = this.flipbookContainer.nativeElement.querySelector(
      '.flipbook'
    ) as HTMLElement;
    flipbook.style.transition = 'none';

    this.startX = event.clientX - this.offsetX;
    this.startY = event.clientY - this.offsetY;

    event.preventDefault();
  }

  onDrag(event: MouseEvent) {
    if (!this.isDragging || this.zoomLevel === 1) return;

    let newX = event.clientX - this.startX;
    let newY = event.clientY - this.startY;

    const container = this.flipbookContainer.nativeElement as HTMLElement;
    const flipbook = container.querySelector('.flipbook') as HTMLElement;

    const scaledWidth =
      this.zoomLevel === 1
        ? 0
        : flipbook.clientWidth * (this.zoomLevel * 0.1 + 0.05);

    const scaledHeight =
      this.zoomLevel === 1
        ? 0
        : flipbook.clientHeight * (this.zoomLevel * 0.1 + 0.05);

    const minX = Math.min(0, -scaledWidth);
    const maxX = Math.max(0, scaledWidth);
    const minY = Math.min(0, -scaledHeight);
    const maxY = Math.max(0, scaledHeight);

    this.offsetX = Math.min(maxX, Math.max(minX, newX));
    this.offsetY = Math.min(maxY, Math.max(minY, newY));
  }

  endDrag(event: MouseEvent) {
    const flipbook = this.flipbookContainer.nativeElement.querySelector(
      '.flipbook'
    ) as HTMLElement;
    flipbook.style.transition = 'transform 0.3s ease-in-out';

    if (this.zoomLevel === 1) {
      const dx = Math.abs(event.clientX - (this.startX + this.offsetX));
      const dy = Math.abs(event.clientY - (this.startY + this.offsetY));

      if (dx < this.clickThreshold && dy < this.clickThreshold) {
        const container = this.flipbookContainer.nativeElement as HTMLElement;
        const containerRect = container.getBoundingClientRect();
        const clickX = event.clientX - containerRect.left;

        if (clickX < containerRect.width / 2) {
          this.prev();
        } else {
          this.next();
        }
      }
    }

    this.isDragging = false;
  }

  showSpinner(): void {
    this.isLoading = true;
    this.spinner.show();
  }

  hideSpinner(): void {
    this.isLoading = false;
    this.spinner.hide();
  }

  goToPage(idx: number): void {
    this.selectedPageIndex = idx;

    this.displayPageIndex =
      this.selectedPageIndex % 2 === 0
        ? this.selectedPageIndex
        : this.selectedPageIndex + 1;
    this.isFlippingNext = false;
    this.isFlippingPrev = false;
    this.isFlippingNextHalf = false;
    this.isFlippingPrevHalf = false;
  }

  toggleSideBar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  downloadPdf(): void {
    if (!this.pdfUrl) return;

    fetch(this.pdfUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.pdfUrl.split('/').pop()?.split('?')[0] || 'pdf.pdf';
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch((err) => console.error('Download failed', err));
  }
}
