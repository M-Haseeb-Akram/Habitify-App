import { ElementRef } from '@angular/core';
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddHabitsComponent } from '../../modals/add-habits/add-habits.component';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
    public selected!: Date | null;
    public search = false;
    @ViewChild('input', { static: false })
    set input(element: ElementRef<HTMLInputElement>) {
        if(element) {
            element.nativeElement.focus()
        }
    }
    constructor(public dialog: MatDialog,
      private elementRef: ElementRef) { }

    openDialog(): void {
        const dialogRef = this.dialog.open(AddHabitsComponent, {
            width: '500px',
            data: {}
        });
    }
    ngOnInit(): void {
    }

}
