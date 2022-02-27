import { UndoConfirmationComponent } from './../components/modals/undo-confirmation/undo-confirmation.component';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, take } from 'rxjs';
import { AddHabitsComponent } from '../components/modals/add-habits/add-habits.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../components/modals/delete-confirmation/delete-confirmation.component';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    public filterString: Subject<string> = new Subject();
    public sortingValue: Subject<string> = new Subject();
    public checkMode: BehaviorSubject<any> = new BehaviorSubject({mode:'', value: ''});
    public datePicker: BehaviorSubject<Date> = new BehaviorSubject(new Date());
    public editMode = new BehaviorSubject(false);
    public habitToBeEdit = new BehaviorSubject('');
    public progressMode = new BehaviorSubject(false);
    public progressId = new BehaviorSubject('');
    public isCloseAddDialog = new BehaviorSubject(false);
    public undoConfirmation = new BehaviorSubject({});
    constructor(
        private dialog: MatDialog,
        public addDialogRef: MatDialogRef<AddHabitsComponent>,

    ) {

    }

    getUndoConfirmation = () => {
        return this.undoConfirmation.asObservable();
    }
    getCheckMode = () => {
        return this.checkMode.asObservable();
    }
    getFilter = () => {
        return this.filterString.asObservable();
    }

    getSortingValue = () => {
        return this.sortingValue.asObservable();
    }
    getDatePicker = () => {
        return this.datePicker.asObservable();
    }

    getEditMode = () => {
        return this.editMode.asObservable();
    }
    getEditedId = () => {
        return this.habitToBeEdit.asObservable();
    }
    getProgressId = () => {
        return this.progressId.asObservable();
    }
    getAddDialogMode = () => {
        return this.isCloseAddDialog.asObservable();
    }
    getProgressMode = () => {
        return this.progressMode.asObservable();
    }
    openAddDialog(): void {
        this.dialog.open(AddHabitsComponent, {
            width: '500px',
            disableClose: false,
        });
    }
    setEditMode = (id:string) => {
        this.editMode.next(true);
        this.habitToBeEdit.next(id);
        this.openAddDialog();
    }
    setProgressMode = (id:string) => {
        this.progressMode.next(true);
        this.progressId.next(id);
    }
    onNoClick(): void {
        this.editMode.next(false);
        this.habitToBeEdit.next('');
        this.isCloseAddDialog.next(true);
    }
    openDeleteDialog(id:string): void {
        this.habitToBeEdit.next(id);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.position = {
            'top': '20px',
        };
        dialogConfig.width = '450px';
        const deleteDialogRef = this.dialog.open(DeleteConfirmationComponent, dialogConfig);
        deleteDialogRef.afterClosed().subscribe((result:any) => {
            this.getEditMode().pipe(take(1)).subscribe(mode => {
                if (!mode) {
                    this.onNoClick();
                    console.log(result);
                }
            })
        })
    }

    openUndoConfirmationBox(value:any): void {
        this.undoConfirmation.next(value);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '450px';
        const undoDialogRef = this.dialog.open(UndoConfirmationComponent, dialogConfig);
        undoDialogRef.afterClosed().subscribe((result:any) => {
            this.undoConfirmation.next({});
            console.log(result);
        })
    }
}
