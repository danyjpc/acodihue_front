import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'app/core/services/api.service';
import { UtilsService } from 'app/core/services/utils.service';
import { AdmTypology } from 'app/shared/adm-models/AdmTypology';
import { environment as env} from '../../../../../../../environments/environment';
import { AdmCreditActivity } from '../AdmCreditActivities';

@Component({
  selector: 'app-credit-activities-form',
  templateUrl: './credit-activities-form.component.html',
  styleUrls: ['./credit-activities-form.component.scss']
})
export class CreditActivitiesFormComponent implements OnInit {


  DestinosTypologyes : AdmTypology;
  ActividadesTypologyes:  AdmTypology;
  UnidadesDeMedidasTypologyes: AdmTypology;
  creditActivity: AdmCreditActivity;
  title: string = '';
  action: string = '' ;
  constructor(
    private apiService: ApiService,
    private utilsService: UtilsService,
    public dialogRef: MatDialogRef<CreditActivitiesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  )
  { 
    this.DestinosTypologyes =  new AdmTypology();
    this.ActividadesTypologyes =  new AdmTypology();
    this.UnidadesDeMedidasTypologyes =  new AdmTypology();

    this.creditActivity = (data.creditActivity) ? data.creditActivity : new AdmCreditActivity();
    this.title = (data.creditActivity) ?  'Editar Actividad de Crédito' :  'Nueva Actividad de Crédito';
    this.action = (data.creditActivity) ? 'edit' : 'new';
  }

  ngOnInit(): void {
    this.loadTypologies();
  }


  async loadTypologies(){
    this.DestinosTypologyes =  await this.utilsService.getTypology(env.CREDIT_DESTINE_TYPOLOGY) as AdmTypology;
    this.ActividadesTypologyes = await this.utilsService.getTypology(env.ECONOMIC_ACTIVITY_TYPOLOGY) as AdmTypology;
    this.UnidadesDeMedidasTypologyes =  await this.utilsService.getTypology(env.UNIT_MEASURE_TYPOLOGY) as AdmTypology;
    
  }

  closeDigalog(){
    this.dialogRef.close(this.creditActivity)
  }

}
