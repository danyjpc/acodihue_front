import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BankAccountsFormComponent } from './bank-accounts-form/bank-accounts-form.component';
import { AdmTypology } from '../../../../shared/adm-models/AdmTypology';
import { environment as env } from 'environments/environment';
import { BankAccountsService} from './bank-accounts.service';

@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.scss'],
  animations   : fuseAnimations,
})
export class BankAccountsComponent implements OnInit {
  
  dialogRef: any;
  private _unsubscribeAll: Subject<any>;
  constructor(
    private _matDialog: MatDialog,
    private accountService : BankAccountsService,
  )
  { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
  }

  newAccount():void{
    this.dialogRef =this._matDialog.open(BankAccountsFormComponent, {
      width:'350px',
      data : {
        
      },
    })
    this.dialogRef.afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async (typology:AdmTypology) => {
        if(typology){
          typology.parentTypology.typologyId = env.ACCOUNT_TYPE_TYPOLOGY
          typology.editable = true;
          this.accountService.newChildTypology(typology);
        } 
      }
      )

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
