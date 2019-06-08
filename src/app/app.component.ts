import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';

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
    private router: Router
  ) {
    router.events.pipe(
      filter(e => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
      if (e.url === this.previousUrl) {
        return;

      } else {
        if (e.url === '/auth/signup' || e.url === '/auth/signin') {
          this.onUserAuthPage = true;
        } else {
          this.onUserAuthPage = false;
        }

        if (isPlatformBrowser(this.platformId)) {
          window.scroll(0, 0);
        }

        this.previousUrl = e.url;
      }
      // console.log(e.id, e.url);
    });
  }

  // onCheckAppRoute() {
  //   if (this.router.url == this.previousUrl) {

  // }
}
