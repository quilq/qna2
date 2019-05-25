import * as QuestionActions from './question.actions';
import { Question } from '../question.model';

export interface LoadedQuestions {
    totalQuestions: number,  //total questions from database
    questions: Question[]
}

export interface QuestionState {
    popularQuestions: LoadedQuestions,
    recentQuestions: LoadedQuestions,
    unansweredQuestions: LoadedQuestions,
    relatedQuestions: Question[],
    featuredQuestions: Question[],
    tags: string[],
    questionsByTag: {
        tag: string,
        questions: Question[]
    },
    questionById: Question,
    searchResult: {
        keywords: string,
        questions: Question[]
    }
}

export const initialState: QuestionState = {
    // hasLoaded: false,
    recentQuestions: {totalQuestions: 0, questions: []},
    popularQuestions: {totalQuestions: 0, questions: []},
    unansweredQuestions: {totalQuestions: 0, questions: []},
    relatedQuestions: [],
    featuredQuestions: [],
    tags: [],
    questionsByTag: {
        tag: '',
        questions: []
    },
    questionById: null,
    searchResult: {
        keywords: '',
        questions: []
    }
}

export function questionReducer(state: QuestionState = initialState, action: QuestionActions.Union): QuestionState {
    switch (action.type) {
        case QuestionActions.ActionTypes.GetPopularQuestions:
            return {
                ...state,
                popularQuestions: {
                    totalQuestions: action.payload.totalQuestions,
                    questions: [...state.popularQuestions.questions, ...action.payload.questions]
                }
            };

        case QuestionActions.ActionTypes.GetRecentQuestions:
            return {
                ...state,
                recentQuestions: {
                    totalQuestions: action.payload.totalQuestions,
                    questions: [...state.recentQuestions.questions, ...action.payload.questions]
                }
            };

        case QuestionActions.ActionTypes.GetUnansweredQuestions:
            return {
                ...state,
                unansweredQuestions: {
                    totalQuestions: action.payload.totalQuestions,
                    questions: [...state.unansweredQuestions.questions, ...action.payload.questions]
                }
            };

        case QuestionActions.ActionTypes.GetRelatedQuestions:
            return { ...state, relatedQuestions: action.payload.questions };

        case QuestionActions.ActionTypes.GetFeaturedQuestions:
            return { ...state, featuredQuestions: action.payload.questions };

        case QuestionActions.ActionTypes.GetTags:
            return { ...state, tags: action.payload.tags };

        case QuestionActions.ActionTypes.FindQuestionById:
            return { ...state, questionById: action.payload.question };

        case QuestionActions.ActionTypes.FindQuestionsByTag:
            return {
                ...state,
                questionsByTag: {
                    tag: action.payload.tag,
                    questions: [...state.questionsByTag.questions, ...action.payload.questions]
                }
            };

        case QuestionActions.ActionTypes.FindQuestionsByKeywords:
            return {
                ...state,
                searchResult: {
                    keywords: action.payload.keywords,
                    questions: [...state.searchResult.questions, ...action.payload.questions]
                }
            };

        case QuestionActions.ActionTypes.CreateQuestion:
            return {
                ...state,
                popularQuestions: {
                    totalQuestions: state.popularQuestions.totalQuestions + 1,
                    questions: [...state.popularQuestions.questions, action.payload.question]
                }
            };

        case QuestionActions.ActionTypes.EditQuestion:
            let newQuestions = state.popularQuestions.questions;
            for (let i = 0; i < newQuestions.length; i++) {
                if (newQuestions[i]._id === action.payload.questionId) {
                    newQuestions[i].questionContent = action.payload.newQuestion;
                    break;
                }
            }
            return {
                ...state, popularQuestions: {
                    ...state.popularQuestions,
                    questions: newQuestions
                }
            };

        case QuestionActions.ActionTypes.DeleteQuestion:
            newQuestions = state.popularQuestions.questions;
            for (let i = 0; i < newQuestions.length; i++) {
                if (newQuestions[i]._id === action.payload.questionId) {
                    newQuestions.splice(i, 1);
                    break;
                }
            }
            return {
                ...state, popularQuestions: {
                    ...state.popularQuestions,
                    questions: newQuestions
                }
            };

        case QuestionActions.ActionTypes.VoteQuestion:
            newQuestions = state.popularQuestions.questions;
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
            return {
                ...state, popularQuestions: {
                    ...state.popularQuestions,
                    questions: newQuestions
                }
            };

        case QuestionActions.ActionTypes.AddAnswer:
            newQuestions = state.popularQuestions.questions;
            let newAnswer = action.payload.newAnswer;
            for (let i = 0; i < newQuestions.length; i++) {
                if (newQuestions[i]._id === action.payload.questionId) {
                    newQuestions[i].answers.push(newAnswer);
                    break;
                }
            }
            return {
                ...state, popularQuestions: {
                    ...state.popularQuestions,
                    questions: newQuestions
                }
            };

        case QuestionActions.ActionTypes.UpdateCorrectAnswer:
            newQuestions = state.popularQuestions.questions;
            for (let i = 0; i < newQuestions.length; i++) {
                if (newQuestions[i]._id === action.payload.questionId) {
                    for (let ii = 0; ii < newQuestions[i].answers.length; ii++) {
                        if (newQuestions[i].answers[ii].isCorrectAnswer === true) {
                            newQuestions[i].answers[ii].isCorrectAnswer = false;
                            break;
                        }
                    }

                    if (!action.payload.undo) {
                        for (let ii = 0; ii < newQuestions[i].answers.length; ii++) {
                            if (newQuestions[i].answers[ii]._id === action.payload.correctAnswerId) {
                                newQuestions[i].answers[ii].isCorrectAnswer = true;
                                break;
                            }
                        }
                    }
                }
            }
            return {
                ...state, ...state, popularQuestions: {
                    ...state.popularQuestions,
                    questions: newQuestions
                }
            };

        case QuestionActions.ActionTypes.EditAnswer:
            newQuestions = state.popularQuestions.questions;
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
            return {
                ...state, ...state, popularQuestions: {
                    ...state.popularQuestions,
                    questions: newQuestions
                }
            };

        case QuestionActions.ActionTypes.VoteAnswer:
            newQuestions = state.popularQuestions.questions;
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
            return {
                ...state, ...state, popularQuestions: {
                    ...state.popularQuestions,
                    questions: newQuestions
                }
            };

        case QuestionActions.ActionTypes.DeleteAnswer:
            newQuestions = state.popularQuestions.questions;
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
            return {
                ...state, ...state, popularQuestions: {
                    ...state.popularQuestions,
                    questions: newQuestions
                }
            };

        default:
            return state;
    }
}