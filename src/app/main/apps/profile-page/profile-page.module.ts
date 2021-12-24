import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page.component';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule  } from '@angular/material/divider';
import { MatTabsModule  } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';


import {MatTableModule} from '@angular/material/table'; 
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';


const routes = [
  {
      path     : '',
      component: ProfilePageComponent,
      canActivate: [AuthGuard]
  },
  {
      path     : 'user/:persona_id/:usuario_id',
      component: ProfilePageComponent,
      canActivate: [AuthGuard]
  },
  {
    path     : 'paciente/:persona_id/:usuario_id',
    component: ProfilePageComponent,
    canActivate: [AuthGuard]
}
];



@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTabsModule,
    FuseSharedModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatToolbarModule,
    FuseSidebarModule,
    MatPaginatorModule
  ]
})
export class ProfilePageModule { }
