import { Habits } from '../../models/habits.model';
import { Action } from '@ngrx/store';


export enum HabitsActionTypes {
  EXISTING_HABITS = 'VIEW_HABITS',
  ADD_HABITS = 'ADD_HABITS',
  DELETE_HABIT = 'DELETE_HABIT',
  UPDATE_HABIT = 'UPDATE_HABIT',
}


export class User_Habits implements Action {
    readonly type = HabitsActionTypes.EXISTING_HABITS;
    constructor(public payload: Habits[]) {}
}

export class Add_Habits implements Action {
    readonly type = HabitsActionTypes.ADD_HABITS;
    constructor(public payload: Habits) {}
}

export class Delete_Habit implements Action {
    readonly type = HabitsActionTypes.DELETE_HABIT;
    constructor(public payload: string) {}
}

export class Update_Habit implements Action {
    readonly type = HabitsActionTypes.UPDATE_HABIT;
    constructor(public payload: {id: string; habit: Habits}) {}
}

export type Habit =
  | User_Habits
  | Add_Habits
  | Delete_Habit
  | Update_Habit
