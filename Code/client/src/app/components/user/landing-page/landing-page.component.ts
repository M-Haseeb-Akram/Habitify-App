import { MessageService } from './../../../services/message.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { User_Habits } from 'src/app/store/actions/habits.action';
import { ActivatedRoute } from '@angular/router';
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
      public msgService: MessageService,
      private route: ActivatedRoute,
      public store: Store<AppState>
    ) { }

    ngOnInit(): void {
        this.isLoading = false;
        this.msgService.getProgressMode().subscribe(mode => this.progressMode = mode);
        this.userService.viewHabits().subscribe((res:any) => {
            this.store.dispatch(new User_Habits(res.habits));
        });
        this.route.url.subscribe( params => {
            this.msgService.progressMode.next(false);
            this.msgService.progressId.next('');
        });
    }

}
