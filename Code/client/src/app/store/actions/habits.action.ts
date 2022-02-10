import { Habits } from '../../models/habits.model';
import { Action } from '@ngrx/store';


export enum HabitsActionTypes {
  EXISTING_HABITS = 'VIEW_HABITS',
  ADD_HABITS = 'ADD_HABITS',
}


export class User_Habits implements Action {
    readonly type = HabitsActionTypes.EXISTING_HABITS;
    constructor(public payload: Habits[]) {}
}

export class Add_Habits implements Action {
    readonly type = HabitsActionTypes.ADD_HABITS;
    constructor(public payload: Habits) {}
}


export type Habit =
  | User_Habits
  | Add_Habits
