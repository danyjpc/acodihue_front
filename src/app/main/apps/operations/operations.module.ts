import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCalculatorComponent } from './credit-calculator/credit-calculator.component';
import {AuthGuard } from '../../../core/guards/auth.guard';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { CotizationsListComponent } from './cotizations-list/cotizations-list.component';
import {CreditsModule} from '../credits/credits.module';
import { MatTooltipModule } from '@angular/material/tooltip';


const routes = [
  {
    path     : 'credit-calculator',
    component: CreditCalculatorComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'credit-cotizador',
    component: CreditCalculatorComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'credit-calculator/associate/:personKey',
    component: CreditCalculatorComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'credit-calculator/associate/:personKey/request-calculator/:calculatorId',
    component: CreditCalculatorComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [CreditCalculatorComponent, CotizationsListComponent],
  imports: [
    CommonModule,
    FuseSharedModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule, 
    MatTableModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDividerModule,
    MatMenuModule,
    CreditsModule,
    MatTooltipModule

    
  ],
  exports: [
    CotizationsListComponent
  ]
})
export class OperationsModule { }
