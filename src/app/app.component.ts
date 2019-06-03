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

  onCheckAppRoute() {
    if (this.router.url === '/auth/signup' || this.router.url === '/auth/signin'){
      this.onUserAuthPage = true;
    } else {
      this.onUserAuthPage = false;
    }
  }

  toggleSidenav(open: boolean){
    console.log(open);
  }
}
