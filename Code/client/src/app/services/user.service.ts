import { Add_Habits } from './../store/actions/habits.action';
import { PROXY_CONFIG } from './../config/proxy.conf';
import { Habits } from './../models/habits.model';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { User_Habits } from '../store/actions/habits.action';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private accessToken!: string;
    constructor(
        private httpClient: HttpClient,
        private store: Store<AppState>) {
        this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user
            })
        ).subscribe(user => this.accessToken = user.accessToken);
    }
    addHabit = (newHabit: Habits): Observable<any> => {
        return this.httpClient.post<any>(`${PROXY_CONFIG.target}/api/user/add-habit`,{ habit: newHabit },{
            headers: { Authorization: this.accessToken, 'Content-Type': 'application/json' }
        });
    }

    viewHabits = (): any => {
        const headers = { Authorization: this.accessToken }
        return this.httpClient.get<any>(
            `${PROXY_CONFIG.target}/api/user/get-habits`,
            {
                'headers': headers,
            }
        );
    }
}
