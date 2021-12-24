import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AdmPatrimonialAccounts, AdmPatrimonialStatus } from '../../../AdmCredit'; 
import { CreditsPatrimonialStatusService } from '../credits-patrimonial-status.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-record-ps-tabs',
  templateUrl: './record-ps-tabs.component.html',
  styleUrls: ['./record-ps-tabs.component.scss'],
  encapsulation : ViewEncapsulation.None,
})
export class RecordPsTabsComponent implements OnInit {

  displayedColumns: string[] = ['description', 'amount'];
  dataSource : AdmPatrimonialAccounts[] = [];

  patrimonailStatus : AdmPatrimonialStatus = new AdmPatrimonialStatus();
  creditKey: string = '';
  //type patrimonial status
  @Input()typePS: string;

  constructor(
    private route: ActivatedRoute,
    private patrimonialS : CreditsPatrimonialStatusService
  ) 
  {
    this.creditKey = (route.snapshot.params.creditKey) ?  route.snapshot.params.creditKey : 'null';
  }

  ngOnInit(): void {
    this.getPatrimonialStatus(this.creditKey, this.typePS);
  } 

  async getPatrimonialStatus(creditkey , typePS){
    this.patrimonailStatus = await this.patrimonialS.getPatrimonialStatus(creditkey, typePS) as AdmPatrimonialStatus;
    this.dataSource = this.patrimonailStatus.accounts;
    //console.log(this.patrimonailStatus)
  }

  async guardar(){
    //console.log(this.patrimonailStatus)
    await this.patrimonialS.savePatrimonialStatus(this.creditKey, this.patrimonailStatus)
    this.ngOnInit()
  }
}