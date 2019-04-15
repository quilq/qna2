import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Question } from '../../question.model';
import { QuestionState } from '../../store/question.reducers';
import { getQuestionsByTag } from '../../store/question.selectors';
import { ActivatedRoute } from '@angular/router';
import { OnFindQuestionsByTag } from '../../store/question.actions';

@Component({
  selector: 'app-questions-by-tag',
  templateUrl: './questions-by-tag.component.html',
  styleUrls: ['./questions-by-tag.component.scss']
})
export class QuestionsByTagComponent implements OnInit {

  questionsByTag: Question[];
  tag: string;
  
  constructor(
    private questionStore: Store<QuestionState>,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    console.log('question by tag component init');
    
    this.tag = this.activatedRoute.snapshot.paramMap.get('tag');
    console.log('this tag: ', this.tag);

    this.questionStore.dispatch(new OnFindQuestionsByTag({tag: this.tag}));

    this.questionStore.select(getQuestionsByTag).subscribe(questionByTag => {
      this.tag = questionByTag.tag;
      console.log('tag ', this.tag);
      this.questionsByTag = questionByTag.questions;
      console.log('questions by tag ', this.questionsByTag); 
    });
  }

}
