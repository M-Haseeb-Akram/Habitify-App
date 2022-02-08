
import * as fromAuthReducer from '../reducers/auth.reducer';
import * as fromHabitsReducer from '../reducers/habits.reducer';

export interface AppState {
  auth: fromAuthReducer.AuthState;
  user: fromHabitsReducer.State;
}

export const reducers = {
    auth: fromAuthReducer.AuthReducers,
    user: fromHabitsReducer.HabitsReducers,
}
