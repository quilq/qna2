import { User } from '../user/user.model';

export class Answer {
    answer: string;
    answeredByUser: User;
    isCorrectAnswer: boolean;
}

export class Question {
    tags: string[];
    question: string;
    askedByUser: User;
    votes: number;
    answers: Answer[];
}
