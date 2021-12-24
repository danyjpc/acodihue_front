import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AdmCreditLine } from 'app/main/apps/management/credit-lines/AdmCreditLines';
import {AdmCreditGuarantees} from '../AdmCreditGuarantees';
import { CreditGarantiasFormComponent } from '../credit-garantias-form/credit-garantias-form.component';
import {CreditGuaranteesService} from '../credit-guarantees-service';

@Component({
  selector: 'app-credit-garantias-list',
  templateUrl: './credit-garantias-list.component.html',
  styleUrls: ['./credit-garantias-list.component.scss']
})
export class CreditGarantiasListComponent implements OnInit {
  
  tittle: string = '';
  guarantees: AdmCreditGuarantees[] = [];
  creditKey: string = '';
  displayedColumns: string[] = ['no', 'fecha', 'propietario', 'address', 'actions'];

  constructor(
    private creditGuarantessService: CreditGuaranteesService,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
  ) {
    this.creditKey = (route.snapshot.params.creditKey) ?  route.snapshot.params.creditKey : 'null';
  }


  ngOnInit(): void {

    this.get_credit_guaranteess(this.creditKey);
  }

  new_credit_guarantee(){
    const creditKey =  this.creditKey;
    const dialogRef =  this.matDialog.open(CreditGarantiasFormComponent, {
      width: '65%',
      maxHeight: '90vh',
      data: { }
    });

    dialogRef.afterClosed().subscribe(guaranteee => {
      if (!guaranteee) {
        return
      }
      this.creditGuarantessService.create_new_guarantee(creditKey, guaranteee)
          .then(response => { 
            this.get_credit_guaranteess(creditKey);
          });
    });

  }
  open_edit_modal(guarantee: AdmCreditGuarantees) {


    const creditKey =  this.creditKey;
    const dialogRef =  this.matDialog.open(CreditGarantiasFormComponent, {
      width: '65%',
      maxHeight: '90vh',
      data: { guarantee }
    });

    dialogRef.afterClosed().subscribe(guarantee => {
      if (!guarantee) {
        return;
      }
      this.creditGuarantessService.update_new_guarantee(creditKey, guarantee)
          .then(response => { 
            this.get_credit_guaranteess(creditKey);
          });
    });
  }

  async get_credit_guaranteess(creditKey){
    try {
      this.guarantees =  await this.creditGuarantessService.get_credit_guarantees(creditKey) as AdmCreditGuarantees[];
    } catch (error) {
      this.guarantees = [];
    }
  }
}
