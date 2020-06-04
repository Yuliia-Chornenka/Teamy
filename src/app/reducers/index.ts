import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {
  lodaingReducer,
  loadingNode,
  LoadingState,
} from './loading/loading.reducer';
import {
  mentorsNode,
  MentorsState,
  mentorsReducer,
} from './mentors/mentors.reducer';

export interface State {
  [loadingNode]: LoadingState;
  [mentorsNode]: MentorsState;
}

export const reducers: ActionReducerMap<State> = {
  [loadingNode]: lodaingReducer,
  [mentorsNode]: mentorsReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
