import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  deleteMe(){
    if (confirm('are you sure')){
      console.log('yes. delete confirmed');
    } else {
      console.log('no ');
    }
  }

}
