import { Habits } from "src/app/models/habits.model";
import * as HabitsActions from "../actions/habits.action";

export interface State{
  habits: Habits[],
}
const initialState: State = {
    habits: [],
}

export const HabitsReducers = (state:State = initialState, action: HabitsActions.Habit) => {
    switch (action.type) {
    case HabitsActions.HabitsActionTypes.EXISTING_HABITS: {
        return {
            ...state,
            habits: action.payload
        };
    }
    case HabitsActions.HabitsActionTypes.ADD_HABITS: {
        const newHabits = state.habits;
        return {
            habits: [...newHabits, action.payload]
        };
    }
    default: {
        return state;
    }
    }
}

