import { LogIn } from 'src/app/store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppState } from '../store/state/app.state';


@Injectable({
    providedIn: 'root'
})
export class DataResolver {
    private data = JSON.parse(this.cookieService.get('user'));
    constructor(private store: Store<AppState>,
                private activatedRoute: ActivatedRoute,
                private cookieService: CookieService) { }

    resolve() {
        if(this.cookieService.check('user')){
            this.store.dispatch(new LogIn(JSON.parse(this.cookieService.get('user'))));
        }
    }
}
