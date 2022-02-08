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
    // Create Todo
    addHabit = (newHabit: Habits): Observable<any> => {
        const body = JSON.stringify(newHabit);
        const headers = { Authorization: this.accessToken, 'content-type': 'application/json' }
        return this.httpClient.post<any>(
            `${PROXY_CONFIG.target}/api/user/add-habit`,body,
            {
                'headers': headers,
            }
        );
    }

    viewHabits = (): Observable<any> => {
        const headers = { Authorization: this.accessToken }
        return this.httpClient.get<any>(
            `${PROXY_CONFIG.target}/api/user/get-habits`,
            {
                'headers': headers,
            }
        );
    }
}
