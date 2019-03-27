import { QuestionState } from './question.reducers';

export const selectQuestion = (state: QuestionState) => state.questions;