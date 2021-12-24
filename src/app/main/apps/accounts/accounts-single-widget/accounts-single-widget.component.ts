import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmAccount, AdmBalanceAccount } from '../AdmAccounts';
import {FullNamePipePipe} from '../../../../shared/pipes/full-name-pipe.pipe';
import { AccountsService } from '../accounts.service';
import { MenuAccountOptions } from '../../global-search/search-menu-optionsManager';
import { SearchMenuOptions } from '../../global-search/AdmModelSearch';

@Component({
  selector: 'app-accounts-single-widget',
  templateUrl: './accounts-single-widget.component.html',
  styleUrls: ['./accounts-single-widget.component.scss']
})
export class AccountsSingleWidgetComponent implements OnInit {

  @Input()account: AdmBalanceAccount;
  @Input()links?: boolean;
  defaultColor = '#4cd864';
  color = this.defaultColor

  menuOptions = MenuAccountOptions;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private accountService: AccountsService,
  ) { 
    
  }

  ngOnInit(): void {

    let bg_color = (this.account.personAccount.accountType.value_2) ? this.account.personAccount.accountType.value_2 : this.defaultColor;
    this.color = (this.links) ? 'none' : `${bg_color}35`;
  }


  // account_details(account: AdmAccount){
    
  //   const _personKey = (this.activateRoute.snapshot.params.personKey) ? this.activateRoute.snapshot.params.personKey : 'null';
  //   const url = `accounts/profile/${_personKey}/account/${account.account_id}`;

  //   // load data in observer for detail account
  //   this.accountService.get_account_details(_personKey, account.account_id);
  
  //   this.router.navigateByUrl(url);
  // }

  go_to_url(option: SearchMenuOptions) {
    const personKey =   (this.activateRoute.snapshot.params.personKey) ? this.activateRoute.snapshot.params.personKey : 'null';
    const account_id = this.account.personAccount.account_id;
    const extrapath = (option.extraPath) ? option.extraPath : ''
    const url = (option.singlePath) ?   `${option.basePath}/${personKey}` : `${option.basePath}/${personKey}/account/${account_id}${extrapath}`;
    this.accountService.OnAccountSingleChange.next(this.account.personAccount);
    this.router.navigateByUrl(url);
  }

  
  go_to_perfil(account: AdmBalanceAccount) {
    const personKey = account.personAccount.organizationResponsible.person.personKey;
    const url = `/associate/profile/${personKey}/personal-info`;
    this.router.navigateByUrl(url);
    }
}
