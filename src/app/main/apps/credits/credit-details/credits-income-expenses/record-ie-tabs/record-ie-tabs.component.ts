import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdmCreditsIncomeExpenses, Accounts } from '../AdmCreditsIncomeExpenses';
import { CreditsIncomeExpensesService } from '../credits-income-expenses.service'

@Component({
  selector: 'app-record-ie-tabs',
  templateUrl: './record-ie-tabs.component.html',
  styleUrls: ['./record-ie-tabs.component.scss'],
  encapsulation : ViewEncapsulation.None,
})
export class RecordIeTabsComponent implements OnInit {

  displayedColumns: string[] = ['description', 'amount', 'amountyear'];
  dataSource : Accounts[] = [];

  IncomeExpenses : AdmCreditsIncomeExpenses = new AdmCreditsIncomeExpenses();
  creditKey: string = '';
  //type Income or Expenses
  @Input()typeIE: string;
  showtype:string = '';

  constructor(
    private route: ActivatedRoute,
    private incomeExpenseS : CreditsIncomeExpensesService
  )
  {
    this.creditKey = (route.snapshot.params.creditKey) ?  route.snapshot.params.creditKey : 'null';
  }

  ngOnInit(): void {
    if(this.typeIE==="income"){this.showtype="ingresos"}else{this.showtype="egresos"}
    
    this.getIncomeExpenes(this.creditKey, this.typeIE)
  }

  async getIncomeExpenes(creditkey , typeIE){
    this.IncomeExpenses = await this.incomeExpenseS.getPatrimonialStatus(creditkey, typeIE) as AdmCreditsIncomeExpenses;
    this.dataSource = this.IncomeExpenses.accounts;
  }

  async guardar(){
    await this.incomeExpenseS.savePatrimonialStatus(this.creditKey, this.IncomeExpenses);
    this.ngOnInit();
  }

}
