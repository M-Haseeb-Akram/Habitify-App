import { LogIn } from 'src/app/store/actions/auth.action';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from "@angular/core";
import { AppState } from '../store/state/app.state';


@Injectable({
    providedIn: 'root'
})
export class DataResolver {
    constructor(private store: Store<AppState>,
                private cookieService: CookieService) { }

    resolve() {
        if(this.cookieService.check('user')){
            this.store.dispatch(new LogIn(JSON.parse(this.cookieService.get('user'))));
        }
    }
}
