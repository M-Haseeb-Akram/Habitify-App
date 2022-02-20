import { UserService } from './../../../services/user.service';
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-habits-progress',
    templateUrl: './habits-progress.component.html',
    styleUrls: ['./habits-progress.component.css']
})
export class HabitsProgressComponent implements OnInit {
    public habit!: any;
    constructor(
      public userService: UserService,
    ) { }

    ngOnInit(): void {
        this.userService.getEditedId().subscribe((id:string) => {
            this.userService.getSingleHabit(id).subscribe((res : any) => {
                this.habit = res.habit[0];
            })
        });
    }

}
