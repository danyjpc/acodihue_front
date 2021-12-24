import { MatTableDataSource } from '@angular/material/table';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import { UserService } from '../user.service';
import { AdmUser } from '../../../../../shared/adm-models/AdmUser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersDialogFormComponent } from '../users-dialog-form/users-dialog-form.component';
import {environment  as env } from 'environments/environment.prod'
import { UtilsService } from 'app/core/services/utils.service';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class UsersListComponent implements OnInit {
  users: AdmUser;
  env = env;
  dataSource = new MatTableDataSource();
  displayedColumns = ['nombres', 'correo', 'estado', 'rol', 'acciones'];

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  @ViewChild('filter', {static: true})
  filter: ElementRef;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private usersService: UserService,
    public _matDialog: MatDialog,


    private utilsService:  UtilsService) { 
    this._unsubscribeAll = new Subject();
    this.users = new AdmUser();
  }

  ngOnInit(): void {
   this.getAllUsers();
   
  }

  getAllUsers(){
    

    this.usersService.onUserFilterListChange
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
          users => { this.dataSource.data = users; },
          error => { this.utilsService.openSnackBar(error)
        })
  }

  user_edit(user: AdmUser) {
      const dialogRef = this._matDialog.open(UsersDialogFormComponent, {
        width: '40%',
        data: {
          user
        }
      });

      dialogRef.afterClosed().subscribe( async (_user) => {
        if (!_user) { 
          return; 
        }

        try {
          const result =  await this.usersService.updateUser(_user)
          this.utilsService.openSnackBar(result);
        }catch(error) {
          this.utilsService.openSnackBar(error);
        }
      
      })
  }


  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

 
}
