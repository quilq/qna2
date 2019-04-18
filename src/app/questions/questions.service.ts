import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Question, Answer } from './question.model';
import { UserService } from '../auth/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) { }

  //get questions
  getPopularQuestions = () => {
    let url = `api/q`;
    return this.httpClient.get(url);
  }

  //get recent questions
  getRecentQuestions = () => {
    let url = `api/q/recent-questions`;
    return this.httpClient.get(url);
  }

  //get popular tags
  getTags = () => {
    let url = `api/q/all-tags`;
    return this.httpClient.get(url);
  }

  getUnansweredQuestions = () => {
    let url = `api/q/unanswered-questions`;
    return this.httpClient.get(url);
  }

  //find questions by id
  findQuestionById = (id: string) => {
    let url = `api/q/id/${id}`;
    return this.httpClient.get(url);
  }

  //find questions by tag
  findQuestionsByTag = (tag: string) => {
    let url = `api/q/tag`;
    return this.httpClient.get(url, { headers: { 'tag': tag } });
  }

  //create question
  createQuestion = (question: Question) => {
    let url = `api/q/add`;
    let token = this.userService.getToken();
    return this.httpClient.post(url, question, { headers: { 'x-auth': token } });
  }

  //edit question
  editQuestion = (questionId: string, newQuestion: string) => {
    let url = `api/q/edit`;
    let token = this.userService.getToken();
    return this.httpClient.put(url, { questionId, newQuestion }, { headers: { 'x-auth': token } });
  }

  //upvote, downvote question
  voteQuestion = (questionId: string, upvote: boolean) => {
    let url = `api/q/vote`;
    let token = this.userService.getToken();
    return this.httpClient.put(url, { questionId, upvote }, { headers: { 'x-auth': token } });
  }

  //delete question
  deleteQuestion = (questionId: string) => {
    let url = `api/q/delete`;
    let token = this.userService.getToken();
    return this.httpClient.put(url, { questionId }, { headers: { 'x-auth': token } });
  }

  //add answer
  addAnswer = (questionId: string, newAnswer: Answer) => {
    let url = `api/a/add`;
    let token = this.userService.getToken();
    return this.httpClient.put(url, { questionId, newAnswer }, { headers: { 'x-auth': token } });
  }

  //edit answer
  editAnswer = (questionId: string, answerId: string, newAnswer: string) => {
    let url = `api/a/edit`;
    let token = this.userService.getToken();
    return this.httpClient.put(url, { questionId, answerId, newAnswer }, { headers: { 'x-auth': token } });
  }

  //update correct answer
  updateCorrectAnswer = (questionId: string, correctAnswerId: string) => {
    let url = `api/a/update`;
    let token = this.userService.getToken();
    return this.httpClient.put(url, { questionId, correctAnswerId }, { headers: { 'x-auth': token } });
  }

  //upvote, downvote answer
  voteAnswer = (questionId: string, answerId: string, upvote: boolean) => {
    let url = `api/a/vote`;
    let token = this.userService.getToken();
    return this.httpClient.put(url, { questionId, answerId, upvote }, { headers: { 'x-auth': token } });
  }

  //delete answer
  deleteAnswer = (questionId: string, answerId: string) => {
    let url = `api/a/delete`;
    let token = this.userService.getToken();
    return this.httpClient.put(url, { questionId, answerId }, { headers: { 'x-auth': token } });
  }
}