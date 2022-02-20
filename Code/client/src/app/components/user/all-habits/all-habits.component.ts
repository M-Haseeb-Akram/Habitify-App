/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Store } from '@ngrx/store';
import { UserService } from './../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Habits } from 'src/app/models/habits.model';
import { User_Habits } from 'src/app/store/actions/habits.action';
import { AppState } from 'src/app/store/state/app.state';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
    selector: 'app-all-habits',
    templateUrl: './all-habits.component.html',
    styleUrls: ['./all-habits.component.css']
})
export class AllHabitsComponent implements OnInit, OnDestroy {
    public userHabits!: Habits[];
    public Habits!: Habits[];
    public dailyHabits!: Habits[];
    public weeklyHabits!: Habits[];
    public monthlyHabits!: Habits[];
    public param!: string;
    private subscription!: Subscription;
    private filterSub!: Subscription;
    private sortSub!: Subscription;
    private dateSub!: Subscription;
    public searchFor = '';
    public sortType = 'ascending';
    public selectedDate!: Date;

    constructor(
        private titleService: Title,
        private route: ActivatedRoute,
        public userService: UserService,
        private store:Store<AppState>,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
    ) {
        this.titleService.setTitle("All Habits, Today - Habitify");
        this.matIconRegistry.addSvgIcon(
            "question",
            this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../assets/icons/question.svg")
        );
    }


    ngOnInit(): void {
        this.filterSub = this.userService.getFilter().subscribe(filter => {
            this.searchFor = filter ;
        });
        this.sortSub = this.userService.getSortingValue().subscribe(type => {
            this.sortType = type ;
        });
        this.dateSub = this.userService.getDatePicker().subscribe((date:any) => {
            this.selectedDate = date;
        });
        this.route.url.subscribe( params => {
            this.param = params[0].path;
        });
        this.subscription = this.store.select('user').pipe(
            map(userState => {
                return userState.habits
            })
        ).subscribe(user => {
            this.handleHabitsCatagories(user);
        });
    }


    handleHabitsCatagories = (user:any):void => {
        const today = new Date();
        const hours = today.getHours();
        this.userHabits = user.filter((uh:any) => {
            return uh.catagory !== 'archived';
        });
        if (this.param === "time-of-day") {
            if ( hours >= 1 && hours < 12) {
                this.Habits = this.userHabits.filter(uh => {
                    return uh.catagory === 'morning';
                });
            }
            else if (hours >= 12 && hours < 17) {
                this.Habits = this.userHabits.filter(uh => {
                    return uh.catagory === 'afternoon';
                });
            }
            else {
                this.Habits = this.userHabits.filter(uh => {
                    return uh.catagory === 'evening';
                });
            }
        }
        else {
            this.Habits = this.userHabits;
        }
        this.dailyHabits = this.Habits.filter(uh => {
            return uh.schedual === 1;
        });
        this.weeklyHabits = this.Habits.filter(uh => {
            return uh.schedual === 7;
        });
        this.monthlyHabits = this.Habits.filter(uh => {
            return uh.schedual === 31;
        });
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.filterSub.unsubscribe();
        this.sortSub.unsubscribe();
        this.dateSub.unsubscribe();
    }
}
