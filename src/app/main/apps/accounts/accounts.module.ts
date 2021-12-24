import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { AccountsSingleWidgetComponent } from './accounts-single-widget/accounts-single-widget.component';
import { FuseSharedModule } from '@fuse/shared.module';
import {MatCardModule} from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FuseSidebarModule } from '@fuse/components';
import { AccountsListSidebarComponent } from './accounts-list/accounts-list-sidebar/accounts-list-sidebar.component';
import { RouterModule } from '@angular/router';
import { AccountDetailTabsComponent } from './accounts-list/account-detail-tabs/account-detail-tabs.component';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { MatDividerModule } from '@angular/material/divider';
import {SharedModule} from '../../../shared/shared-module';
import { MatTabsModule } from '@angular/material/tabs';
import { AccountDetailComponent } from './accounts-list/account-detail-tabs/account-detail/account-detail.component';
import { AccountBalanceComponent } from './accounts-list/account-detail-tabs/account-balance/account-balance.component';
import { AccountBitacoraComponent } from './accounts-list/account-detail-tabs/account-bitacora/account-bitacora.component';
import { AccountNotebooksComponent } from './accounts-list/account-detail-tabs/account-notebooks/account-notebooks.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';

const routes = [
  {
    path     : 'profile/:personKey',
    component: AccountsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'profile/:personKey/account/:accountId',
    component: AccountsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'profile/:personKey/account/:accountId/operations/:operationId',
    component: AccountsListComponent,
    canActivate: [AuthGuard]
  },
  
];

@NgModule({
  declarations: [AccountsListComponent, AccountsSingleWidgetComponent, AccountsListSidebarComponent, AccountDetailTabsComponent, AccountDetailComponent, AccountBalanceComponent, AccountBitacoraComponent, AccountNotebooksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    FuseSidebarModule,
    MatInputModule,
    MatDividerModule,
    MatTabsModule,
    MatTableModule,
    SharedModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    MatToolbarModule,
    SharedModule
  ],
  exports: [
    AccountsSingleWidgetComponent,
    AccountsListComponent
  ]
})
export class AccountsModule { }
