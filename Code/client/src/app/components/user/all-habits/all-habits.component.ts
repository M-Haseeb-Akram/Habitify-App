import { MatDialog } from '@angular/material/dialog';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AddHabitsComponent } from '../../modals/add-habits/add-habits.component';

@Component({
    selector: 'app-all-habits',
    templateUrl: './all-habits.component.html',
    styleUrls: ['./all-habits.component.css']
})
export class AllHabitsComponent implements OnInit {

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(private titleService: Title,
        private dialog: MatDialog
    ) {
        this.titleService.setTitle("All Habits, Today - Habitify");
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AddHabitsComponent, {
            width: '500px',
            data: {}
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ngOnInit(): void {
    }
}
