import { User } from '../auth/user/user.model';

export class Answer {
    _id?: string;
    answer: string;
    answeredByUser: User;
    isCorrectAnswer: boolean;
    answerVotes: number;

    constructor(answer = '', answeredByUser = new User(), isCorrectAnswer = false, answerVotes = 0) {
        this.answer = answer;
        this.answerVotes = answerVotes;
        this.answeredByUser = answeredByUser;
        this.isCorrectAnswer = isCorrectAnswer;
    }
}

export class Question {
    _id?: string;
    tags: string[];
    question: string;
    askedByUser: User;
    questionVotes: number;
    answers: Answer[];

    constructor(tags = [], question = '', askedByUser = new User(), questionVotes = 0, answers = []) {
        this.tags = tags;
        this.question = question;
        this.askedByUser = askedByUser;
        this.questionVotes = questionVotes;
        this.answers = answers
    }
}