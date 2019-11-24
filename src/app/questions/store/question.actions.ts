import { createAction, props } from '@ngrx/store';

import { Question, Answer } from '../question.model';

export const onGetPopularQuestions = createAction(
    '[Question] On Get Popular Questions',
    props<{ next: number }>()
);

export const getPopularQuestions = createAction(
    '[Question] Get Popular Questions',
    props<{ totalQuestions: number, questions: Question[] }>()
);

export const onGetRecentQuestions = createAction(
    '[Question] On Get Recent Questions',
    props<{ next: number }>()
);

export const getRecentQuestions = createAction(
    '[Question] Get Recent Questions',
    props<{ totalQuestions: number, questions: Question[] }>()
);

export const onGetRelatedQuestions = createAction(
    '[Question] On Get Related Questions',
    props<{ tags: string[] }>()
);

export const getRelatedQuestions = createAction(
    '[Question] Get Related Questions',
    props<{ questions: Question[] }>()
);

export const onGetFeaturedQuestions = createAction(
    '[Question] On Get Featured Questions'
);

export const getFeaturedQuestions = createAction(
    '[Question] Get Featured Questions',
    props<{ questions: Question[] }>()
);

export const onGetUnansweredQuestions = createAction(
    '[Question] On Get Unanswered Questions',
    props<{ next: number }>()
);

export const getUnansweredQuestions = createAction(
    '[Question] Get Unanswered Questions',
    props<{ totalQuestions: number, questions: Question[] }>()
);

export const onGetTags = createAction(
    '[Question] On Get Tags'
);

export const getTags = createAction(
    '[Question] Get Tags',
    props<{ tags: string[] }>()
);

export const onFindQuestionById = createAction(
    '[Question] On Find Question By Id',
    props<{ id: string }>()
);

export const findQuestionById = createAction(
    '[Question] Find Question By Id',
    props<{ question: Question }>()
);

export const onFindQuestionsByTag = createAction(
    '[Question] On Find Question By Tag',
    props<{ tag: string, next: number }>()
);

export const findQuestionsByTag = createAction(
    '[Question] Find Question By Tag',
    props<{ tag: string, questions: Question[] }>()
);

export const addQuestionsByTag = createAction(
    '[Question] Add Question By Tag',
    props<{ tag: string, questions: Question[] }>()
);

export const onFindQuestionsByKeywords = createAction(
    '[Question] On Find Question By Keywords',
    props<{ keywords: string, next: number }>()
);

export const findQuestionsByKeywords = createAction(
    '[Question] Find Question By Keywords',
    props<{ keywords: string, questions: Question[] }>()
);

export const onCreateQuestion = createAction(
    '[Question] On Create Question',
    props<{ question: Question }>()
);

export const createQuestion = createAction(
    '[Question] Create Question',
    props<{ question: Question }>()
);

export const onEditQuestion = createAction(
    '[Question] On Edit Question',
    props<{ questionId: string, newQuestionContent: string }>()
);

export const editQuestion = createAction(
    '[Question] Edit Question',
    props<{ question: Question }>()
);

export const onDeleteQuestion = createAction(
    '[Question] On Delete Question',
    props<{ questionId: string }>()
);

export const deleteQuestion = createAction(
    '[Question] Delete Question',
    props<{ question: Question }>()
);

export const onVoteQuestion = createAction(
    '[Question] On Vote Question',
    props<{ questionId: string, upvote: boolean }>()
);

export const voteQuestion = createAction(
    '[Question] Vote Question',
    props<{ question: Question }>()
);

export const onAddAnswer = createAction(
    '[Answer] On Add Answer',
    props<{ questionId: string, newAnswer: Answer }>()
);

export const addAnswer = createAction(
    '[Answer] Add Answer',
    props<{ question: Question }>()
);

export const onEditAnswer = createAction(
    '[Answer] On Edit Answer',
    props<{ questionId: string, answerId: string, newAnswer: string }>()
);

export const editAnswer = createAction(
    '[Answer] Edit Answer',
    props<{ question: Question }>()
);

export const onUpdateCorrectAnswer = createAction(
    '[Answer] On Update Correct Answer',
    props<{ questionId: string, correctAnswerId: string, undo: boolean }>()
);

export const updateCorrectAnswer = createAction(
    '[Answer] Update Correct Answer',
    props<{ question: Question }>()
);

export const onVoteAnswer = createAction(
    '[Answer] On Vote Answer',
    props<{ questionId: string, answerId: string, upvote: boolean }>()
);

export const voteAnswer = createAction(
    '[Answer] Vote Answer',
    props<{ question : Question }>()
);

export const onDeleteAnswer = createAction(
    '[Answer] On Delete Answer',
    props<{ questionId: string, answerId: string }>()
);

export const deleteAnswer = createAction(
    '[Answer] Delete Answer',
    props<{ question : Question }>()
);