import { AddHabitsComponent } from './components/modals/add-habits/add-habits.component';
import { BrowserXhr } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleAuthComponent } from './components/auth/google-auth/google-auth.component';
import { AllHabitsComponent } from './components/user/all-habits/all-habits.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SideNavComponent } from './components/user/side-nav/side-nav.component';
import { TopNavComponent } from './components/user/top-nav/top-nav.component';
import { HabitsProgressComponent } from './components/user/habits-progress/habits-progress.component';
import { LandingPageComponent } from './components/user/landing-page/landing-page.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './components/test/test.component';
import { appReducer } from './store/reducers/app.reducer';

@NgModule({
    declarations: [
        AppComponent,
        GoogleAuthComponent,
        AllHabitsComponent,
        SideNavComponent,
        TopNavComponent,
        HabitsProgressComponent,
        LandingPageComponent,
        AddHabitsComponent,
        TestComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        StoreModule.forRoot(appReducer),
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        {provide: BrowserXhr},
        CookieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
