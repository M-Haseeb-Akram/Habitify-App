import { MessageService } from './message.service';
import { PROXY_CONFIG } from './../config/proxy.conf';
import { Habits } from './../models/habits.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { Update_Habit } from '../store/actions/habits.action';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private accessToken!: string;
    constructor(
        private httpClient: HttpClient,
        private store: Store<AppState>,
        private messageService: MessageService,

    ) {
        this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user
            })
        ).subscribe(user => this.accessToken = user.accessToken);
    }

    onUpdateHabitCatagory = (id:string, catagory:string) => {
        this.updateHabitCatagory(id, catagory).subscribe((res:any) => {
            this.store.dispatch(new Update_Habit({id: id, habit: res.data}));
            this.messageService.onNoClick();
        });
    }

    onUpdateHabitProgress = (pid: string, hid: string, value: any) => {
        this.updateHabitProgress(pid, hid, value).subscribe((res:any) => {
            this.store.dispatch(new Update_Habit({id: pid, habit: res.data}));
            this.messageService.undoConfirmation.next({});
        });
    }

    onCheckInHabitCatagory = (pid: string, hid: string, value: any) => {
        this.checkInHabitProgress(pid, hid, value).subscribe((res:any) => {
            this.store.dispatch(new Update_Habit({id: pid, habit: res.data}));
        });
    }
    addHabit = (newHabit: Habits): Observable<any> => {
        return this.httpClient.post<any>(`${PROXY_CONFIG.target}/api/user/habit`, newHabit ,{
            headers: { Authorization: this.accessToken, 'Content-Type': 'application/json' }
        });
    }

    viewHabits = (): any => {
        const headers = { Authorization: this.accessToken }
        return this.httpClient.get<any>(
            `${PROXY_CONFIG.target}/api/user/habits`,
            {
                'headers': headers,
            }
        );
    }

    getSingleHabit = (id:string): any => {
        const headers = { Authorization: this.accessToken }
        return this.httpClient.get<any>(
            `${PROXY_CONFIG.target}/api/user/habit/${id}`,
            {
                'headers': headers,
            }
        );
    }

    updateHabit = (id:string, editedHabit: any): any => {
        const headers = { Authorization: this.accessToken }
        return this.httpClient.patch<any>(
            `${PROXY_CONFIG.target}/api/user/habit/${id}`,
            editedHabit,
            {
                'headers': headers,
            }
        );
    }
    updateHabitCatagory = (id:string, catagory: string): any => {
        const headers = { Authorization: this.accessToken }
        return this.httpClient.patch<any>(
            `${PROXY_CONFIG.target}/api/user/habit/catagory/${id}`,
            { catagory },
            {
                'headers': headers,
            }
        );
    }

    updateHabitProgress = (hid:string, pid: string, newValue: any): any => {
        const headers = { Authorization: this.accessToken };
        const body = {
            skip: newValue.skip,
            fail: newValue.fail,
            success: newValue.success,
            status: newValue.status
        }
        return this.httpClient.patch<any>(
            `${PROXY_CONFIG.target}/api/user/habit/progress/${hid}/${pid}`,
            body,
            {
                'headers': headers,
            }
        );
    }

    checkInHabitProgress = (hid:string, pid: string, newValue: any): any => {
        const headers = { Authorization: this.accessToken };
        const body = {
            done: newValue.done,
            success: newValue.success,
            status: newValue.status
        }
        return this.httpClient.patch<any>(
            `${PROXY_CONFIG.target}/api/user/habit/progress/check/${hid}/${pid}`,
            body,
            {
                'headers': headers,
            }
        );
    }
    deleteHabit = (id:string): any => {
        const headers = { Authorization: this.accessToken }
        return this.httpClient.delete<any>(
            `${PROXY_CONFIG.target}/api/user/habit/${id}`,
            {
                'headers': headers,
            }
        );
    }

}
