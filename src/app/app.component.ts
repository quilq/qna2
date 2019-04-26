import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'qna2';

  onUserAuthPage = false;

  constructor(private router: Router){}

  onActivate() {
    if (this.router.url === '/signup' || this.router.url === '/signin'){
      this.onUserAuthPage = true;
    } else {
      this.onUserAuthPage = false;
    }
  }
}
