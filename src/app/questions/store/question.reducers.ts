import * as QuestionActions from './question.actions';
import { Question } from '../question.model';
import { createReducer, on, Action } from '@ngrx/store';

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
    recentQuestions: { totalQuestions: 0, questions: [] },
    popularQuestions: { totalQuestions: 0, questions: [] },
    unansweredQuestions: { totalQuestions: 0, questions: [] },
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

const reducer = createReducer(
    initialState,
    on(QuestionActions.getPopularQuestions, (state, action) => ({
        ...state,
        popularQuestions: {
            totalQuestions: action.totalQuestions,
            questions: [...state.popularQuestions.questions, ...action.questions]
        }
    })),
    on(QuestionActions.getRecentQuestions, (state, action) => ({
        ...state,
        recentQuestions: {
            totalQuestions: action.totalQuestions,
            questions: [...state.recentQuestions.questions, ...action.questions]
        }
    })),
    on(QuestionActions.getUnansweredQuestions, (state, action) => ({
        ...state,
        unansweredQuestions: {
            totalQuestions: action.totalQuestions,
            questions: [...state.unansweredQuestions.questions, ...action.questions]
        }
    })),
    on(QuestionActions.getRelatedQuestions, (state, action) => ({
        ...state, relatedQuestions: action.questions
    })),
    on(QuestionActions.getFeaturedQuestions, (state, action) => ({
        ...state, featuredQuestions: action.questions
    })),
    on(QuestionActions.getTags, (state, action) => ({
        ...state, tags: action.tags
    })),
    on(QuestionActions.findQuestionById, (state, action) => ({
        ...state, questionById: action.question
    })),
    on(QuestionActions.findQuestionsByTag, (state, action) => ({
        ...state,
        questionsByTag: {
            tag: action.tag,
            questions: [...state.questionsByTag.questions, ...action.questions]
        }
    })),
    on(QuestionActions.findQuestionsByKeywords, (state, action) => ({
        ...state,
        searchResult: {
            keywords: action.keywords,
            questions: [...state.searchResult.questions, ...action.questions]
        }
    })),
    on(QuestionActions.createQuestion, (state, action) => ({
        ...state,
        popularQuestions: {
            totalQuestions: state.popularQuestions.totalQuestions + 1,
            questions: [...state.popularQuestions.questions, action.question]
        }
    })),
    on(QuestionActions.editQuestion, (state, action) => {
        let newQuestions = state.popularQuestions.questions;
        for (let i = 0; i < newQuestions.length; i++) {
            if (newQuestions[i]._id === action.questionId) {
                newQuestions[i].questionContent = action.newQuestion;
                break;
            }
        };

        return {
            ...state,
            popularQuestions: {
                ...state.popularQuestions,
                questions: newQuestions

            }
        };
    }),
    on(QuestionActions.deleteQuestion, (state, action) => {
        let newQuestions = state.popularQuestions.questions;
        for (let i = 0; i < newQuestions.length; i++) {
            if (newQuestions[i]._id === action.questionId) {
                newQuestions.splice(i, 1);
                break;
            }
        };

        return {
            ...state,
            popularQuestions: {
                ...state.popularQuestions,
                questions: newQuestions
            }
        };
    }),
    on(QuestionActions.voteQuestion, (state, action) => {
        let newQuestions = state.popularQuestions.questions;
        for (let i = 0; i < newQuestions.length; i++) {
            if (newQuestions[i]._id === action.questionId) {
                if (action.upvote) {
                    newQuestions[i].questionVotes++;
                } else {
                    newQuestions[i].questionVotes--;
                }
                break;
            }
        };

        return {
            ...state,
            popularQuestions: {
                ...state.popularQuestions,
                questions: newQuestions
            }
        };
    }),
    on(QuestionActions.addAnswer, (state, action) => {
        let newQuestions = state.popularQuestions.questions;
        let newAnswer = action.newAnswer;
        for (let i = 0; i < newQuestions.length; i++) {
            if (newQuestions[i]._id === action.questionId) {
                newQuestions[i].answers.push(newAnswer);
                break;
            }
        };

        return {
            ...state,
            popularQuestions: { ...state.popularQuestions },
            questions: newQuestions
        };
    }),
    on(QuestionActions.updateCorrectAnswer, (state, action) => {
        let newQuestions = state.popularQuestions.questions;
        for (let i = 0; i < newQuestions.length; i++) {
            if (newQuestions[i]._id === action.questionId) {
                for (let ii = 0; ii < newQuestions[i].answers.length; ii++) {
                    if (newQuestions[i].answers[ii].isCorrectAnswer === true) {
                        newQuestions[i].answers[ii].isCorrectAnswer = false;
                        break;
                    }
                }

                if (!action.undo) {
                    for (let ii = 0; ii < newQuestions[i].answers.length; ii++) {
                        if (newQuestions[i].answers[ii]._id === action.correctAnswerId) {
                            newQuestions[i].answers[ii].isCorrectAnswer = true;
                            break;
                        }
                    }
                }
            }
        }
        return {
            ...state,
            popularQuestions: {
                ...state.popularQuestions,
                questions: newQuestions
            }
        }
    }),
    on(QuestionActions.editAnswer, (state, action) => {
        let newQuestions = state.popularQuestions.questions;
        for (let i = 0; i < newQuestions.length; i++) {
            if (newQuestions[i]._id === action.questionId) {
                for (let ii = 0; ii < newQuestions[i].answers.length; ii++) {
                    if (newQuestions[i].answers[ii]._id === action.answerId) {
                        newQuestions[i].answers[ii].answer = action.newAnswer;
                        break;
                    }
                }
            }
        }
        return {
            ...state,
            popularQuestions: {
                ...state.popularQuestions,
                questions: newQuestions
            }
        }
    }),
    on(QuestionActions.voteAnswer, (state, action) => {
        let newQuestions = state.popularQuestions.questions;
        for (let i = 0; i < newQuestions.length; i++) {
            if (newQuestions[i]._id === action.questionId) {
                for (let ii = 0; ii < newQuestions[i].answers.length; ii++) {
                    if (newQuestions[i].answers[ii]._id === action.answerId) {
                        if (action.upvote) {
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
            ...state,
            popularQuestions: {
                ...state.popularQuestions,
                questions: newQuestions
            }
        }
    }),
    on(QuestionActions.deleteAnswer, (state, action) => {
        let newQuestions = state.popularQuestions.questions;
        for (let i = 0; i < newQuestions.length; i++) {
            if (newQuestions[i]._id === action.questionId) {
                for (let ii = 0; ii < newQuestions[i].answers.length; ii++) {
                    if (newQuestions[i].answers[ii]._id === action.answerId) {
                        newQuestions[i].answers.splice(ii, 1);
                        break;
                    }
                }
                break;
            }
        };

        return {
            ...state,
            popularQuestions: {
                ...state.popularQuestions,
                questions: newQuestions
            }
        }
    })
)

export function questionReducer(state: QuestionState | undefined, action: Action) {
    return reducer(state, action);
}
// export function questionReducer(state: QuestionState = initialState, action: QuestionActions): QuestionState {
//     switch (action.type) {
//         case QuestionActions.getPopularQuestions:
//             , (state, action) => ({
//                 ...state,
//                 popularQuestions: {
//                     totalQuestions: action.totalQuestions,
//                     questions: [...state.popularQuestions.questions, ...action.questions]
//                 }
//             };

//         case QuestionActions.getRecentQuestions:
//             , (state, action) => ({
//                 ...state,
//                 recentQuestions: {
//                     totalQuestions: action.totalQuestions,
//                     questions: [...state.recentQuestions.questions, ...action.questions]
//                 }
//             };

//         case QuestionActions.getUnansweredQuestions:
//             , (state, action) => ({
//                 ...state,
//                 unansweredQuestions: {
//                     totalQuestions: action.totalQuestions,
//                     questions: [...state.unansweredQuestions.questions, ...action.questions]
//                 }
//             };

//         case QuestionActions.getRelatedQuestions:
//             , (state, action) => ({ ...state, relatedQuestions: action.questions };

//         case QuestionActions.getFeaturedQuestions:
//             , (state, action) => ({ ...state, featuredQuestions: action.questions };

//         case QuestionActions.getTags:
//             , (state, action) => ({ ...state, tags: action.tags };

//         case QuestionActions.findQuestionById:
//             , (state, action) => ({ ...state, questionById: action.question };

//         case QuestionActions.findQuestionsByTag:
//             , (state, action) => ({
//                 ...state,
//                 questionsByTag: {
//                     tag: action.tag,
//                     questions: [...state.questionsByTag.questions, ...action.questions]
//                 }
//             };

//         case QuestionActions.findQuestionsByKeywords:
//             , (state, action) => ({
//                 ...state,
//                 searchResult: {
//                     keywords: action.keywords,
//                     questions: [...state.searchResult.questions, ...action.questions]
//                 }
//             };

//         case QuestionActions.createQuestion:
//             , (state, action) => ({
//                 ...state,
//                 popularQuestions: {
//                     totalQuestions: state.popularQuestions.totalQuestions + 1,
//                     questions: [...state.popularQuestions.questions, action.question]
//                 }
//             };

//         case QuestionActions.editQuestion:
//             let newQuestions = state.popularQuestions.questions;
//             for (let i = 0; i < newQuestions.length; i++) {
//                 if (newQuestions[i]._id === action.questionId) {
//                     newQuestions[i].questionContent = action.newQuestion;
//                     break;
//                 }
//             }
//             , (state, action) => ({
//                 ...state, popularQuestions: {
//                     ...state.popularQuestions,
//                     questions: newQuestions
//                 }
//             };

//         case QuestionActions.deleteQuestion:
//             newQuestions = state.popularQuestions.questions;
//             for (let i = 0; i < newQuestions.length; i++) {
//                 if (newQuestions[i]._id === action.questionId) {
//                     newQuestions.splice(i, 1);
//                     break;
//                 }
//             }
//             , (state, action) => ({
//                 ...state, popularQuestions: {
//                     ...state.popularQuestions,
//                     questions: newQuestions
//                 }
//             };

//         case QuestionActions.voteQuestion:
//             newQuestions = state.popularQuestions.questions;
//             for (let i = 0; i < newQuestions.length; i++) {
//                 if (newQuestions[i]._id === action.questionId) {
//                     if (action.upvote) {
//                         newQuestions[i].questionVotes++;
//                     } else {
//                         newQuestions[i].questionVotes--;
//                     }
//                     break;
//                 }
//             }
//             , (state, action) => ({
//                 ...state, popularQuestions: {
//                     ...state.popularQuestions,
//                     questions: newQuestions
//                 }
//             };

//         case QuestionActions.addAnswer:
//             newQuestions = state.popularQuestions.questions;
//             let newAnswer = action.newAnswer;
//             for (let i = 0; i < newQuestions.length; i++) {
//                 if (newQuestions[i]._id === action.questionId) {
//                     newQuestions[i].answers.push(newAnswer);
//                     break;
//                 }
//             }
//             , (state, action) => ({
//                 ...state, popularQuestions: {
//                     ...state.popularQuestions,
//                     questions: newQuestions
//                 }
//             };

//         case QuestionActions.updateCorrectAnswer:
//             newQuestions = state.popularQuestions.questions;
//             for (let i = 0; i < newQuestions.length; i++) {
//                 if (newQuestions[i]._id === action.questionId) {
//                     for (let ii = 0; ii < newQuestions[i].answers.length; ii++) {
//                         if (newQuestions[i].answers[ii].isCorrectAnswer === true) {
//                             newQuestions[i].answers[ii].isCorrectAnswer = false;
//                             break;
//                         }
//                     }

//                     if (!action.undo) {
//                         for (let ii = 0; ii < newQuestions[i].answers.length; ii++) {
//                             if (newQuestions[i].answers[ii]._id === action.correctAnswerId) {
//                                 newQuestions[i].answers[ii].isCorrectAnswer = true;
//                                 break;
//                             }
//                         }
//                     }
//                 }
//             }
//             , (state, action) => ({
//                 ...state, ...state, popularQuestions: {
//                     ...state.popularQuestions,
//                     questions: newQuestions
//                 }
//             };

//         case QuestionActions.editAnswer:
//             newQuestions = state.popularQuestions.questions;
//             for (let i = 0; i < newQuestions.length; i++) {
//                 if (newQuestions[i]._id === action.questionId) {
//                     for (let ii = 0; ii < newQuestions[i].answers.length; ii++) {
//                         if (newQuestions[i].answers[ii]._id === action.answerId) {
//                             newQuestions[i].answers[ii].answer = action.newAnswer;
//                             break;
//                         }
//                     }
//                 }
//             }
//             , (state, action) => ({
//                 ...state, ...state, popularQuestions: {
//                     ...state.popularQuestions,
//                     questions: newQuestions
//                 }
//             };

//         case QuestionActions.voteAnswer:
//             newQuestions = state.popularQuestions.questions;
//             for (let i = 0; i < newQuestions.length; i++) {
//                 if (newQuestions[i]._id === action.questionId) {
//                     for (let ii = 0; ii < newQuestions[i].answers.length; ii++) {
//                         if (newQuestions[i].answers[ii]._id === action.answerId) {
//                             if (action.upvote) {
//                                 newQuestions[i].answers[ii].answerVotes++;
//                             } else {
//                                 newQuestions[i].answers[ii].answerVotes--;
//                             }
//                             break;
//                         }
//                     }
//                     break;
//                 }
//             }
//             , (state, action) => ({
//                 ...state, ...state, popularQuestions: {
//                     ...state.popularQuestions,
//                     questions: newQuestions
//                 }
//             };

//         case QuestionActions.deleteAnswer:
//             newQuestions = state.popularQuestions.questions;
//             for (let i = 0; i < newQuestions.length; i++) {
//                 if (newQuestions[i]._id === action.questionId) {
//                     for (let ii = 0; ii < newQuestions[i].answers.length; ii++) {
//                         if (newQuestions[i].answers[ii]._id === action.answerId) {
//                             newQuestions[i].answers.splice(ii, 1);
//                             break;
//                         }
//                     }
//                     break;
//                 }
//             }
//             , (state, action) => ({
//                 ...state, ...state, popularQuestions: {
//                     ...state.popularQuestions,
//                     questions: newQuestions
//                 }
//             };

//         default:
//             return state;
//     }
// }