import { User } from './../../../models/user.model';
import { take } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { LogOut } from 'src/app/store/actions/auth.actions';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
    public profile!: User;
    public time = '';
    public timeIcon = '';
    private LogOut: User = {
        isAuthenticated: false,
        accessToken:"",
        user: {
            user_id:"",
            name: '',
            picture:""
        },
        statusCode: 401
    }
    constructor(private store: Store<AppState>,
      private cookieService: CookieService,
      private router: Router) { }

    ngOnInit(): void {
        this.handleTiming();
        this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user
            })
        ).subscribe(user => this.profile = user);
    }

    handleTiming = () => {
        const today = new Date();
        const hours = today.getHours();
        if ( hours >= 1 && hours < 12) {
            this.time = "Morning";
            this.timeIcon = "wb_sunny";
        }
        else if (hours >= 12 && hours < 17) {
            this.time = "Afternoon";
            this.timeIcon = "wb_sunny";
        }
        else {
            this.time = "Evening";
            this.timeIcon = "brightness_3";
        }

    }
    handleLogout = () => {
        this.store.dispatch(new LogOut(this.LogOut));
        this.cookieService.delete('user', '/');
        this.router.navigate(['/']);
    }

}

