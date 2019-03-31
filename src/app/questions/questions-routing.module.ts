import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionDetailsComponent } from './question-details/question-details.component';
import { TagsComponent } from './tags/tags.component';
import { UnansweredQuestionsComponent } from './unanswered-questions/unanswered-questions.component';
import { QuestionsComponent } from './questions.component';
import { PopularQuestionsComponent } from './popular-questions/popular-questions.component';

const routes: Routes = [
  {
    path: 'questions', component: QuestionsComponent, children: [
      { path: '', component: PopularQuestionsComponent },
      { path: 'tags', component: TagsComponent },
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
