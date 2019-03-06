import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user/user.model';
import { Question, Answer } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private httpClient: HttpClient) { }

  //get questions
  getQuestions = () => {
    let url = `api/q`;
    return this.httpClient.get(url);
  }

  //find questions by user(name)
  findQuestionsByUser = (user : User) => {
    let url = `api/q/user`;
    return this.httpClient.get(url, {headers: {'user': user.username}});
  }

  //find questions by tag
  findQuestionsByTag = (tag: string) => {
    let url = `api/q/tag`;
    return this.httpClient.get(url, {headers: {'tag': tag}});
  }

  //create question insertOne(doc, options, callback)
  createQuestion = (question: Question) => {
    let url = `api/q/add`;
    return this.httpClient.post(url, question);
  }

  //edit question updateOne(filter, update, options)
  editQuestion = (question: Question, newQuestion: Question) => {
    let url = `api/q/edit`;
    return this.httpClient.put(url, {question, newQuestion});
  }

  //upvote, downvote question
  voteQuestion = (question: Question, upvote: boolean) => {
    let url = `api/q/vote`;
    return this.httpClient.put(url, {question, upvote});
  }

  //delete question
  deleteQuestion = (question: Question) => {
    let url = `api/q/delete`;
    return this.httpClient.put(url, {question});
  }

  //add answer
  addAnswer = (question: Question, newAnswer: Answer) => {
    let url = `api/a/add`;
    return this.httpClient.put(url, {question, newAnswer});
  }

  //edit answer
  editAnswer = (question: Question, newAnswer: Answer, oldAnswer: Answer) => {
    let url = `api/a/edit`;
    return this.httpClient.put(url, {question, newAnswer, oldAnswer});
  }

  //update correct answer
  updateCorrectAnswer = (question: Question, correctAnswer: string) => {
    let url = `api/a/update`;
    return this.httpClient.put(url, {question, correctAnswer});
  }

  //upvote, downvote answer
  voteAnswer = (question: Question, answer: Answer, upvote: boolean) => {
    let url = `api/a/vote`;
    return this.httpClient.put(url, {question, answer, upvote});
  }

  //delete answer
  deleteAnswer = (question: Question, answerToDelete: string) => {
    let url = `api/a/delete`;
    return this.httpClient.put(url, {question, answerToDelete});
  }

}
