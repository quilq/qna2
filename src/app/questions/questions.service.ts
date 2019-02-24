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
  voteQuestion = (question, upvote) => {
  }

  //delete question
  deleteQuestion = (question) => {
  }

  //add answer
  addAnswer = (question, newAnswer) => {
  }

  //edit answer
  editAnswer = (question, newAnswer, oldAnswer) => {
  }

  //update correct answer
  updateCorrectAnswer = (question, correctAnswer) => {
  }

  //upvote, downvote answer
  voteAnswer = (question, answer, upvote) => {
  }

  //delete answer
  deleteAnswer = (question, answerToDelete) => {
  }

}
