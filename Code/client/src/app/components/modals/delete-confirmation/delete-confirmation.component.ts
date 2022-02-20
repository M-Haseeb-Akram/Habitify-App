import { Delete_Habit } from './../../../store/actions/habits.action';
import { UserService } from './../../../services/user.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { map } from 'rxjs/operators';
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
      public userService: UserService) { }
    ngOnInit(): void {
        this.userService.getEditedId().pipe(take(1)).subscribe((id) => {
            this.editModeId = id;
        });
    }
    closeDeletion(): void {
        this.dialogRef.close();

    }
    onDeleteHabit = (id:string) => {
        this.userService.deleteHabit(id).subscribe((res:any) => {
            console.log('Deleted Successfully');
            this.dialogRef.close();
            this.userService.editMode.next(false);
            this.store.dispatch(new Delete_Habit(id));
        });
    }
}
