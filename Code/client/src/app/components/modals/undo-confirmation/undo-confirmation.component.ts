import { MessageService } from './../../../services/message.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddHabitsComponent } from '../add-habits/add-habits.component';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

@Component({
    selector: 'app-undo-confirmation',
    templateUrl: './undo-confirmation.component.html',
    styleUrls: ['./undo-confirmation.component.css']
})
export class UndoConfirmationComponent implements OnInit {

    public editModeId = '';
    public value!: any;
    constructor(
      public dialogRef: MatDialogRef<UndoConfirmationComponent>,
      public addDialogRef: MatDialogRef<AddHabitsComponent>,
      public store: Store<AppState>,
      public userService: UserService,
      public msgService: MessageService) { }

    ngOnInit(): void {
        this.msgService.getUndoConfirmation().pipe(take(1)).subscribe((res:any) => {
            this.value = res;
        });
    }
    closeDeletion(): void {
        this.dialogRef.close();

    }
    undoHabit = (res: any) => {
        const status = res.status;
        let value: any;
        if (status === 'success') {
            const success = Number(res.success - res.days);
            value = {
                skip: res.skip,
                fail: res.fail,
                success: success,
                status: 'pending'
            }
        } else if (status === 'fail') {
            const fail = Number(res.fail - res.days)
            value = {
                skip: res.skip,
                fail: fail,
                success: res.success,
                status: 'pending'
            }
        } else {
            const skip = Number(res.skip - res.days)
            value = {
                skip: skip,
                fail: res.fail,
                success: res.success,
                status: 'pending'
            }
        }
        this.userService.onUpdateHabitProgress(res.hid, res.pid, value);
        this.dialogRef.close();
    }
}
