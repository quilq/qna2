import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsComponent } from './questions.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';

const routes: Routes = [
  {path: 'questions', component: QuestionsComponent},
  {path: 'question-details', component: QuestionDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
