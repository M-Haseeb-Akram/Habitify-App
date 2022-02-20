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
    case HabitsActions.HabitsActionTypes.DELETE_HABIT: {
        return {
            ...state,
            habits: state.habits.filter(habits => {
                return habits._id !== action.payload;
            })
        }
    }
    case HabitsActions.HabitsActionTypes.UPDATE_HABIT: {
        const updatedHabits = [...state.habits];
        for (let index = 0; index < state.habits.length; index++) {
            if( state.habits[index]._id === action.payload.id) {
                updatedHabits[index] = action.payload.habit;
                break;
            }
        }
        return {
            ...state,
            habits: updatedHabits
        }
    }
    default: {
        return state;
    }
    }
}

