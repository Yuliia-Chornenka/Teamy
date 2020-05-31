import { LoadingActions, loadingActionsType } from './loading.actions';

export const loadingNode = 'loading';

export interface LoadingState {
    loading: boolean;
}

const initialState = { loading: false };

export const lodaingReducer = (state: LoadingState = initialState, action: LoadingActions) => {
    switch (action.type) {
        case loadingActionsType.start:
            return {
                ...state,
                loading: true
            };
        case loadingActionsType.finish:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }

};
