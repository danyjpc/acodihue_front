import { Component, Inject, OnInit } from '@angular/core';
import { organizationAgency } from '../../../../shared/adm-models/AdmOrganization';
import { AmortizationParams } from '../../operations/credit-calucalator-interface';
import { AdmCredit } from '../AdmCredit';
import { AgenciasService} from '../../management/agencias/agencias.service';
import { AdmAgencias } from '../../management/agencias/AdmAgencia';
import {UtilsService} from '../../../../core/services/utils.service'
import { AdmTypology, TypologyId } from '../../../../shared/adm-models/AdmTypology';
import { environment as env } from '../../../../../environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdmPreescription } from '../../socios/AdmPreinscriptions';
import { AssociatesService } from '../../socios/Associates.service';

@Component({
  selector: 'app-credit-create-form',
  templateUrl: './credit-create-form.component.html',
  styleUrls: ['./credit-create-form.component.scss']
})
export class CreditCreateFormComponent implements OnInit {

  calculator: AmortizationParams;
  credit: AdmCredit;
  agencies: AdmAgencias[] = [];
  ocupaciones: AdmTypology;

  StatusOperateTypology: AdmTypology;

  asociadoInfo: AdmPreescription;

  constructor(
    public matDialogRef: MatDialogRef<CreditCreateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private agenciesService: AgenciasService,
    private utils: UtilsService,
    private asociateService: AssociatesService
  ) { 
    this.calculator =  (this.data.calculatorParams) ? this.data.calculatorParams : new AmortizationParams();
    this.credit = new AdmCredit();
    this.ocupaciones = new AdmTypology();
    this.asociadoInfo = new AdmPreescription();
    
    this.StatusOperateTypology = new AdmTypology();
    
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
     this.agencies =  await this.agenciesService.listar_agencias() as AdmAgencias[];
     this.ocupaciones = await this.utils.getTypology(env.PROFESIONES_TYPOLOGIES) as AdmTypology;
     this.asociadoInfo = await this.asociateService.get_asociate_inscription_details(this.calculator.person.personKey);

     this.credit.organization.organizationKey =  this.asociadoInfo.organization.organizationKey;

     this.StatusOperateTypology =  await this.utils.getTypology(env.CREDIT_STATUS_OPERATE_TYPOLOGY) as AdmTypology;

  }

  send_info_to_create_credit(){
    this.credit.calculator.calculatorId =  this.calculator.calculatorId;
    this.matDialogRef.close(this.credit);
  }


}
