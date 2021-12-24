import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypologiesModule } from './typologies/typologies.module';
import { UsersModule } from './users/users.module';
import {AsociacionesModule} from './asociaciones/asociaciones.module'
import { RouterModule } from '@angular/router';
import { AgenciasModule } from './agencias/agencias.module';

const routes = [
  {
    path   : 'typologies',
    loadChildren: () => import('./typologies/typologies.module').then(m => m.TypologiesModule)
  },
  {
    path   : 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path   : 'asociaciones',
    loadChildren: () => import('./asociaciones/asociaciones.module').then(m => m.AsociacionesModule)
  },
  {
    path   : 'agencias',
    loadChildren: () => import('./agencias/agencias.module').then(m => m.AgenciasModule)
  },
  {
    path   : 'credit-lines',
    loadChildren: () => import('./credit-lines/credit-lines.module').then(m => m.CreditLinesModule )
  },
  {
    path  : 'bank-accounts',
    loadChildren : () => import('./bank-accounts/bank-accounts.module').then(m => m.BankAccountsModule)
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TypologiesModule,
    UsersModule,
    AsociacionesModule,
    AgenciasModule
    
  ], 
  exports: [
  ]
})
export class ManagementModule { }
