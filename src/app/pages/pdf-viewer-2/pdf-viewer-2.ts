import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer-2',
  imports: [],
  templateUrl: './pdf-viewer-2.html',
  styleUrl: './pdf-viewer-2.scss',
})
export class PdfViewer2 implements OnInit {
  pages: string[] = [];
  pagenum: number = 0;
  isFlippingNext = false;
  isFlippingNextHalf = false;
  isFlippingPrev = false;
  isFlippingPrevHalf = false;

  ngOnInit() {
    this.pages = Array.from(
      { length: 20 },
      (_, i) =>
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          i + 1
        }.png`
    );
  }

  next() {
    if (this.isFlippingNext || this.isFlippingPrev) {
      return;
    }
    if (this.pagenum < this.pages.length - 1) {
      this.isFlippingNext = true;
      setTimeout(() => (this.isFlippingNextHalf = true), 100);
      setTimeout(
        () => (
          (this.isFlippingNextHalf = false),
          (this.isFlippingNext = false),
          (this.pagenum += 2)
        ),
        200
      );
    }
  }

  prev() {
    if (this.isFlippingNext || this.isFlippingPrev) {
      return;
    }
    if (this.pagenum >= 1) {
      this.isFlippingPrev = true;
      setTimeout(() => (this.isFlippingPrevHalf = true), 100);
      setTimeout(
        () => (
          (this.isFlippingPrevHalf = false),
          (this.isFlippingPrev = false),
          (this.pagenum -= 2)
        ),
        200
      );
    }
  }
}
