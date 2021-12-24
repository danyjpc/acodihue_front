import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilsService } from 'app/core/services/utils.service';
import { AdmTypology } from 'app/shared/adm-models/AdmTypology';
import { AdmUser } from 'app/shared/adm-models/AdmUser';
import { CreditActivitiesFormComponent } from '../../credit-activities/credit-activities-form/credit-activities-form.component';
import { AdmCreditGuarantees } from '../AdmCreditGuarantees';
import { environment as env  } from 'environments/environment';
import { UserService } from 'app/main/apps/management/users/user.service';

@Component({
  selector: 'app-credit-garantias-form',
  templateUrl: './credit-garantias-form.component.html',
  styleUrls: ['./credit-garantias-form.component.scss']
})

export class CreditGarantiasFormComponent implements OnInit {
  guarantee: AdmCreditGuarantees ;
  title: string = '';
  action: string = '' ;


  documentTypeTypologyes: AdmTypology;
  departamentosTypologies: AdmTypology;
  municipiosTypologies: AdmTypology;
  UserEvaluator: AdmUser[] = [];

  constructor(
    private utilsService: UtilsService,
    public dialogRef: MatDialogRef<CreditActivitiesFormComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data,
  )
  { 
    this.guarantee = (data.guarantee) ? data.guarantee : new AdmCreditGuarantees();
    this.title = (data.guarantee) ?  'Editar Datos de Garantia de Crédito' :  'Nueva Garantia de Crédito';
    this.action = (data.guarantee) ? 'edit' : 'new';


    this.documentTypeTypologyes = new AdmTypology();
    this.departamentosTypologies=  new AdmTypology();
    this.municipiosTypologies =  new AdmTypology();
  }

  ngOnInit(): void {
    this.loadTypologies();
  }


  async loadTypologies(){
    this.documentTypeTypologyes =  await this.utilsService.getTypology(env.TYPE_DOCUMENT_GUARANTEE_TYPOLOGY) as AdmTypology;
    this.departamentosTypologies = await this.utilsService.getTypology(env.DEFAULT_PAIS_TYPOLOGY) as AdmTypology;
    
    const _typology = (this.action === 'edit') ? this.guarantee.address.state.typologyId : env.DEFAULT_DEPARTAMENTO_TYPOLOGY;
    this.municipiosTypologies   = await this.utilsService.getTypology(_typology) as AdmTypology;

    //users 

    this.userService.getAllUsers().then(data => {
      this.UserEvaluator = data as AdmUser[];
    })
  
  }

  async loadNewMunicipios(event) {
    this.municipiosTypologies = await this.utilsService.getTypology(event.value) as AdmTypology;  
  }

  closeDigalog(){
    this.dialogRef.close(this.guarantee)
  }
}
