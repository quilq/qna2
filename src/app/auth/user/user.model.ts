import { Question } from '../../questions/question.model';

export class User {
    _id?: string;
    username: string;
    email: string;
    questions: Question[];
    answers: Question[]

    constructor(username = '', email = '', questions = [], answers = []) {
        this.username = username;
        this.email = email;
        this.questions = questions;
        this.answers = answers
    }
}