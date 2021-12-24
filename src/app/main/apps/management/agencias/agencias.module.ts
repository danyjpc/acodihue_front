import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgenciasComponent } from './agencias.component';
import { AgenciasListComponent } from './agencias-list/agencias-list.component';
import { AgenciasFormComponent } from './agencias-form/agencias-form.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { AuthGuard } from 'app/core/guards/auth.guard';

const routes: Routes = [
  {
      path     : '',
      component: AgenciasComponent,
      canActivate: [AuthGuard] 
  }

];

@NgModule({
  declarations: [AgenciasComponent, AgenciasListComponent, AgenciasFormComponent],
  imports: [
    CommonModule,
    FuseSharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatInputModule


  ]
})
export class AgenciasModule { }
