import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditLinesComponent } from './credit-lines.component';
import {FuseSharedModule} from '../../../../../@fuse/shared.module';
import { CreditLinesListComponent } from './credit-lines-list/credit-lines-list.component';
import { CreditLinesFormComponent } from './credit-lines-form/credit-lines-form.component';
import {AuthGuard} from '../../../../core/guards/auth.guard';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'app/shared/shared-module';
import { AlertDialogComponent } from 'app/shared/utils-components/alert-dialog/alert-dialog.component';


const routes = [ 
  {
      path     : '',
      component: CreditLinesComponent,
      canActivate: [AuthGuard]
    },
]


@NgModule({
  declarations: [CreditLinesComponent, CreditLinesListComponent, CreditLinesFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule, 
  ], 
  entryComponents: [
    AlertDialogComponent
  ]

})
export class CreditLinesModule { }
