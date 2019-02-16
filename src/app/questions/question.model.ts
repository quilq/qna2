import { User } from '../user/user.model';

export class Question {
    tags: string[];
    question: string;
    askedByUser: User;
    votes: number;
    answers: [{
        answer: string;
        answeredByUser: User;
        isCorrectAnswer: boolean;
    }]
}
