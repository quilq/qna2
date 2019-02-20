import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionDetailsComponent } from './question-details/question-details.component';
import { TagsComponent } from './tags/tags.component';
import { UnansweredQuestionsComponent } from './unanswered-questions/unanswered-questions.component';

const routes: Routes = [
  {path: 'questions/tags', component: TagsComponent},
  {path: 'questions/unanswered-questions', component: UnansweredQuestionsComponent},
  {path: 'questions/question-details/:id', component: QuestionDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
