import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from 'app/main/apps/accounts/accounts.service';
import { AdmAccount, AdmtransactionsAccount } from 'app/main/apps/accounts/AdmAccounts';
import { environment as env  } from '../../../../environments/environment';
import { AccountTransactionFormComponent } from '../account-transaction-form/account-transaction-form.component';

@Component({
  selector: 'app-account-operations-menu',
  templateUrl: './account-operations-menu.component.html',
  styleUrls: ['./account-operations-menu.component.scss']
})
export class AccountOperationsMenuComponent implements OnInit {
  @Input()accountId: number;
  @Input()typeAccountId: number;

  accountOperations: AccountOperationsInterface[] = [
    {
      operationType: 'creditos',
      typologyParent: env.DEFAULT_OPERATIONS_TYPOLOGY_HABER,
      movementType: 'haber',
      icon: 'trending_up',
      description: 'Dépositos'
    },
    {
      operationType: 'debitos',
      typologyParent: env.DEFAULT_OPERATIONS_TYPOLOGY_DEBE,
      movementType: 'debe',
      icon: 'trending_down',
      description: 'Rétiros'
    }
  ]

  account: AdmAccount;
  personKey: string;
  accountIdbyroute: number

  constructor(
    private matdialog: MatDialog, 
    private accountService: AccountsService,
    private activateRoute: ActivatedRoute
  ) 
  { 
    this.personKey = (this.activateRoute.snapshot.params.personKey) ? this.activateRoute.snapshot.params.personKey  : 'null';
    this.accountIdbyroute = (this.activateRoute.snapshot.params.accountId) ? this.activateRoute.snapshot.params.accountId  : this.accountId
  }

  ngOnInit(): void {
    this.check_opration_to_open();
    //console.log("Account id "+ this.accountId)
  }

 
  openModal(operation: AccountOperationsInterface ) {
      const dialogRef = this.matdialog.open(AccountTransactionFormComponent, {
        width: '40%', 
        data: {
          accountId: this.accountId,
          operation,
          typeAccountId : this.typeAccountId
        }
      })

      dialogRef.afterClosed().subscribe((data: AdmtransactionsAccount) => {
        if (data) { 
          this.accountService.operate_transaction_account(data, this.personKey, this.accountId )
        }
      })
  }

  check_opration_to_open(){
    this.activateRoute.params.subscribe(params => {
        if (params && params['operationId']) {
            
          const operationId = params['operationId'];
          const operation = this.accountOperations.filter(option => option.typologyParent == parseInt(operationId))[0];
          if(operation) {
            this.openModal(operation)
          }
        }
    })
  }

}



export class  AccountOperationsInterface {
  operationType: string;
  typologyParent: number;
  movementType: string;
  icon: string;
  description: string;
}