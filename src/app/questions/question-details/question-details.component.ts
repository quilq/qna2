import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Question } from '../question.model';
import { QuestionState } from '../store/question.reducers';
import { getQuestionById } from '../store/question.selectors';
import * as QuestionActions from '../store/question.actions';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {
  question$: Observable<Question>;

  constructor(
    // @Inject(PLATFORM_ID) private platformId: Object,
    private questionStore: Store<QuestionState>,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(() => { this.updateView() });
  }

  ngOnInit() {
  }

  updateView() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.questionStore.dispatch(QuestionActions.onFindQuestionById({ id }));
    this.question$ = this.questionStore.select(getQuestionById);

    //scroll to top
    // if (isPlatformBrowser(this.platformId)) {
      // window.scroll(0, 0);
    // }
  }

}
