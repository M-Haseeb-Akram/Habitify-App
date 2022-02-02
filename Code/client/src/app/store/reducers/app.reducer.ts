/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppState, reducers } from './../state/app.state';
import { ActionReducerMap } from "@ngrx/store";


export const appReducer: ActionReducerMap<AppState, any> = reducers;
