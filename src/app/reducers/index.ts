import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { lodaingReducer, loadingNode, LoadingState } from './loading/loading.reducer';

export interface State {
  [loadingNode]: LoadingState;

}

export const reducers: ActionReducerMap<State> = {
  [loadingNode]: lodaingReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
