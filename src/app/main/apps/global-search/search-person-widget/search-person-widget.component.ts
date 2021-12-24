import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonKey } from 'app/shared/adm-models/AdmPerson';
import {AsociateRecords, SearchMenuOptions} from './../AdmModelSearch';
import {MenuAccountOptions, MenuPersonOptions} from '../search-menu-optionsManager';




@Component({
  selector: 'app-search-person-widget',
  templateUrl: './search-person-widget.component.html',
  styleUrls: ['./search-person-widget.component.scss']
})
export class SearchPersonWidgetComponent implements OnInit {
  @Input()record;
  @Input()global_search_type : string;
  
  personMenuOptions = MenuPersonOptions
  accountMenuOptions = MenuAccountOptions;
  searchValue: string;

  default_color: string = 'none';
  color;
  constructor(private router: Router) { 
  }


  ngOnInit(): void {

    if (this.global_search_type == "account") {

      let bgcolor= this.record.account.personAccount.accountType.value_2;
      console.log(bgcolor);
      this.color = (this.record.account.personAccount.accountType.value_2) ? `${this.record.account.personAccount.accountType.value_2}35` : 'red';
    }
    else {
      this.color =  'none';
    }
  }

  go_to_perfil(personKey){
    const url = `associate/profile/${personKey}/personal-info`;
    this.router.navigateByUrl(url);
  }

  go_to_accounts(personKey){
    const url = `/accounts/profile/${personKey}`;
    this.router.navigateByUrl(url);
  }
  go_to_url(option: SearchMenuOptions, record?) {
    const personKey =  record.account.personAccount.organizationResponsible.person.personKey;
    const account_id = record.account.personAccount.account_id;
    const extrapath = (option.extraPath) ? option.extraPath : ''
    const url = (option.singlePath) ?   `${option.basePath}/${personKey}` : `${option.basePath}/${personKey}/account/${account_id}${extrapath}`;
    this.router.navigateByUrl(url);
  }

  go_to_credit_details(record) {

    // person 3b252cf1-aa7f-47b0-8ed2-1be9353a64da
    // credit  85266650-2633-46c4-a3ec-b5c411b727f0
    const creditKey = `${record.credit.creditKey}`;
    const personKey = `${record.credit.calculator.person.personKey}`;
    const url = `/credit/details/${creditKey}/check-list/${personKey}`;
    

    this.router.navigateByUrl(url);
  }

}
