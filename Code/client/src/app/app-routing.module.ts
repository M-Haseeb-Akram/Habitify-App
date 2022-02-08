import { TestComponent } from './components/test/test.component';
import { DataResolver } from './resolver/auth-data.resolver';
import { LandingPageComponent } from './components/user/landing-page/landing-page.component';
import { AuthGuardService } from './services/auth-gaurd.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleAuthComponent } from './components/auth/google-auth/google-auth.component';
import { AllHabitsComponent } from './components/user/all-habits/all-habits.component';

const routes: Routes = [
    {path: '', component: GoogleAuthComponent},

    {
        path: 'journal',
        canActivate: [AuthGuardService],
        component: LandingPageComponent,
        children: [
            { path: 'all-habits', component: AllHabitsComponent },
            { path: 'time-of-day', component: AllHabitsComponent },
        ],
        resolve: {data: DataResolver}
    },
    { path: '**', redirectTo: 'journal/all-habits' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
