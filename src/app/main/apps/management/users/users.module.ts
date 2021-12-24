import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { AgmCoreModule } from '@agm/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import { MatStepperModule } from '@angular/material/stepper';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDialogFormComponent } from './users-dialog-form/users-dialog-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseSharedModule } from '@fuse/shared.module';
import {MatDatepickerModule} from '@angular/material/datepicker'; 


import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { MatMenuModule } from '@angular/material/menu';
import { AuthGuard } from 'app/core/guards/auth.guard';


const routes: Routes = [
  {
      path     : '',
      component: UsersComponent,
      canActivate: [AuthGuard] 
  }
];
@NgModule({
  declarations: [UsersListComponent, UsersDialogFormComponent, UsersComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    MatButtonModule,
    MatChipsModule,
    MatRippleModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    AgmCoreModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatToolbarModule,
    FuseSharedModule,
    MatDatepickerModule,
    MatMenuModule
  ]
})
export class UsersModule { }
