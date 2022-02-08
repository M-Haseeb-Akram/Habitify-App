import { Add_Habits } from './../../../store/actions/habits.action';
import { Store } from '@ngrx/store';
import { UserService } from './../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { AddHabitsComponent } from '../../modals/add-habits/add-habits.component';
import { Habits } from 'src/app/models/habits.model';
import { User_Habits } from 'src/app/store/actions/habits.action';
import { AppState } from 'src/app/store/state/app.state';
import { async, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
    selector: 'app-all-habits',
    templateUrl: './all-habits.component.html',
    styleUrls: ['./all-habits.component.css']
})
export class AllHabitsComponent implements OnInit {
    public userHabits!: Habits[];
    public Habits!: Habits[];
    public dailyHabits!: Habits[];
    public weeklyHabits!: Habits[];
    public monthlyHabits!: Habits[];
    public param!: string;
    constructor(private titleService: Title,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private userService: UserService,
        private store:Store<AppState>,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {
        this.titleService.setTitle("All Habits, Today - Habitify");
        this.matIconRegistry.addSvgIcon(
            "question",
            this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../assets/icons/question.svg")
        );
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AddHabitsComponent, {
            width: '500px',
            data: {}
        });
    }
    ngOnInit(): void {
        let count = 1;
        this.userService.viewHabits().subscribe(
            (res) => {
                this.store.dispatch(new User_Habits(res.habits));
            },
        );
        this.route.url.subscribe( params => {
            this.param = params[0].path;
            this.store.select('user').pipe(
                take(1),
                map(userState => {
                    return userState.habits
                })
            ).subscribe(user => {
                this.handleHabitsCatagories(user);
            })
        });
        this.store.select('user').pipe(
            take(1),
            map(userState => {
                return userState.habits
            })
        ).subscribe(user => {
            this.handleHabitsCatagories(user);
            console.log(count++);
        })
    }


    handleHabitsCatagories = (user:any):void => {
        const today = new Date();
        const hours = today.getHours();
        this.userHabits = user;
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
}
