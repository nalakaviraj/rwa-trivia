import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';

import {AppStore} from '../app-store';
import {Question, User, SearchResults} from '../../../model';
import {ActionWithPayload, QuestionActions} from '../actions';
import {QuestionService} from '../../services'

@Injectable()
export class QuestionEffects {
    constructor (
        private actions$: Actions,
        private questionActions: QuestionActions,
        private svc: QuestionService
    ) {}

    @Effect() 
    loadQuestions$ = this.actions$
        .ofType(QuestionActions.LOAD_QUESTIONS)
        .switchMap((action: ActionWithPayload<{startRow: number, pageSize: number}>) => this.svc.getQuestions(action.payload.startRow, action.payload.pageSize))
        .map((results: SearchResults) => this.questionActions.loadQuestionsSuccess(results));

    @Effect() 
    loadUnpublishedQuestions$ = this.actions$
        .ofType(QuestionActions.LOAD_UNPUBLISHED_QUESTIONS)
        .switchMap(() => this.svc.getUnpublishedQuestions())
        .map((questions: Question[]) => this.questionActions.loadUnpublishedQuestionsSuccess(questions));

    @Effect() 
    loadUserQuestions$ = this.actions$
        .ofType(QuestionActions.LOAD_USER_QUESTIONS)
        .switchMap((action: ActionWithPayload<User>) => this.svc.getUserQuestions(action.payload))
        .map((questions: Question[]) => this.questionActions.loadUserQuestionsSuccess(questions));

    @Effect() 
    loadSampleQuestions$ = this.actions$
        .ofType(QuestionActions.LOAD_SAMPLE_QUESTIONS)
        .switchMap(() => this.svc.getSampleQuestions())
        .map((questions: Question[]) => this.questionActions.loadSampleQuestionsSuccess(questions));

    @Effect() 
    addQuestion$ = this.actions$
        .ofType(QuestionActions.ADD_QUESTION)
        .do((action: ActionWithPayload<Question>) => this.svc.saveQuestion(action.payload))
        .filter(() => false);

    @Effect() 
    approveQuestion$ = this.actions$
        .ofType(QuestionActions.APPROVE_QUESTION)
        .do((action: ActionWithPayload<Question>) => this.svc.approveQuestion(action.payload))
        .filter(() => false);
}