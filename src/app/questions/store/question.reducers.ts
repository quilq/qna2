import * as QuestionActions from './question.actions';
import { Question, Answer } from '../question.model';

export interface QuestionState {
    hasLoaded: boolean,
    popularQuestions: Question[],
    recentQuestions: Question[],
    relatedQuestions: Question[],
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
    recentQuestions: [],
    relatedQuestions: [],
    popularQuestions: [],
    unansweredQuestions: [],
    tags: [],
    questionsByTag: {
        tag: '',
        questions: []
    },
    questionById: null
}

export function questionReducer(state: QuestionState = initialState, action: QuestionActions.Union): QuestionState {
    switch (action.type) {
        case QuestionActions.ActionTypes.GetPopularQuestions:
            return { ...state, hasLoaded: true, popularQuestions: action.payload.questions };

        case QuestionActions.ActionTypes.GetRecentQuestions:
            return { ...state, recentQuestions: action.payload.questions };

        case QuestionActions.ActionTypes.GetRelatedQuestions:
            return { ...state, relatedQuestions: action.payload.questions };

        case QuestionActions.ActionTypes.GetUnansweredQuestions:
            return { ...state, unansweredQuestions: action.payload.questions };

        case QuestionActions.ActionTypes.GetTags:
            return { ...state, tags: action.payload.tags };

        case QuestionActions.ActionTypes.FindQuestionById:
            return { ...state, questionById: action.payload.question };

        case QuestionActions.ActionTypes.FindQuestionsByTag:
            return {
                ...state,
                questionsByTag: { tag: action.payload.tag, questions: action.payload.questions }
            };

        case QuestionActions.ActionTypes.CreateQuestion:
            return {
                ...state,
                popularQuestions: [...state.popularQuestions, action.payload.question]
            };

        case QuestionActions.ActionTypes.EditQuestion:
            let newQuestions = state.popularQuestions;
            for (let i = 0; i < newQuestions.length; i++) {
                if (newQuestions[i]._id === action.payload.questionId) {
                    newQuestions[i].questionContent = action.payload.newQuestion;
                    break;
                }
            }
            return { ...state, popularQuestions: newQuestions };

        case QuestionActions.ActionTypes.DeleteQuestion:
            newQuestions = state.popularQuestions;
            for (let i = 0; i < newQuestions.length; i++) {
                if (newQuestions[i]._id === action.payload.questionId) {
                    newQuestions.splice(i, 1);
                    break;
                }
            }
            return { ...state, popularQuestions: newQuestions };

        case QuestionActions.ActionTypes.VoteQuestion:
            console.log(action.payload);
            newQuestions = state.popularQuestions;
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
            return { ...state, popularQuestions: newQuestions };

        case QuestionActions.ActionTypes.AddAnswer:
            newQuestions = state.popularQuestions;
            let newAnswer = action.payload.newAnswer;
            for (let i = 0; i < newQuestions.length; i++) {
                if (newQuestions[i]._id === action.payload.questionId) {
                    newQuestions[i].answers.push(newAnswer);
                    break;
                }
            }
            return { ...state, popularQuestions: newQuestions };

        case QuestionActions.ActionTypes.UpdateCorrectAnswer:
            newQuestions = state.popularQuestions;
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
            return { ...state, popularQuestions: newQuestions };

        case QuestionActions.ActionTypes.EditAnswer:
            newQuestions = state.popularQuestions;
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
            return { ...state, popularQuestions: newQuestions };

        case QuestionActions.ActionTypes.VoteAnswer:
            newQuestions = state.popularQuestions;
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
            return { ...state, popularQuestions: newQuestions };

        case QuestionActions.ActionTypes.DeleteAnswer:
            newQuestions = state.popularQuestions;
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
            return { ...state, popularQuestions: newQuestions };

        default:
            return state;
    }
}