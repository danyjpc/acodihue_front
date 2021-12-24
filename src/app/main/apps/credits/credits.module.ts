import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCreateFormComponent } from './credit-create-form/credit-create-form.component';
import { FuseSharedModule } from '@fuse/shared.module';
import {MatCardModule} from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FuseSidebarModule } from '@fuse/components';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import {SharedModule} from '../../../shared/shared-module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CredisListComponent } from './credis-list/credis-list.component';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { CreditsComponent } from './credits.component';
import { CreditDetailsComponent } from './credit-details/credit-details.component';
import { CreditsSidebarComponent } from './credit-details/credits-sidebar/credits-sidebar.component';
import { CreditsCheckListComponent } from './credit-details/credits-check-list/credits-check-list.component';
import { CreditsAsociateDetailsComponent } from './credit-details/credits-asociate-details/credits-asociate-details.component';
import { AsociadosModule } from '../socios/asociados/asociados.module';
import { CreditsFiadoresComponent } from './credit-details/credits-fiadores/credits-fiadores.component';
import { CreditsReferencesComponent } from './credit-details/credits-references/credits-references.component';
import { CreditsAddressComponent } from './credit-details/credits-address/credits-address.component';
import { CreditsDocumentsComponent } from './credit-details/credits-documents/credits-documents.component';
import { CreditActivitiesFormComponent } from './credit-details/credit-activities/credit-activities-form/credit-activities-form.component';
import { CreditActivitiesListComponent } from './credit-details/credit-activities/credit-activities-list/credit-activities-list.component';
import { CreditGarantiasListComponent } from './credit-details/credits-garantias/credit-garantias-list/credit-garantias-list.component';
import { CreditGarantiasFormComponent } from './credit-details/credits-garantias/credit-garantias-form/credit-garantias-form.component';
import { MatChipsModule } from '@angular/material/chips';
import { CreditsListBySocioComponent } from './credits-list-by-socio/credits-list-by-socio.component';
import { CreditsPatrimonialStatusComponent } from './credit-details/credits-patrimonial-status/credits-patrimonial-status.component';
import { CreditsIncomeExpensesComponent } from './credit-details/credits-income-expenses/credits-income-expenses.component';
import { RecordPsTabsComponent } from './credit-details/credits-patrimonial-status/record-ps-tabs/record-ps-tabs.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RecordIeTabsComponent } from './credit-details/credits-income-expenses/record-ie-tabs/record-ie-tabs.component';
import { DownloadDocComponent } from './credit-details/credits-check-list/download-doc/download-doc.component';

const routes = [
  {
    path     : 'list',
    component: CreditsComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'details/:creditKey',
    component: CreditDetailsComponent,
    canActivate: [AuthGuard]
  },

  {
    path     : 'details/:creditKey/:view',
    component: CreditDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'details/:creditKey/:view/:personKey',
    component: CreditDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path  :'group-credit',
    loadChildren : () => import('./group-credits/group-credits.module').then(m => m.GroupCreditsModule)
  }
]

@NgModule({
  declarations: [CreditCreateFormComponent, CredisListComponent, CreditsComponent, CreditDetailsComponent, CreditsSidebarComponent, CreditsCheckListComponent, CreditsAsociateDetailsComponent, CreditsFiadoresComponent, CreditsReferencesComponent, CreditsAddressComponent, CreditsDocumentsComponent, CreditActivitiesFormComponent, CreditActivitiesListComponent, CreditGarantiasListComponent, CreditGarantiasFormComponent, CreditsListBySocioComponent, CreditsPatrimonialStatusComponent, CreditsIncomeExpensesComponent, RecordPsTabsComponent, RecordIeTabsComponent, DownloadDocComponent],
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
    MatSlideToggleModule,
    MatChipsModule,
    AsociadosModule,
    MatFormFieldModule,
  
  ],
  exports: [
    CreditCreateFormComponent,
    CredisListComponent
  ]
  
})
export class CreditsModule { }
