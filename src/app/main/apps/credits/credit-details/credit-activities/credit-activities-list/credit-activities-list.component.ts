import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {AdmCreditActivity} from '../AdmCreditActivities';
import { CreditActivitiesFormComponent } from '../credit-activities-form/credit-activities-form.component';
import{CreaditActivitiesService} from '../credit-activities-service';


@Component({
  selector: 'app-credit-activities-list',
  templateUrl: './credit-activities-list.component.html',
  styleUrls: ['./credit-activities-list.component.scss']
})
export class CreditActivitiesListComponent implements OnInit {
  tittle: string = '';
  activities: AdmCreditActivity[] = [];
  creditKey: string = '';
  displayedColumns: string[] = ['destino', 'actividad', 'prendaria', 'fiduciaria', 'actions'];

  constructor(
    private creditAcitivyService: CreaditActivitiesService,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
  )
  { 
    this.creditKey = (route.snapshot.params.creditKey) ?  route.snapshot.params.creditKey : 'null';
  }

  ngOnInit(): void {
    this.get_credit_activities(this.creditKey);
  }

  async get_credit_activities(creditKey) {
    try {
      this.activities =  await this.creditAcitivyService.get_credit_activities(creditKey) as AdmCreditActivity[];
    } catch (error) {
      this.activities = [];
    }
  }

  

  new_credit_Ativity(){

    const creditKey =  this.creditKey;
    const dialogRef =  this.matDialog.open(CreditActivitiesFormComponent, {
      width: '50%',
      data: { }
    });

    dialogRef.afterClosed().subscribe(creditActivity => {
      if (!creditActivity) {
        return
      }
      this.creditAcitivyService.create_credit_activity(creditKey, creditActivity)
          .then(response => { 
            this.get_credit_activities(creditKey);
          });
    });
    
  }


  open_edit_modal(creditActivity: AdmCreditActivity){

    const creditKey =  this.creditKey;
    const dialogRef =  this.matDialog.open(CreditActivitiesFormComponent, {
      width: '50%',
      data: { creditActivity }
    });

    dialogRef.afterClosed().subscribe(creditActivity => {
      if (!creditActivity) {
        return;
      }
      this.creditAcitivyService.update_credit_activity(creditKey, creditActivity)
          .then(response => { 
            this.get_credit_activities(creditKey);
          });
    });
    
  }
}
