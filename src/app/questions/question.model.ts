import { User } from '../auth/user/user.model';

export class Answer {
    _id?: string;
    answer: string;
    answeredByUser: User;
    isCorrectAnswer: boolean;
    answerVotes: number;

    constructor(answer: string, answeredByUser: User) {
        this.answer = answer;
        this.answerVotes = 0;
        this.answeredByUser = answeredByUser;
        this.isCorrectAnswer = false;
    }
}

export class Question {
    _id?: string;
    tags: string[];
    questionTitle: string;
    questionContent: string;
    askedByUser: User;
    questionVotes: number;
    answers: Answer[];
    createdAt: Date;

    constructor(tags: string[], questionTitle: string, questionContent: string, askedByUser: User) {
        this.tags = tags;
        this.questionTitle = questionTitle;
        this.questionContent = questionContent;
        this.askedByUser = askedByUser;
        this.questionVotes = 0;
        this.answers = [];
        this.createdAt = new Date();
    }
}