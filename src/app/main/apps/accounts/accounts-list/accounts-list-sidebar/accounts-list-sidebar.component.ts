import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { AccountsService } from '../../accounts.service';
import { AdmBalanceAccount } from '../../AdmAccounts';

@Component({
  selector: 'app-accounts-list-sidebar',
  templateUrl: './accounts-list-sidebar.component.html',
  styleUrls: ['./accounts-list-sidebar.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class AccountsListSidebarComponent implements OnInit {
  
  accounts: AdmBalanceAccount[] = [];
  personKey: string;
  baseRoutePath: string;
  
  constructor(
    private accountservice: AccountsService,
    private route: ActivatedRoute
  )
  { 
    this.personKey = (this.route.snapshot.params.personKey) ? this.route.snapshot.params.personKey  : 'null';

    this.baseRoutePath = `/accounts/profile/${this.personKey}/account/`;
    
  }

  ngOnInit(): void {

    this.get_accounts();
  }

  get_accounts(){
    this.accountservice.get_asociate_accounts(this.personKey).then( accounts => {
      if (accounts[0]) {
         this.accounts =  accounts;
        }
    });
  }

  loadDetails(account: AdmBalanceAccount){
    this.accountservice.OnAccountSingleChange.next(account.personAccount);
    this.accountservice.get_account_details(this.personKey, account.personAccount.account_id);
  }


}
