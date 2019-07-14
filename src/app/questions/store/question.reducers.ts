import { createReducer, on, Action } from '@ngrx/store';

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

const addQuestion = (loadedQuestions: LoadedQuestions, question: Question) => {
    let newQuestions = loadedQuestions;
    newQuestions.questions.push(question);
    newQuestions.totalQuestions++;
    return newQuestions;
}

const updateQuestion = (loadedQuestions: LoadedQuestions, question: Question) => {
    let newQuestions = loadedQuestions;
    for (let i = 0; i < newQuestions.questions.length; i++) {
        if (newQuestions.questions[i]._id === question._id) {
            newQuestions.questions[i] = question
            break;
        }
    };
    return newQuestions;
}

const deleteQuestion = (loadedQuestions: LoadedQuestions, question: Question) => {
    let newQuestions = loadedQuestions;
    for (let i = 0; i < newQuestions.questions.length; i++) {
        if (newQuestions.questions[i]._id === question._id) {
            newQuestions.questions.splice(i, 1);
            newQuestions.totalQuestions--;
            break;
        }
    };
    return newQuestions;
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
        popularQuestions: addQuestion(state.popularQuestions, action.question),
        recentQuestions: addQuestion(state.recentQuestions, action.question),
        unansweredQuestions: addQuestion(state.unansweredQuestions, action.question)
    })),
    on(
        QuestionActions.editQuestion,
        QuestionActions.voteQuestion,
        QuestionActions.updateCorrectAnswer,
        QuestionActions.editAnswer,
        QuestionActions.voteAnswer,
        QuestionActions.deleteAnswer,
        (state, action) => ({
            ...state,
            popularQuestions: updateQuestion(state.popularQuestions, action.question),
            recentQuestions: updateQuestion(state.recentQuestions, action.question),
            unansweredQuestions: updateQuestion(state.unansweredQuestions, action.question)
        })),
    on(QuestionActions.deleteQuestion, (state, action) => ({
        ...state,
        popularQuestions: deleteQuestion(state.popularQuestions, action.question),
        recentQuestions: deleteQuestion(state.recentQuestions, action.question),
        unansweredQuestions: deleteQuestion(state.unansweredQuestions, action.question)
    })),
    on(QuestionActions.addAnswer, (state, action) => ({
        ...state,
        popularQuestions: updateQuestion(state.popularQuestions, action.question),
        recentQuestions: updateQuestion(state.recentQuestions, action.question),
        unansweredQuestions: deleteQuestion(state.unansweredQuestions, action.question)
    }))
)

export function questionReducer(state: QuestionState | undefined, action: Action) {
    return reducer(state, action);
}