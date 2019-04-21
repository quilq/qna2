import { Component, OnInit, Input } from '@angular/core';

import { Question } from '../../questions/question.model';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss']
})
export class QuestionViewComponent implements OnInit {

  @Input() questions: Question[]

  constructor() { }

  ngOnInit() {
  }

}
