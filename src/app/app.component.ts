import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgbModule,
    NgbNavModule,
    FontAwesomeModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todo';
  activeLink = '/';
  theme = 'office';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = event.url.match(/^\/edit\/\d+$/)
          ? '/edit'
          : event.url;
      }
    });
  }

  switchTheme() {
    switch (this.theme) {
      case 'office':
        this.theme = 'playful';
        break;
      case 'playful':
        this.theme = 'office';
        break;
    }
  }

  navigateTo(path: string) {
    this.activeLink = path;
    this.router.navigate([path]);
  }
}
