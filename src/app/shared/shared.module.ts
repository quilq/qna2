import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { NewAnswerComponent } from './new-answer/new-answer.component';
import { NewQuestionComponent } from './new-question/new-question.component';
import { SearchComponent } from './search/search.component';
import { MaterialModule } from '../material/material.module';
import { QuestionViewComponent } from './question-view/question-view.component';
import { QuestionDetailsViewComponent } from './question-details-view/question-details-view.component';
import { MarkdownPreviewComponent } from './markdown-preview/markdown-preview.component';
import { FeaturedQuestionsComponent } from './featured-questions/featured-questions.component';

@NgModule({
  declarations: [
    SearchComponent, 
    NewQuestionComponent, 
    NewAnswerComponent, 
    QuestionViewComponent, 
    QuestionDetailsViewComponent, 
    MarkdownPreviewComponent,
    FeaturedQuestionsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    MarkdownModule.forChild()
  ],
  exports: [
    SearchComponent, 
    NewQuestionComponent, 
    NewAnswerComponent,
    QuestionViewComponent, 
    QuestionDetailsViewComponent, 
    MarkdownPreviewComponent,
    FeaturedQuestionsComponent
  ]
})
export class SharedModule { }
