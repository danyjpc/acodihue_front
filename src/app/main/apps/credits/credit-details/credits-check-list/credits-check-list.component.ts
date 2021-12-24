import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AssociateManagerService} from '../../../socios/asociados/AssociateManagerService';
import { CreditService } from '../../credit-service';
import {AdmCheckList, itemDetail} from './AdmCreditCheckList';
import { MatDialog } from '@angular/material/dialog';
import { DownloadDocComponent } from './download-doc/download-doc.component';

@Component({
  selector: 'app-credits-check-list',
  templateUrl: './credits-check-list.component.html',
  styleUrls: ['./credits-check-list.component.scss']
})
export class CreditsCheckListComponent implements OnInit {
  personKey: string;
  itemDetails: itemDetail[] = [];
  creditKey: string;

  displayedColumns: string[] = ['number', 'details', 'icon', 'percent'];
  constructor(
    private activateRoute: ActivatedRoute, 
    private asociateService: AssociateManagerService,
    private creditService: CreditService,
    private dialog: MatDialog,
  ) { 
    this.personKey = (this.activateRoute.snapshot.params.personKey) ? this.activateRoute.snapshot.params.personKey  : 'null';  
    this.creditKey = (this.activateRoute.snapshot.params.creditKey) ? this.activateRoute.snapshot.params.creditKey  : 'null';  

    
  }

  ngOnInit(): void {
    this.asociateService.get_associate_single(this.personKey);

    this.load_credit_ressume();
  }

  load_credit_ressume(){
    this.creditService.getCreditRessume(this.creditKey).then(data => {
      this.itemDetails = data;
    })
  }
  
  downloadDocuments(){
    let creditK = this.creditKey
    //let listDocDownload : itemDetail[] = this.itemDetails.filter(item => item.download==true);
    const downloadDialog = this.dialog.open(DownloadDocComponent,{
      data :{

        creditK
      },
      width: '550px'
    })

  }

}
