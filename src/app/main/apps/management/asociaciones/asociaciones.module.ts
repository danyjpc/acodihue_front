import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsociacionesComponent } from './asociaciones.component';
import { RouterModule, Routes } from '@angular/router';
import { AsociacionesListComponent } from './asociaciones-list/asociaciones-list.component';
import { AsociacionesFormComponent } from './asociaciones-form/asociaciones-form.component';
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
import { AuthGuard } from 'app/core/guards/auth.guard';


const routes: Routes = [
  {
      path     : '',
      component: AsociacionesComponent,
      canActivate: [AuthGuard] 
      
  }
];

@NgModule({
  declarations: [AsociacionesComponent, AsociacionesListComponent, AsociacionesFormComponent],
  imports: [
    CommonModule,
    FuseSharedModule,
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
    MatMenuModule

  ]
})
export class AsociacionesModule { }
