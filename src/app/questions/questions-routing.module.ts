import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionDetailsComponent } from './question-details/question-details.component';
import { TagsComponent } from './tags/tags.component';
import { UnansweredQuestionsComponent } from './unanswered-questions/unanswered-questions.component';
import { PopularQuestionsComponent } from './popular-questions/popular-questions.component';

const routes: Routes = [
  {
    path: 'questions/tags', component: TagsComponent, children: [
      { path: 'popular', component: PopularQuestionsComponent },
      { path: 'unanswered-questions', component: UnansweredQuestionsComponent },
      { path: 'question-details/:id', component: QuestionDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
