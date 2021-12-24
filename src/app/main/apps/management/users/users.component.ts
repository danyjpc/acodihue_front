import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { UtilsService } from 'app/core/services/utils.service';
import { AdmUser } from 'app/shared/adm-models/AdmUser';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { UserService } from './user.service';
import { UsersDialogFormComponent } from './users-dialog-form/users-dialog-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  _unsubscribeAll: Subject<any>;
  users: AdmUser[]=[];
  searchInput: FormControl;
  constructor(
    public matDialogRef: MatDialog,
    private userService: UserService,
    private snackBar:  MatSnackBar,
    private utilsService : UtilsService,
    
    ) 
    { 
      this._unsubscribeAll = new Subject();
      this.searchInput = new FormControl('');

    }

  ngOnInit(): void {
    this.userService.getAllUsers();
    this.searchFunction();
    
  }
  

   addUser(){
    //const newuser = new AdmUser()
    const dialogRef = this.matDialogRef.open(UsersDialogFormComponent, {
      width: '45%',
      data: {}
    });

  
    //subscribe when dialog close, 
    dialogRef.afterClosed()
             .subscribe( async (_user) => {
                console.log(_user);
                const result = await this.userService.saveUser(_user)
                this.utilsService.openSnackBar(result)
             })


  }


  searchFunction(){
    //subscribe for all asociaciones

    this.userService.onUsersListChange
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe( users => {
           this.userService.onUserFilterListChange.next(users)
           this.users = [...users];
          })

    this.searchInput.valueChanges
          .pipe(
              takeUntil(this._unsubscribeAll),
              debounceTime(300),
              distinctUntilChanged()
          )
          .subscribe(searchText => {
                if (!searchText) { 
                  this.userService.onUserFilterListChange.next(this.users)
                }
                else {
                  console.log('filter');
                  const filterUsers = FuseUtils.filterArrayByString(this.users, searchText);
                  this.userService.onUserFilterListChange.next(filterUsers)
                  

                }
          });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
