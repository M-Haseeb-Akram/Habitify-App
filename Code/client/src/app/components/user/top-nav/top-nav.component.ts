import { Observable } from 'rxjs';
/* eslint-disable @typescript-eslint/no-empty-function */
import { UserService } from './../../../services/user.service';
import { ElementRef } from '@angular/core';
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
    public sortingInedex = 'ascending';
    private today =  new Date();
    public start_date!: string;
    @ViewChild('input', { static: false })
    set input(element: ElementRef<HTMLInputElement>) {
        if(element) {
            element.nativeElement.focus()
        }
    }
    constructor(public dialog: MatDialog,
      private elementRef: ElementRef,
      public userService: UserService) {
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AddHabitsComponent, {
            width: '500px',
            data: {}
        });
    }
    ngOnInit(): void {
    }

    cancelSearch = () => {
        this.search = false;
        this.userService.filterString.next('');
    }

    setSortingIndex = (value: string) => {
        this.userService.sortingValue.next(value);
        this.sortingInedex =  value;
    }

}

