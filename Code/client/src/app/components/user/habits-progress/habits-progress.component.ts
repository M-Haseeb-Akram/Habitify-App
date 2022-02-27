import { combineLatest, Subscription } from 'rxjs';
import { MessageService } from './../../../services/message.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Habits } from 'src/app/models/habits.model';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-habits-progress',
    templateUrl: './habits-progress.component.html',
    styleUrls: ['./habits-progress.component.css']
})
export class HabitsProgressComponent implements OnInit, OnDestroy {
    public habit!: any;
    private subscription!: Subscription;
    private today = new Date();
    public startDate!: string;
    constructor(
      public userService: UserService,
      public msgService: MessageService,
      private store:Store<AppState>,
    ) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        this.startDate = `${monthNames[this.today.getMonth()]}, ${this.today.getFullYear()}`;
    }

    ngOnInit(): void {
        this.subscription = combineLatest(
            [
                this.msgService.getProgressId(),
                this.store.select('user').pipe(
                    map(userState => {
                        return userState.habits
                    })
                )
            ]
        ).subscribe(([id, habits]: [string, Habits[]]) => {
            this.getHabitProgress(id, habits);
        })
    }

    getHabitProgress = (id: string, habit: any) => {
        this.habit = habit.filter((uh: any) => {
            return uh._id === id;
        })
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
