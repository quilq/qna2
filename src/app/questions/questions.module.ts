import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { TagsComponent } from './tags/tags.component';
import { UnansweredQuestionsComponent } from './unanswered-questions/unanswered-questions.component';

@NgModule({
  declarations: [QuestionsComponent, QuestionDetailsComponent, TagsComponent, UnansweredQuestionsComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule
  ]
})
export class QuestionsModule { }
