import * as QuestionActions from './question.actions';
import { Question, Answer } from '../question.model';

export interface QuestionState {
    hasLoaded: boolean,
    questions: Question[],
    unansweredQuestions: Question[],
    tags: string[],
    questionsByTag: {
        tag: string,
        questions: Question[]
    },
    questionById: Question
}

export const initialState: QuestionState = {
    hasLoaded: false,
    questions: [],
    unansweredQuestions: [],
    tags: [],
    questionsByTag: {
        tag: '',
        questions: []
    },
    questionById: new Question()
}

export function questionReducer(state: QuestionState, action: QuestionActions.Union): QuestionState {
    switch (action.type) {
        case QuestionActions.ActionTypes.GetPopularQuestions:
            return { ...state, hasLoaded: true, questions: action.payload.questions };

        case QuestionActions.ActionTypes.FindQuestionById:
            return { ...state, questionById: action.payload.question };

        case QuestionActions.ActionTypes.FindQuestionsByTag:
            return {
                ...state,
                questionsByTag: { tag: action.payload.tag, questions: action.payload.questions }
            };

        //TODO:
        //Find unanswered questions

        case QuestionActions.ActionTypes.CreateQuestion:
            return {
                ...state,
                questions: [...state.questions, action.payload.question]
            };

        case QuestionActions.ActionTypes.EditQuestion:
            let newQuestions = state.questions;
            for (let i = 0; i < newQuestions.length; i++) {
                if (newQuestions[i]._id === action.payload.questionId) {
                    newQuestions[i].question = action.payload.newQuestion;
                    break;
                }
            }
            return { ...state, questions: newQuestions };

        case QuestionActions.ActionTypes.DeleteQuestion:
            newQuestions = state.questions;
            for (let i = 0; i < newQuestions.length; i++) {
                if (newQuestions[i]._id === action.payload.questionId) {
                    newQuestions.splice(i, 1);
                    break;
                }
            }
            return { ...state, questions: newQuestions };

        case QuestionActions.ActionTypes.VoteQuestion:
            newQuestions = state.questions;
            for (let i = 0; i < newQuestions.length; i++) {
                if (newQuestions[i]._id === action.payload.questionId) {
                    if (action.payload.upvote) {
                        newQuestions[i].questionVotes++;
                    } else {
                        newQuestions[i].questionVotes--;
                    }
                    break;
                }
            }
            return { ...state, questions: newQuestions };

        case QuestionActions.ActionTypes.AddAnswer:
            newQuestions = state.questions;
            let newAnswer = new Answer();
            newAnswer.answer = action.payload.newAnswer;
            for (let i = 0; i < newQuestions.length; i++) {
                if (newQuestions[i]._id === action.payload.questionId) {
                    newQuestions[i].answers.push(newAnswer);
                    break;
                }
            }
            return { ...state, questions: newQuestions };

        case QuestionActions.ActionTypes.UpdateCorrectAnswer:
            newQuestions = state.questions;
            for (let i = 0; i < newQuestions.length; i++) {
                if (newQuestions[i]._id === action.payload.questionId) {
                    for (let ii = 0; ii < newQuestions[i].answers.length; ii++) {
                        if (newQuestions[i].answers[ii].isCorrectAnswer === true) {
                            newQuestions[i].answers[ii].isCorrectAnswer = false;
                            break;
                        }
                    }
                    for (let ii = 0; ii < newQuestions[i].answers.length; ii++) {
                        if (newQuestions[i].answers[ii]._id === action.payload.correctAnswerId) {
                            newQuestions[i].answers[ii].isCorrectAnswer = true;
                            break;
                        }
                    }
                }
            }
            return { ...state, questions: newQuestions };

        case QuestionActions.ActionTypes.EditAnswer:
            newQuestions = state.questions;
            for (let i = 0; i < newQuestions.length; i++) {
                if (newQuestions[i]._id === action.payload.questionId) {
                    for (let ii = 0; ii < newQuestions[i].answers.length; ii++) {
                        if (newQuestions[i].answers[ii]._id === action.payload.answerId) {
                            newQuestions[i].answers[ii].answer = action.payload.newAnswer;
                            break;
                        }
                    }
                }
            }
            return { ...state, questions: newQuestions };

        case QuestionActions.ActionTypes.VoteAnswer:
            newQuestions = state.questions;
            for (let i = 0; i < newQuestions.length; i++) {
                if (newQuestions[i]._id === action.payload.questionId) {
                    for (let ii = 0; ii < newQuestions[i].answers.length; ii++) {
                        if (newQuestions[i].answers[ii]._id === action.payload.answerId) {
                            if (action.payload.upvote) {
                                newQuestions[i].answers[ii].answerVotes++;
                            } else {
                                newQuestions[i].answers[ii].answerVotes--;
                            }
                            break;
                        }
                    }
                    break;
                }
            }
            return { ...state, questions: newQuestions };

        case QuestionActions.ActionTypes.DeleteAnswer:
            newQuestions = state.questions;
            for (let i = 0; i < newQuestions.length; i++) {
                if (newQuestions[i]._id === action.payload.questionId) {
                    for (let ii = 0; ii < newQuestions[i].answers.length; ii++) {
                        if (newQuestions[i].answers[ii]._id === action.payload.answerId) {
                            newQuestions[i].answers.splice(ii, 1);
                            break;
                        }
                    }
                    break;
                }
            }
            return { ...state, questions: newQuestions };

        default:
            return state;
    }
}