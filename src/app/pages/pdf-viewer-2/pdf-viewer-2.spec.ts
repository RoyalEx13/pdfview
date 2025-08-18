import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfViewer2 } from './pdf-viewer-2';

describe('PdfViewer2', () => {
  let component: PdfViewer2;
  let fixture: ComponentFixture<PdfViewer2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfViewer2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfViewer2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
