import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPersonWidgetComponent } from './search-person-widget/search-person-widget.component';
import { SearchAccountWidgetComponent } from './search-account-widget/search-account-widget.component';
import { SearchCreditWidgetComponent } from './search-credit-widget/search-credit-widget.component';
import { GlobalSearchComponent } from './global-search.component';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { MatCardModule } from '@angular/material/card';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared-module';
import { Router, RouterModule } from '@angular/router';
import { FuseSidebarModule } from '@fuse/components';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

const routes = [
  {
    path     : 'value/:value',
    component: GlobalSearchComponent,
    canActivate: [AuthGuard]
  }
  
];

@NgModule({
  declarations: [SearchPersonWidgetComponent, SearchAccountWidgetComponent, SearchCreditWidgetComponent, GlobalSearchComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FuseSharedModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    FuseSidebarModule,
    MatDividerModule,
    MatMenuModule,
    
  ]
})
export class GlobalSearchModule { }
