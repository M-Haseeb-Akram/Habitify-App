import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';


const MaterialComponents = [
    MatSliderModule,
    MatCardModule,
    MatSelectModule,
    MatToolbarModule,
    MatDividerModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatNativeDateModule
]

@NgModule({
    imports: [MaterialComponents],
    exports: [MaterialComponents]
})
export class MaterialModule { }
