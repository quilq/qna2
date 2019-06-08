import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'questions-questions-tags',
  templateUrl: './questions-tags.component.html',
  styleUrls: ['./questions-tags.component.scss']
})
export class QuestionsTagsComponent implements OnInit {

  constructor(
    // @Inject(PLATFORM_ID) private platformId: Object
    ) { }

  ngOnInit() {
    // if (isPlatformBrowser(this.platformId)) {
      // window.scroll(0, 0);
    // }
  }

}
