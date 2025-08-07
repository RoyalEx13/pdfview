import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/reusableComponent/footer/footer';
import { sharedModule } from './core/shared/shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, sharedModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
