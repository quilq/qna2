import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'qna2';
  previousUrl = '/';
  onUserAuthPage = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router) { }

  onCheckAppRoute() {
    if (this.router.url == this.previousUrl) {

      return;
    } else {
      if (this.router.url === '/auth/signup' || this.router.url === '/auth/signin') {
        this.onUserAuthPage = true;
      } else {
        this.onUserAuthPage = false;
      }

      if (isPlatformBrowser(this.platformId)) {
        window.scroll(0, 0);
      }
      this.previousUrl = this.router.url;
    }
  }
}
