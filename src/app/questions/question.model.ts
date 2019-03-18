import { User } from '../auth/user/user.model';

export class Answer {
    _id?: string;
    answer: string;
    answeredByUser: User;
    isCorrectAnswer: boolean;
    answerVotes: number
}

export class Question {
    _id?: string;
    tags: string[];
    question: string;
    askedByUser: User;
    questionVotes: number;
    answers: Answer[];
}
