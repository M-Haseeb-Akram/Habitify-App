import { PROXY_CONFIG } from './../config/proxy.conf';
import { Habits } from './../models/habits.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { AddHabitsComponent } from '../components/modals/add-habits/add-habits.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Update_Habit } from '../store/actions/habits.action';
import { DeleteConfirmationComponent } from '../components/modals/delete-confirmation/delete-confirmation.component';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    public filterString: Subject<string> = new Subject();
    public sortingValue: Subject<string> = new Subject();
    public datePicker: BehaviorSubject<Date> = new BehaviorSubject(new Date());
    public editMode = new BehaviorSubject(false);
    public habitToBeEdit = new BehaviorSubject('');
    public progressMode = new BehaviorSubject(false);
    public isCloseAddDialog = new BehaviorSubject(false);
    private accessToken!: string;
    constructor(
        private httpClient: HttpClient,
        private store: Store<AppState>,
        private dialog: MatDialog,
        public addDialogRef: MatDialogRef<AddHabitsComponent>,

    ) {
        this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user
            })
        ).subscribe(user => this.accessToken = user.accessToken);
    }

    getFilter = () => {
        return this.filterString.asObservable();
    }

    getSortingValue = () => {
        return this.sortingValue.asObservable();
    }
    getDatePicker = () => {
        return this.datePicker.asObservable();
    }

    getEditMode = () => {
        return this.editMode.asObservable();
    }
    getEditedId = () => {
        return this.habitToBeEdit.asObservable();
    }
    getAddDialogMode = () => {
        return this.isCloseAddDialog.asObservable();
    }
    getProgressMode = () => {
        return this.progressMode.asObservable();
    }
    openAddDialog(): void {
        const dialogRef = this.dialog.open(AddHabitsComponent, {
            width: '500px',
            disableClose: false,
        });
    }
    setEditMode = (id:string) => {
        this.editMode.next(true);
        this.habitToBeEdit.next(id);
        this.openAddDialog();
    }
    setProgressMode = (id:string) => {
        this.progressMode.next(true);
        this.habitToBeEdit.next(id);
    }
    onNoClick(): void {
        this.editMode.next(false);
        this.habitToBeEdit.next('');
        this.isCloseAddDialog.next(true);
    }
    onUpdateHabitCatagory = (id:string, catagory:string) => {
        this.updateHabitCatagory(id, catagory).subscribe((res:any) => {
            this.store.dispatch(new Update_Habit({id: id, habit: res.data}));
            this.onNoClick();
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
    openDeleteDialog(id:string): void {
        this.habitToBeEdit.next(id);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.position = {
            'top': '20px',
        };
        dialogConfig.width = '450px';
        const deleteDialogRef = this.dialog.open(DeleteConfirmationComponent, dialogConfig);
        deleteDialogRef.afterClosed().subscribe(result => {
            this.getEditMode().pipe(take(1)).subscribe(mode => {
                if (!mode) {
                    this.onNoClick();
                }
            })
        })
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
