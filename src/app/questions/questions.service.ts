import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private httpClient: HttpClient) { }

  //find questions by user(name)
  findQuestionsByUser = (user) => {
    let url = `api/q`;
    return this.httpClient.get(url, {headers: {'user': user}});
  }

  //find questions by tag
  findQuestionsByTag = (tag) => {
    let url = `api/q/tag`;
    return this.httpClient.get(url, {headers: {'tag': tag}});
  }

  //create question insertOne(doc, options, callback)
  createQuestion = (question) => {
    let url = `api/q/add`;
    return this.httpClient.post(url, question);
  }

  //edit question updateOne(filter, update, options)
  editQuestion = (question, newQuestion) => {
    let url = `api/q/edit`;
    return this.httpClient.put(url, {question, newQuestion});
  }

  //upvote, downvote question
  voteQuestion = (question, upvote: boolean) => {
    let url = `api/q/vote`;
    return this.httpClient.put(url, {question, upvote});
  }

  //delete question
  deleteQuestion = (question) => {
    let url = `api/q/delete`;
    return this.httpClient.put(url, {question});
  }

  //add answer
  addAnswer = (question, newAnswer) => {
    let url = `api/a/add`;
    return this.httpClient.put(url, {question, newAnswer});
  }

  //edit answer : TODO
  editAnswer = (question, newAnswer, oldAnswer) => {
    let url = `api/a/edit`;
    return this.httpClient.put(url, {question, newAnswer, oldAnswer});
  }

  //update correct answer : TODO
  updateCorrectAnswer = (question, correctAnswer) => {
    let url = `api/a/update`;
    return this.httpClient.put(url, {question, correctAnswer});
  }

  //upvote, downvote answer : TODO
  voteAnswer = (question, answer, upvote: boolean) => {
    let url = `api/a/vote`;
    return this.httpClient.put(url, {question, answer, upvote});
  }

  //delete answer
  deleteAnswer = (question, answerToDelete) => {
    let url = `api/a/delete`;
    return this.httpClient.put(url, {question, answerToDelete});
  }

}
