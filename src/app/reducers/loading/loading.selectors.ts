import { createFeatureSelector, createSelector } from '@ngrx/store';
import { loadingNode, LoadingState } from './loading.reducer';

const selectLoadingFeature = createFeatureSelector<LoadingState>(loadingNode);

export const selectLoading = createSelector(selectLoadingFeature, (state): boolean => state.loading);
