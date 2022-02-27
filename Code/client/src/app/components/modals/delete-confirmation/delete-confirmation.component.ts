import { MessageService } from './../../../services/message.service';
import { Delete_Habit } from './../../../store/actions/habits.action';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { AddHabitsComponent } from '../add-habits/add-habits.component';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-delete-confirmation',
    templateUrl: './delete-confirmation.component.html',
    styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {
    public editModeId = '';
    constructor(public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
      public addDialogRef: MatDialogRef<AddHabitsComponent>,
      public store: Store<AppState>,
      public userService: UserService,
      public msgService: MessageService) { }
    ngOnInit(): void {
        this.msgService.getEditedId().pipe(take(1)).subscribe((id) => {
            this.editModeId = id;
        });
    }
    closeDeletion(): void {
        this.dialogRef.close();

    }
    onDeleteHabit = (id:string) => {
        this.userService.deleteHabit(id).subscribe((res:any) => {
            console.log(`Deleted Successfully! ${res}`);
            this.dialogRef.close();
            this.msgService.editMode.next(false);
            this.store.dispatch(new Delete_Habit(id));
        });
    }
}
