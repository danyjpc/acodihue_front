import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AccountsService } from '../../accounts.service';
import { AdmAccount, AdmAccountBalanceDetail, AdmBalanceAccount } from '../../AdmAccounts';

@Component({
  selector: 'app-account-detail-tabs',
  templateUrl: './account-detail-tabs.component.html',
  styleUrls: ['./account-detail-tabs.component.scss']
})
export class AccountDetailTabsComponent implements OnInit {
   accountId:number = 0;
   account: AdmAccount;
   $destroy: Subject <any>;
  constructor(
    private activateRoute: ActivatedRoute,
    private accountService: AccountsService
  ) {
    //  this.accountId = parseInt(activateRoute.snapshot.paramMap.get('accountId'));
     this.account = new AdmAccount();
     this.$destroy = new Subject();

      activateRoute.params.subscribe( params => {
        if (params) {
          this.accountId = params.accountId;
        }
      })
   }

  ngOnInit(): void {
    this.get_accout_detail();
  }


  get_accout_detail(){
    this.accountService.OnAccountSingleChange
        .subscribe (data => {
          this.account =  data;
        })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$destroy.next();
    this.$destroy.complete();
  }

}
