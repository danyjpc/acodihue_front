import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { FuseSharedModule } from '@fuse/shared.module';
import { SharedModule } from 'app/shared/shared-module';

import { GroupCreditsComponent } from './group-credits.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GroupCreditsListComponent } from './group-credits-list/group-credits-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { GroupCreditsCreateFormComponent } from './group-credits-create-form/group-credits-create-form.component';
import { AddExistingPartnerFormComponent } from './add-existing-partner-form/add-existing-partner-form.component';
import { MatTableModule } from '@angular/material/table'; 

const routes: Routes =[
  {
    path  : '',
    component : GroupCreditsComponent,
    canActivate : [AuthGuard]
  }
];

@NgModule({
  declarations: [GroupCreditsComponent, GroupCreditsListComponent, GroupCreditsCreateFormComponent, AddExistingPartnerFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatButtonModule,
    FuseSharedModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,

    SharedModule
  ],
  exports :[
    AddExistingPartnerFormComponent
  ]
})
export class GroupCreditsModule { }
