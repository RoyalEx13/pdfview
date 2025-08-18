import { Routes } from '@angular/router';
import { PdfViewer } from './pages/pdf-viewer/pdf-viewer';
import { PageNotFound } from './pages/page-not-found/page-not-found';
import { PdfViewer2 } from './pages/pdf-viewer-2/pdf-viewer-2';

export const routes: Routes = [
  { path: '', redirectTo: '/table-du-sus/storm', pathMatch: 'full' },
  { path: 'table-du-sus/:name', component: PdfViewer },
  { path: 'pdf-test/:name', component: PdfViewer2 },
  { path: '404', component: PageNotFound },
  { path: '**', redirectTo: '404' }
];
