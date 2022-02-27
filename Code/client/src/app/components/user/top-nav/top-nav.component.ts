import { MessageService } from './../../../services/message.service';
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
    public sortType = 'Alphabatical';
    @ViewChild('input', { static: false })
    set input(element: ElementRef<HTMLInputElement>) {
        if(element) {
            element.nativeElement.focus()
        }
    }
    constructor(public dialog: MatDialog,
      public userService: UserService,
      public msgService: MessageService,
    ) {
    }

    openDialog(): void {
        this.dialog.open(AddHabitsComponent, {
            width: '500px',
            data: {}
        });
    }
    ngOnInit(): void {
        this.msgService.datePicker.next(this.today);
    }

    cancelSearch = () => {
        this.search = false;
        this.msgService.filterString.next('');
    }

    setSortingIndex = (title: string, value: string) => {
        this.msgService.sortingValue.next(value);
        this.sortType = title;
        this.sortingInedex =  value;
    }

}

