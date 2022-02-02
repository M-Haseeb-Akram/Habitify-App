import { Component, OnInit, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { map } from 'rxjs/operators';
import { PROXY_CONFIG } from 'src/app/config/proxy.conf'

const googleLogoURL = "/assets/icons/google.svg";
const appleLogoURL = "/assets/icons/apple.svg";

@Component({
    selector: 'app-google-auth',
    templateUrl: './google-auth.component.html',
    styleUrls: ['./google-auth.component.css']
})
export class GoogleAuthComponent implements OnInit {
    isLoading = false;
    private isAuthenticated = false;
    constructor(private titleService: Title,
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer,
      @Inject(PLATFORM_ID) private platformId: string,
      private router: Router,
      private store: Store<AppState>
    ) {
        this.titleService.setTitle("Sign In - Habitify");
        const domain = (isPlatformServer(platformId)) ? PROXY_CONFIG.target : '';
        this.matIconRegistry.addSvgIcon(
            "apple",
            this.domSanitizer.bypassSecurityTrustResourceUrl(domain+appleLogoURL));
        this.matIconRegistry.addSvgIcon(
            "google",
            this.domSanitizer.bypassSecurityTrustResourceUrl(domain+googleLogoURL));
        this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user
            })
        ).subscribe(user => this.isAuthenticated = user.isAuthenticated);
        if(this.isAuthenticated){
            this.router.navigateByUrl('/journal/all-habits')
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ngOnInit(): void {
    }

    handleLoginAction() {
        window.location.href = PROXY_CONFIG.target + '/api/auth/google';
    }
}
