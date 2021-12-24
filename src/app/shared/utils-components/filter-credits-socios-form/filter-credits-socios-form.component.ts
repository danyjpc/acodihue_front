import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from 'app/core/services/utils.service';
import { AdmTypology } from 'app/shared/adm-models/AdmTypology';
import {FilterParams} from './admFilterParams';
import {FilterCreditsSociosService} from './filter-credit-socios-service';
import { environment as env } from 'environments/environment';
import { AdmAgencias } from 'app/main/apps/management/agencias/AdmAgencia';
import { AgenciasService } from 'app/main/apps/management/agencias/agencias.service';

@Component({
  selector: 'app-filter-credits-socios-form',
  templateUrl: './filter-credits-socios-form.component.html',
  styleUrls: ['./filter-credits-socios-form.component.scss']
})
export class FilterCreditsSociosFormComponent implements OnInit {
  @Input()type = 'socios'
  params: FilterParams;

  statusOperatedTypologies: AdmTypology;
  Agencias: AdmAgencias[]=[];
  constructor(
    private filterService: FilterCreditsSociosService,
    private utils: UtilsService,
    private agenciasService: AgenciasService
  ) { 
    this.params = new FilterParams;
    this.statusOperatedTypologies = new AdmTypology();
  }

  ngOnInit(): void {

    if (this.type  && this.type === 'credits') { 
      this.loadCreditsData();
    } else {
      this.loadSociosData();
    }

  }


  async loadCreditsData(){
      try {
        this.statusOperatedTypologies =  await  this.utils.getTypology(env.CREDIT_STATUS_OPERATE_TYPOLOGY) as AdmTypology;
      } catch (error) {
        this.utils.openSnackBar('error al obtnenr data')
      }
  }


  async loadSociosData(){
    try {
      this.Agencias =  await this.agenciasService.listar_agencias() as AdmAgencias[];
    } catch (error) {
      this.utils.openSnackBar('error al obtnenr data')
    }
  }

  filterData(){
    this.filterService.filter_data(this.params, this.type)
  }

}
