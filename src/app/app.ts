import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header }       from './shared/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ Header, RouterOutlet ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}
