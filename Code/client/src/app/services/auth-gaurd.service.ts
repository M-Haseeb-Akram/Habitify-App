import { AppState } from 'src/app/store/state/app.state';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root',

})
export class AuthGuardService implements CanActivate {
    private isAuthenticated!: boolean;

    constructor(
      private router: Router,
      private cookieService: CookieService,
      private store: Store<AppState>) {
        this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user
            })
        ).subscribe(user => this.isAuthenticated = user.isAuthenticated);
    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if(this.cookieService.check('user')){
            if (this.cookieService.get('user')[<any>'accessToken'] !== '' || this.isAuthenticated) {
                return true;
            }
        }

        console.log(this.isAuthenticated);
        this.router.navigate(['/']);
        return false;
    }
}
