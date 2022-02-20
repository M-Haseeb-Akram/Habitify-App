import { Habits } from './../../../models/habits.model';
import { Subscription } from 'rxjs';
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { AppState } from 'src/app/store/state/app.state';

@Component({
    selector: 'app-manage-habits',
    templateUrl: './manage-habits.component.html',
    styleUrls: ['./manage-habits.component.css']
})
export class ManageHabitsComponent implements OnInit, OnDestroy {
    public active = 'active';
    public catagory = 'all';
    public subscription!: Subscription;
    public filterSub!: Subscription;
    public viewHabitSub!: Subscription;
    public HabitsToShow: Habits[] = [];
    public anyTimeHabits: Habits[] = [];
    public morningHabits: Habits[] = [];
    public afternoonHabits: Habits[] = [];
    public eveningHabits: Habits[] = [];
    public archivedHabits: Habits[] = [];
    public searchFor = '';
    constructor(
    private titleService: Title,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    public userService: UserService,
    private store:Store<AppState>,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    ) {
        this.titleService.setTitle("Manage Habits - Habitify");
        this.matIconRegistry.addSvgIcon(
            "question_mark",
            this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../assets/icons/question-marks.svg")
        );
    }
    ngOnInit(): void {
        this.filterSub = this.userService.getFilter().subscribe(filter => {
            this.searchFor = filter ;
        });
        this.subscription = this.store.select('user').pipe(
            map(userState => {
                return userState.habits
            })
        ).subscribe(user => {

            this.HabitsToShow= [];
            this.anyTimeHabits = [];
            this.morningHabits = [];
            this.afternoonHabits = [];
            this.eveningHabits = [];
            this.archivedHabits = [];
            user.map((uh:any) => {
                if (uh.catagory !== 'archived') {
                    this.anyTimeHabits.push(uh);
                }
                if (uh.catagory === 'morning') {
                    this.morningHabits.push(uh);
                }
                if (uh.catagory === 'afternoon') {
                    this.afternoonHabits.push(uh);
                }
                if (uh.catagory === 'evening') {
                    this.eveningHabits.push(uh);
                }
                if (uh.catagory === 'archived') {
                    this.archivedHabits.push(uh);
                }
            });
            this.manageHabits(this.catagory, this.active);
        });
    }

    manageHabits = (catagory:string, activeMenu: string) => {
        this.catagory = catagory;
        this.active = activeMenu;
        if(catagory === 'all') {
            this.HabitsToShow = this.anyTimeHabits;
        }
        if(catagory === 'morning') {
            this.HabitsToShow = this.morningHabits;
        }
        if(catagory === 'afternoon') {
            this.HabitsToShow = this.afternoonHabits;
        }
        if(catagory === 'evening') {
            this.HabitsToShow = this.eveningHabits;
        }
        if(catagory === 'archived') {
            this.HabitsToShow = this.archivedHabits;
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.filterSub.unsubscribe();
        this.userService.filterString.next('');
    }

}
