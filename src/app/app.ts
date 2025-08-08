import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/reusableComponent/footer/footer';
import { sharedModule } from './core/shared/shared';
import { Navbar } from './shared/reusableComponent/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [sharedModule,RouterOutlet, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
