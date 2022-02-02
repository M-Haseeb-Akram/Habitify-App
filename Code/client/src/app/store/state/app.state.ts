
import * as fromAuthReducer from '../reducers/auth.reducers';

export interface AppState {
  auth: fromAuthReducer.AuthState;
}

export const reducers = {
    auth: fromAuthReducer.AuthReducers,
}
