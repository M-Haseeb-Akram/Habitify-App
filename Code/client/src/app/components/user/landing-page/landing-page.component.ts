import { UserService } from './../../../services/user.service';
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { User_Habits } from 'src/app/store/actions/habits.action';
@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
    isLoading = true;
    public progressMode = false;
    constructor(
      public userService: UserService,
      public store: Store<AppState>
    ) { }

    ngOnInit(): void {
        this.isLoading = false;
        this.userService.getProgressMode().subscribe(mode => this.progressMode = mode);
        this.userService.viewHabits().subscribe((res:any) => {
            this.store.dispatch(new User_Habits(res.habits));
        });
    }

}
