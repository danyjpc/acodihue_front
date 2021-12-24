import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { PreRegisterFormComponent } from './pre-inscripciones/pre-register-form/pre-register-form.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PreRegisterListComponent } from './pre-inscripciones/pre-register-list/pre-register-list.component';
import { PreInscripcionesComponent } from './pre-inscripciones/pre-inscripciones.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {AsociadosModule}  from './asociados/asociados.module';
import { AsociadosProfileComponent } from './asociados/asociados-profile/asociados-profile.component';
import { AccountsModule } from '../accounts/accounts.module';
import { CreditsModule } from '../credits/credits.module';
import { SharedModule } from 'app/shared/shared-module';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { GroupCreditsModule } from '../credits/group-credits/group-credits.module';

const routes = [
  {
    path   : 'search-list',
    component: PreInscripcionesComponent,
    canActivate: [AuthGuard]  
  },
  {
    path   : 'pre-register',
    component: PreRegisterFormComponent,
    canActivate: [AuthGuard]  
  },
  {
    path   : 'profile/:personKey',
    component: AsociadosProfileComponent,
    canActivate: [AuthGuard]  
  },
  {
    path     : 'profile/:personKey/:view',
    component: AsociadosProfileComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [
    PreRegisterFormComponent, PreRegisterListComponent, PreInscripcionesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FuseSharedModule,
    MatDatepickerModule,
    MatDividerModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatCardModule,


    //InnerModules
    AsociadosModule,
    AccountsModule,
    SharedModule,
    GroupCreditsModule
    
  ]
})
export class SociosModule { }
