import { MessageService } from './../../../services/message.service';
import { take, Subscription } from 'rxjs';
import { Add_Habits, Update_Habit } from './../../../store/actions/habits.action';
import { Habits } from './../../../models/habits.model';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
@Component({
    selector: 'app-add-habits',
    templateUrl: './add-habits.component.html',
    styleUrls: ['./add-habits.component.css']
})
export class AddHabitsComponent implements OnInit, OnDestroy {
    private today =  new Date();
    public startDate!:string;
    public habitsForm!: FormGroup;
    private newHabit!: Habits;
    private user_id!: string;
    public editMode!: boolean;
    public editModeId!: string;
    public dataOfHabit!: Habits;
    public isLoading = true;
    private isClosed!: Subscription;
    public schedualOption =
        [
            {value: 1, title: 'Per Day'},
            {value: 7, title: 'Per Week'},
            {value: 31, title: 'Per Month'}
        ];
    public catagoryOption =
        [
            {value: 'all', title: 'Any Time'},
            {value: 'morning', title: 'Morning'},
            {value: 'afternoon', title: 'Afternoon'},
            {value: 'evening', title: 'Evening'}
        ];
    public weekDays =
        [
            { title: 'Monday', activated: true, value: 'Mon' },
            { title: 'Tuesday', activated: true, value: 'Tue' },
            { title: 'Wednesday', activated: true, value: 'Wed' },
            { title: 'Thursday', activated: true, value: 'Thu' },
            { title: 'Friday', activated: true, value: 'Fri' },
            { title: 'Saturday', activated: true, value: 'Sat' },
            { title: 'Sunday', activated: true, value: 'Sun' },
        ];
    private selectedDays: string[] = [];
    public formattedSelectedDays!: string;
    constructor(
      public userService: UserService,
      public msgService: MessageService,
      private store: Store<AppState>,
      public dialogRef: MatDialogRef<AddHabitsComponent>,
      public dialog: MatDialog) {
        this.onDaySelect();
    }
    public ngOnInit() {
        this.startDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' + ('0' + this.today.getDate()).slice(-2);
        this.msgService.getEditedId().pipe(take(1)).subscribe(id => this.editModeId = id);
        this.isClosed = this.msgService.getAddDialogMode().subscribe((mode:boolean) => {
            if(mode) {
                this.dialogRef.close();
            }
        })
        this.msgService.getEditMode().pipe(take(1)).subscribe((mode) => {
            this.editMode = mode;
            if (this.editMode) {
                this.userService.getSingleHabit(this.editModeId).subscribe((res : any) => {
                    this.dataOfHabit = res.habit;
                    this.today = new Date(this.dataOfHabit.start_date)
                    this.startDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' + ('0' + this.today.getDate()).slice(-2);
                    this.isLoading = false;
                    this.initForm();
                })
            }
            else {
                this.isLoading = false;
                this.initForm();
            }
        });
    }

    public onDaySelect() {
        this.selectedDays = this.weekDays
            .filter(menuitem => menuitem.activated)
            .map(menuitem => menuitem.value);
        this.formattedSelectedDays = this.selectedDays.join(',');
        console.log(this.formattedSelectedDays);
    }

    initForm = () => {
        if (!this.editMode) {
            this.habitsForm = new FormGroup({
                name: new FormControl(null, [Validators.required, this.validateName]),
                Goal: new FormControl(1),
                schedual: new FormControl(this.schedualOption[0].value),
                repeat: new FormControl(this.formattedSelectedDays),
                catagory: new FormControl(this.catagoryOption[0].value),
                start_date: new FormControl(this.startDate)
            });
        }
        else {
            this.habitsForm = new FormGroup({
                name: new FormControl(this.dataOfHabit.Name, [Validators.required, this.validateName]),
                Goal: new FormControl(this.dataOfHabit.Goal.toString()),
                schedual: new FormControl(this.dataOfHabit.schedual.toString()),
                repeat: new FormControl(),
                catagory: new FormControl(this.dataOfHabit.catagory),
                start_date: new FormControl(this.startDate)
            });
        }
    }

    validateName = (control: AbstractControl): {[s:string]: boolean} | null => {
        const match = /^[a-zA-Z ]+$/;
        if(!match.test(control.value)){
            return {'isInValid': true}
        }
        return null;
    }
    addHabit =  () =>{
        const repeat = "0 0 * * 0-7";
        if (this.editMode) {
            const newHabit = {
                Name: this.habitsForm.value.name,
                Goal: this.habitsForm.value.Goal,
                schedual: this.habitsForm.value.schedual,
                repeat: repeat,
                start_date: new Date(this.habitsForm.value.start_date),
                catagory: this.habitsForm.value.catagory,
            }
            this.userService.updateHabit(this.editModeId, newHabit).subscribe((res:any)=>{
                console.log('Updated Successfully!');
                this.store.dispatch(new Update_Habit({id: this.editModeId, habit: res.data}));
                this.msgService.onNoClick();

            },(err:any) => {
                console.log(err.error);
            });
        }
        else {
            this.newHabit = {
                userId: this.user_id,
                Name: this.habitsForm.value.name,
                Goal: this.habitsForm.value.Goal ?? 1,
                schedual: this.habitsForm.value.schedual ?? 1,
                repeat: repeat,
                start_date: new Date(this.habitsForm.value.start_date) ?? new Date(this.startDate),
                streak: 0,
                catagory: this.habitsForm.value.catagory ?? "all",
                progress: []
            }
            this.userService.addHabit(this.newHabit).subscribe((res)=>{
                this.store.dispatch(new Add_Habits(res.newHabit));
                this.msgService.onNoClick();

            },(err) => {
                console.log(err.error);
            });
        }
    }
    public ngOnDestroy() {
        this.isClosed.unsubscribe();
        this.dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
            this.msgService.editMode.next(false);
            this.msgService.habitToBeEdit.next('');
            this.msgService.isCloseAddDialog.next(false);
            console.log(result);
        });
    }

}
