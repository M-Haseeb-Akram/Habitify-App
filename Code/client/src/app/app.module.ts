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
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { DeleteConfirmationComponent } from './components/modals/delete-confirmation/delete-confirmation.component';
import { ManageHabitsComponent } from './components/user/manage-habits/manage-habits.component';
import { CompleteFilterPipe } from './pipes/complete-filter.pipe';
import { MatDialog, MatDialogRef, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePickerPipe } from './pipes/date-picker.pipe';

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
        FilterPipe,
        SortPipe,
        DeleteConfirmationComponent,
        ManageHabitsComponent,
        CompleteFilterPipe,
        DatePickerPipe,
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
        CookieService,
        {
            provide: MatDialogRef,
            useValue: {}
        },
        MatDatepickerModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
