import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  onNewQuestionPage = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onCheckQuestionRoute() {
    if (this.router.url == '/questions/new-question'){
      this.onNewQuestionPage = true;
    } else {
      this.onNewQuestionPage = false;
    }
  }

  newQuestion(){
    this.router.navigate(['questions/new-question']);
  }

}
