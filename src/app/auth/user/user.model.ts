import { Question } from '../../questions/question.model';

export class User {
    _id: string = '';
    username: string = '';
    email: string = '';
    questions: Question[] = [];
    answers: Question[] = [];

    constructor() { }
}