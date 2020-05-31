import { Action } from '@ngrx/store';

export enum loadingActionsType {
    start = '[LOADING] start',
    finish = '[LOADING] finish'
}

export class LoadingStartAction implements Action {
    readonly type = loadingActionsType.start;
}

export class LoadingFinishAction implements Action {
    readonly type = loadingActionsType.finish;
}


export type LoadingActions = LoadingStartAction | LoadingFinishAction;
