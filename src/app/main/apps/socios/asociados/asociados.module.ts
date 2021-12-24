import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsociadosProfileComponent } from './asociados-profile/asociados-profile.component';
import { AsociadosSidebarComponent } from './asociados-profile/asociados-sidebar/asociados-sidebar.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { AsociadosFormComponent } from './asociados-profile/asociados-form/asociados-form.component';
import { AsociadosAddressComponent } from './asociados-address/asociados-address.component';
import {AsociadosAddressListComponent} from './asociados-address/asociados-address-list/asociados-address-list.component';
import {AsociadosAddressFormComponent} from './asociados-address/asociados-address-form/asociados-address-form.component';
import { AsociadosPhonesComponent } from './asociados-phones/asociados-phones.component';
import { AsociadosPhonesListComponent } from './asociados-phones/asociados-phones-list/asociados-phones-list.component';
import { AsociadosPhonesFormComponent } from './asociados-phones/asociados-phones-form/asociados-phones-form.component';
import { AsociadosConyuguesListComponent } from './asociados-conyugues/asociados-conyugues-list/asociados-conyugues-list.component';
import { AsociadosConyuguesFormComponent } from './asociados-conyugues/asociados-conyugues-form/asociados-conyugues-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AsociadosBeneficiariesComponent } from './asociados-beneficiaries/asociados-beneficiaries.component';
import {AsociadosBeneficiariesListComponent} from './asociados-beneficiaries/asociados-beneficiaries-list/asociados-beneficiaries-list.component';
import {AsociadosBeneficiariesFormComponent} from './asociados-beneficiaries/asociados-beneficiaries-form/asociados-beneficiaries-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AsociadosDocumentsFormComponent } from './asociados-documents/asociados-documents-form/asociados-documents-form.component';
import { AsociadosDocumentsListComponent } from './asociados-documents/asociados-documents-list/asociados-documents-list.component';
import { AsociadosDetailsAboutComponent } from './asociados-profile/asociados-details-about/asociados-details-about.component'; 
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { AsociadosAccountsListComponent } from './asociados-accounts-list/asociados-accounts-list.component';
import {AccountsModule} from '../../accounts/accounts.module';
import { AsociadosAsociationsFormComponent } from './asociados-asociations/asociados-asociations-form/asociados-asociations-form.component';
import { AsociadosAsociationsListComponent } from './asociados-asociations/asociados-asociations-list/asociados-asociations-list.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AddConyuguesAsFiadorListComponent } from './asociados-conyugues/add-conyugues-as-fiador-list/add-conyugues-as-fiador-list.component';
import { AsociadosCreditsComponent } from './asociados-credits/asociados-credits.component'; 
import { CreditsModule } from '../../credits/credits.module';



@NgModule({
  declarations: [
    AsociadosProfileComponent, 
    AsociadosSidebarComponent, 
    AsociadosFormComponent, 
    AsociadosAddressComponent, 
    AsociadosAddressListComponent,
    AsociadosAddressFormComponent,
    AsociadosPhonesComponent,
    AsociadosPhonesListComponent,
    AsociadosPhonesFormComponent,
    AsociadosConyuguesListComponent,
    AsociadosConyuguesFormComponent,
    AsociadosBeneficiariesComponent,
    AsociadosBeneficiariesListComponent,
    AsociadosBeneficiariesFormComponent,
    AsociadosDocumentsFormComponent,
    AsociadosDocumentsListComponent,
    AsociadosDetailsAboutComponent,
    AsociadosAccountsListComponent,
    AsociadosAsociationsFormComponent,
    AsociadosAsociationsListComponent,
    AddConyuguesAsFiadorListComponent,
    AsociadosCreditsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FuseSharedModule,
    FuseSidebarModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatMenuModule,
    AccountsModule,
    MatAutocompleteModule,

  ],
  exports: [
    AsociadosProfileComponent,
    AsociadosFormComponent,
    AsociadosDetailsAboutComponent,
    AsociadosBeneficiariesListComponent,
    AsociadosConyuguesListComponent,
    AsociadosAddressComponent,
    AsociadosDocumentsListComponent

  ]
})
export class AsociadosModule { }
