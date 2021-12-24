import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankAccountsComponent } from './bank-accounts.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { FlexLayoutModule } from '@angular/flex-layout'
import { FuseSharedModule } from '@fuse/shared.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog'
import { BankAccountsListComponent } from './bank-accounts-list/bank-accounts-list.component';
import { BankAccountsFormComponent } from './bank-accounts-form/bank-accounts-form.component';
import { AssignOperationFormComponent } from './assign-operation-form/assign-operation-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

const routes: Routes =[
  {
    path : '',
    component : BankAccountsComponent,
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  declarations: [BankAccountsComponent, BankAccountsListComponent, BankAccountsFormComponent, AssignOperationFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatTabsModule,
    FlexLayoutModule, 
    MatCardModule
  ]
})
export class BankAccountsModule { }
