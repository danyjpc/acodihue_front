import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdmBalanceAccount } from 'app/main/apps/accounts/AdmAccounts';
import {AccountsService} from '../../../accounts/accounts.service';


@Component({
  selector: 'app-asociados-accounts-list',
  templateUrl: './asociados-accounts-list.component.html',
  styleUrls: ['./asociados-accounts-list.component.scss']
})
export class AsociadosAccountsListComponent implements OnInit {
  personKey = '0-0';
  accounts: AdmBalanceAccount[] = [];

  constructor(
    private route: ActivatedRoute,
    private accountsService: AccountsService
    ) { 
    this.personKey = (this.route.snapshot.params.personKey) ? this.route.snapshot.params.personKey  : 'null';
  }

  ngOnInit(): void {
    this.getUserAccounts();

  }


  getUserAccounts(): any {
    this.accountsService.get_asociate_accounts(this.personKey)
    .then(data => {
      this.accounts = data as AdmBalanceAccount[];
    });
  }

}
