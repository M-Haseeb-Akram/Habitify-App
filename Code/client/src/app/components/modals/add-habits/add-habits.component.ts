/* eslint-disable @typescript-eslint/no-unused-vars */
import { Habits } from './../../../models/habits.model';
import { UserService } from './../../../services/user.service';
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';

interface DialogData {
  email: string;
}

@Component({
    selector: 'app-add-habits',
    templateUrl: './add-habits.component.html',
    styleUrls: ['./add-habits.component.css']
})
export class AddHabitsComponent implements OnInit {
    private today =  new Date();
    public Today:string;
    public habitsForm!: FormGroup;
    private newHabit!: Habits;
    private user_id!: string;
    constructor(
      private userService: UserService,
      private store: Store<AppState>,
      public dialogRef: MatDialogRef<AddHabitsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.Today = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' + ('0' + this.today.getDate()).slice(-2);
        this.initForm();
        this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user
            })
        ).subscribe(user => this.user_id = user.user.user_id);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    private initForm() {
        this.habitsForm = new FormGroup({
            name: new FormControl(null, [Validators.required, this.validateName]),
            Goal: new FormControl(1),
            schedual: new FormControl(),
            repeat: new FormControl(),
            catagory: new FormControl(),
            start_date: new FormControl(this.Today)
        })
    }

    ngOnInit(): void {
    }
    validateName = (control: AbstractControl): {[s:string]: boolean} | null => {
        if(!/^[a-zA-Z ]+$/.test(control.value)){
            return {'isInValid': true}
        }
        return null;
    }
    onAddHabit = () =>{
        this.newHabit = {
            userId: this.user_id,
            Name: this.habitsForm.value.name,
            Goal: this.habitsForm.value.Goal ?? 1,
            schedual: this.habitsForm.value.schedual ?? 1,
            repeat: "0 0 * * 0-7",
            start_date: this.habitsForm.value.start_date ?? this.Today,
            streak: 0,
            catagory: this.habitsForm.value.catagory ?? "All"
        }
        this.userService.addHabit(this.newHabit).subscribe(
            (res) => {
                this.onNoClick();
            },
            (error) => {
                console.log(error);
            }
        );
        // console.log(this.habitsForm.value.name);
        // console.log(JSON.stringify(this.newHabit));
    }
}
