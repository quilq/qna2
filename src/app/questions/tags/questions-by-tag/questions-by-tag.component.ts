import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Question } from '../../question.model';
import { QuestionState } from '../../store/question.reducers';
import { getQuestionsByTag } from '../../store/question.selectors';
import { ActivatedRoute } from '@angular/router';
import { OnFindQuestionsByTag } from '../../store/question.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-questions-by-tag',
  templateUrl: './questions-by-tag.component.html',
  styleUrls: ['./questions-by-tag.component.scss']
})
export class QuestionsByTagComponent implements OnInit {

  questionsByTag$: Observable<Question[]> ;
  tag: string;
  
  constructor(
    private questionStore: Store<QuestionState>,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.tag = this.activatedRoute.snapshot.paramMap.get('tag');
    this.questionStore.dispatch(new OnFindQuestionsByTag({tag: this.tag}));
    this.questionsByTag$ = this.questionStore.select(getQuestionsByTag);
  }

}
