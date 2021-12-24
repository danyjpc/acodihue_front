import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanAccessDirective } from './directives/can-access.directive';
import { ShowForDirective } from './directives/show-for.directive';
import {FullNamePipePipe} from './pipes/full-name-pipe.pipe';
import { AlertDialogComponent } from './utils-components/alert-dialog/alert-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import {AccountOperationsMenuComponent} from './utils-components/account-operations-menu/account-operations-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { AccountsModule } from 'app/main/apps/accounts/accounts.module';
import { AccountTransactionFormComponent } from './utils-components/account-transaction-form/account-transaction-form.component';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FuseSharedModule } from '@fuse/shared.module';
import {FullRequirementsPipePipe} from './pipes/full-requirement-details';
import { FilterCreditsSociosFormComponent } from './utils-components/filter-credits-socios-form/filter-credits-socios-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card'; 

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [
    ShowForDirective, 
    CanAccessDirective, 
    FullNamePipePipe, 
    AlertDialogComponent, 
    AccountOperationsMenuComponent, 
    AccountTransactionFormComponent, 
    FullRequirementsPipePipe,
    FilterCreditsSociosFormComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    FuseSharedModule,
    FormsModule,
    MatDatepickerModule,
    MatCardModule

  ],

  exports: [
    // CanAccessDirective,
    // ShowForDirective,
    FullNamePipePipe,
    AlertDialogComponent,
    AccountOperationsMenuComponent,
    FullRequirementsPipePipe,
    FilterCreditsSociosFormComponent
  ]
})
export class SharedModule{ }
