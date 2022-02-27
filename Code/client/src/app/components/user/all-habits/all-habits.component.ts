import { MessageService } from './../../../services/message.service';
import { DatePickerPipe } from './../../../pipes/date-picker.pipe';
import { Store } from '@ngrx/store';
import { UserService } from './../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Habits } from 'src/app/models/habits.model';
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
    public Habits!: any[];
    public allHabits: any[] = [];
    public dailyHabits!: any[];
    public weeklyHabits!: any[];
    public monthlyHabits!: any[];
    public successful!: any[];
    public failed!: any[];
    public skiped!: any[];
    public param!: string;
    private subscription!: Subscription;
    private filterSub!: Subscription;
    private sortSub!: Subscription;
    private dateSub!: Subscription;
    private chceckModeSub!: Subscription;
    public searchFor = '';
    public checkMode!: any;
    public sortType = 'ascending';
    public selectedDate!: Date;
    constructor(
        private titleService: Title,
        private route: ActivatedRoute,
        public userService: UserService,
        public msgService: MessageService,
        private store:Store<AppState>,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private filterByDate: DatePickerPipe,
    ) {
        const question = "../../../../assets/icons/question.svg";
        const question2 = "../../../../assets/icons/question2.svg";
        this.titleService.setTitle("All Habits, Today - Habitify");
        this.matIconRegistry.addSvgIcon(
            "question",
            this.domSanitizer.bypassSecurityTrustResourceUrl(question)
        );
        this.matIconRegistry.addSvgIcon(
            "question2",
            this.domSanitizer.bypassSecurityTrustResourceUrl(question2)
        );
    }


    ngOnInit(): void {
        this.filterSub = this.msgService.getFilter().subscribe(filter => {
            this.searchFor = filter ;
        });
        this.sortSub = this.msgService.getSortingValue().subscribe(type => {
            this.sortType = type ;
        });
        this.chceckModeSub = this.msgService.getCheckMode().subscribe(mode => {
            this.checkMode = mode ;
        });
        this.dateSub = this.msgService.getDatePicker().subscribe((date:any) => {
            this.selectedDate = date;
            this.handleHabitsCatagories(this.filterDateVise(this.allHabits, this.selectedDate));
        });
        this.route.url.subscribe( params => {
            this.param = params[0].path;
        });
        this.subscription = this.store.select('user').pipe(
            map(userState => {
                return userState.habits
            })
        ).subscribe(user => {
            this.allHabits = user;
            const habits = this.filterDateVise(user, this.selectedDate)
            this.handleHabitsCatagories(habits);
        });
    }


    handleHabitsCatagories = (user:any):void => {
        const today = new Date();
        const param = "time-of-day";
        const hours = today.getHours();
        this.userHabits = user.filter((uh:any) => {
            return uh.catagory !== 'archived';
        });
        if (this.param === param) {
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
            return (uh.schedual === 1 && uh.progress.status === 'pending');
        });
        this.weeklyHabits = this.Habits.filter(uh => {
            return (uh.schedual === 7 && uh.progress.status === 'pending');
        });
        this.monthlyHabits = this.Habits.filter(uh => {
            return (uh.schedual === 31 && uh.progress.status === 'pending');
        });
        this.successful = this.Habits.filter(uh => {
            return uh.progress.status === 'success';
        });
        this.failed = this.Habits.filter(uh => {
            return uh.progress.status === 'fail';
        });
        this.skiped = this.Habits.filter(uh => {
            return uh.progress.status === 'skip';
        });
    }

    filterDateVise = (habits: Habits[], selectedDate:Date): Habits[] => {
        const filterdArr = this.filterByDate.transform(habits, selectedDate);
        return filterdArr;
    }

    skipOrFailHabit = (res: any) => {
        const status = res.status;
        let value: any;
        if (status === 'skip') {
            const skip = Number(res.skip + res.days);
            value = {
                skip: skip,
                fail: res.fail,
                success: res.success,
                status: 'skip'
            }
        }
        if (status === 'fail') {
            const fail = Number(res.fail + res.days)
            value = {
                skip: res.skip,
                fail: fail,
                success: res.success,
                status: 'fail'
            }
        }
        this.userService.onUpdateHabitProgress(res.hid, res.pid, value);
    }

    checkInHabit = (res: any) => {
        const done = res.done + 1;
        const status = done === res.goal ? 'success' : res.status;
        const success = done === res.goal ? (res.success + res.days) : res.success;
        const value = {
            done: done,
            success: success,
            status: status
        }

        this.userService.onCheckInHabitCatagory(res.hid, res.pid, value);
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.filterSub.unsubscribe();
        this.sortSub.unsubscribe();
        this.dateSub.unsubscribe();
        this.chceckModeSub.unsubscribe();
    }
}
