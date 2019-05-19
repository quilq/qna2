import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Question, Answer } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getToken() {
    return localStorage.getItem('token');
  }
  
  getPopularQuestions = (next: number) => {
    let url = `api/q`;
    return this.httpClient.get(url, {params: {'next': next.toString()} });
  }

  getRelatedQuestions = (tags: string[]) => {
    let url = `api/q/related-questions`;
    return this.httpClient.get(url, {params: {'tags': tags} });
  }

  findQuestionById = (id: string) => {
    let url = `api/q/id/${id}`;
    return this.httpClient.get(url);
    // let url = `api/q/id`;
    // return this.httpClient.get(url, {params: {'id': id}});
  }

  getRecentQuestions = (next: number) => {
    let url = `api/q/recent-questions`;
    return this.httpClient.get(url, {params: {'next': next.toString()}});
  }

  getFeaturedQuestions = () => {
    let url = `api/q/featured-questions`;
    return this.httpClient.get(url);
  }

  getTags = () => {
    let url = `api/q/all-tags`;
    return this.httpClient.get(url);
  }

  getUnansweredQuestions = (next: number) => {
    let url = `api/q/unanswered-questions`;
    return this.httpClient.get(url, {params: {'next': next.toString()}});
  }

  findQuestionsByTag = (tag: string, next: number) => {
    let url = `api/q/tag`;
    // const option = {params: new HttpParams().set('tag', tag)};
    // return this.httpClient.get(url, option);
    return this.httpClient.get(url, { params: { 'tag': tag, 'next': next.toString() } });
  }

  findQuestionsByKeywords = (keywords: string, next: number) => {
    let url = `api/q/keywords`;
    return this.httpClient.get(url, { params: { 'keywords': keywords, 'next': next.toString() } });
  }


  createQuestion = (question: Question) => {
    let url = `api/q/add`;
    return this.httpClient.post(url, question, { headers: { 'x-auth': this.getToken() } });
  }

  editQuestion = (questionId: string, newQuestion: string) => {
    let url = `api/q/edit`;
    return this.httpClient.put(url, { questionId, newQuestion }, { headers: { 'x-auth': this.getToken() } });
  }

  voteQuestion = (questionId: string, upvote: boolean) => {
    let url = `api/q/vote`;
    return this.httpClient.put(url, { questionId, upvote }, { headers: { 'x-auth': this.getToken() } });
  }

  deleteQuestion = (questionId: string) => {
    let url = `api/q/delete`;
    return this.httpClient.put(url, { questionId }, { headers: { 'x-auth': this.getToken() } });
  }

  addAnswer = (questionId: string, newAnswer: Answer) => {
    let url = `api/a/add`;
    return this.httpClient.put(url, { questionId, newAnswer }, { headers: { 'x-auth': this.getToken() } });
  }

  editAnswer = (questionId: string, answerId: string, newAnswer: string) => {
    let url = `api/a/edit`;
    return this.httpClient.put(url, { questionId, answerId, newAnswer }, { headers: { 'x-auth': this.getToken() } });
  }

  updateCorrectAnswer = (questionId: string, correctAnswerId: string, undo: boolean) => {
    let url = `api/a/update`;
    return this.httpClient.put(url, { questionId, correctAnswerId, undo }, { headers: { 'x-auth': this.getToken() } });
  }

  voteAnswer = (questionId: string, answerId: string, upvote: boolean) => {
    let url = `api/a/vote`;
    return this.httpClient.put(url, { questionId, answerId, upvote }, { headers: { 'x-auth': this.getToken() } });
  }

  deleteAnswer = (questionId: string, answerId: string) => {
    let url = `api/a/delete`;;
    return this.httpClient.put(url, { questionId, answerId }, { headers: { 'x-auth': this.getToken() } });
  }
}