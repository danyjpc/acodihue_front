import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypologiesComponent } from './typologies.component';
import { DialogFormComponent } from './dialog-form/dialog-form.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatDividerModule} from '@angular/material/divider'; 


import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FuseSharedModule } from '@fuse/shared.module';
import { TypologiesChildsListComponent } from './typologies-childs/typologies-childs-list/typologies-childs-list.component';
import { TypologiesChilds } from './typologies-childs/typologies-childs.component';
import { TypologiesParentsComponent } from './typologies-parents/typologies-parents.component';
import { TypologiesParentsListComponent } from './typologies-parents/typologies-parents-list/typologies-parents-list.component';
import {MatTreeModule} from '@angular/material/tree'; 
import { MatDialogModule } from '@angular/material/dialog';
import { AuthGuard } from 'app/core/guards/auth.guard';

const routes = [

  {
    path: '', 
    component: TypologiesComponent,
    canActivate: [AuthGuard] 
  }

]

@NgModule({
  declarations: [DialogFormComponent, TypologiesComponent, TypologiesChildsListComponent, TypologiesChilds, TypologiesParentsComponent, TypologiesParentsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSidenavModule, 
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule,
    FuseSharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTreeModule,
    MatTooltipModule,
    MatDividerModule
  ]
})
export class TypologiesModule { }
