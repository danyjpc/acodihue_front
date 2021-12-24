import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilsService } from 'app/core/services/utils.service';
import { AdmtransactionsAccount } from 'app/main/apps/accounts/AdmAccounts';
import { AdmTypology, TypologyId } from 'app/shared/adm-models/AdmTypology';
import { environment as env } from 'environments/environment';
import { AccountOperationsInterface } from 'app/shared/utils-components/account-operations-menu/account-operations-menu.component';
import { BankAccountsService } from 'app/main/apps/management/bank-accounts/bank-accounts.service';

@Component({
  selector: 'app-account-transaction-form',
  templateUrl: './account-transaction-form.component.html',
  styleUrls: ['./account-transaction-form.component.scss']
})
export class AccountTransactionFormComponent implements OnInit {
  env = env;
  acountID: number;
  operation: AccountOperationsInterface;
  operationsOptions: AdmTypology [];
  transactionModel: AdmtransactionsAccount;
  typeAccountID : number;

  constructor
  (
    public dialogRef: MatDialogRef<AccountTransactionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private utils: UtilsService,
    private bankAccountS : BankAccountsService
    
  )
  { 
    this.acountID   =   (data.accountId) ?  data.accountId : 0 ;
    this.operation  =   (data.operation) ?  data.operation : new AccountOperationsInterface();
    this.operationsOptions = [];
    this.transactionModel =  new AdmtransactionsAccount();
    this.typeAccountID = (data.typeAccountId) ? data.typeAccountId : 0;
    
  }

  ngOnInit(): void {
    this.getTypology(this.typeAccountID, this.operation.typologyParent);
    
  }

  async getTypology(typeAccountId, transactionId) {
    this.operationsOptions = await this.bankAccountS.getAssignedTypologies(typeAccountId, transactionId) as AdmTypology[];
  }

  saveForm(){

      this.utils.openConfirDialogService('Esta Seguro de Realizar esta Operación')
          .subscribe(option => {
            if (!option) {
              return
            }
            this.dialogRef.close(this.transactionModel)
          })
  }

}
