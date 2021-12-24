import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'app/core/services/utils.service';
import { AdmTypology } from 'app/shared/adm-models/AdmTypology';
import {AdmPreescription} from '../../AdmPreinscriptions';
import { environment as env } from 'environments/environment';
import { TypologiesService } from '../../../management/typologies/typologies.service';
import * as moment from 'moment';
import { organizationAgency, OrganizationAsociacion } from 'app/shared/adm-models/AdmOrganization';
import { AgenciasService } from '../../../management/agencias/agencias.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AssociatesService } from '../../Associates.service';
import { contactAddress } from 'app/shared/adm-models/AdmAddress';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-pre-register-associate',
  templateUrl: './pre-register-form.component.html',
  styleUrls: ['./pre-register-form.component.scss']
})
export class PreRegisterFormComponent implements OnInit {
  env = env;
  preescription: AdmPreescription;

  GeneroTypologies: AdmTypology;
  EstadoCivilTypologies: AdmTypology;
  PuebloMayaTypologies: AdmTypology;
  ProfesionTypologies: AdmTypology;
  departamentosTypologies: AdmTypology;
  municipiosTypologies: AdmTypology;
  parentezcosTypologies: AdmTypology;
  comunidadesLinguisticas: AdmTypology;
  age : number = 0;
  Agencies: organizationAgency [] =[];


  agency: organizationAgency;

  constructor(
    private typologyService : TypologiesService,
    private agenciesService: AgenciasService,
    private f_progressBar: FuseProgressBarService,
    private associateServices: AssociatesService,
    private utils: UtilsService,
    private route: Router,
    private location: Location
  ) 
  {
    this.preescription            =   new AdmPreescription();
    this.GeneroTypologies         =   new AdmTypology();
    this.EstadoCivilTypologies    =   new AdmTypology();
    this.PuebloMayaTypologies     =   new AdmTypology();   
    this.ProfesionTypologies      =   new AdmTypology();
    this.departamentosTypologies  =   new AdmTypology();
    this.municipiosTypologies     =   new AdmTypology();
    this.parentezcosTypologies    =   new AdmTypology(); 
    this.comunidadesLinguisticas  =   new AdmTypology();
    this.preescription.associate.address =  new contactAddress();

    this.agency =  new organizationAgency();

  }

  ngOnInit(): void {
    this.load_typologies();
  }

  setAge($event) {
    const _date =  moment($event.value).format('YYYY-MM-DD');
    this.age =  moment().diff(_date,  'years');
  }


  async load_typologies() {

    this.f_progressBar.show();
    this.departamentosTypologies = await this.typologyService.getTypology(env.DEFAULT_PAIS_TYPOLOGY);
    this.municipiosTypologies    = await this.typologyService.getTypology(env.DEFAULT_DEPARTAMENTO_TYPOLOGY);

    this.GeneroTypologies         = await this.typologyService.getTypology(env.GENERO_TYPOLOGIES);
    this.EstadoCivilTypologies    = await this.typologyService.getTypology(env.ESTADO_CIVIL_TYPOLOGIES);
    this.PuebloMayaTypologies     = await this.typologyService.getTypology(env.MAYAN_PEOPLE_TYPOLOGY);
    this.ProfesionTypologies      = await this.typologyService.getTypology(env.PROFESIONES_TYPOLOGIES);
    this.parentezcosTypologies    = await this.typologyService.getTypology(env.PARENTEZCOS_TYPOLOGY);

    this.comunidadesLinguisticas  = await this.typologyService.getTypology(env.COMUNIDAD_LINGUISTICA_TYPOLOGY);
    this.Agencies                 = await this.agenciesService.listar_agencias();

    this.f_progressBar.hide();
        
  }

  async loadNewMunicipios(event) {
    
    this.municipiosTypologies = await this.typologyService.getTypology(event.value);
    
  }

  async make_preinscription(){
    this.f_progressBar.show();
    try {
      
      const  response  = await this.associateServices.make_preinscription(this.preescription);
      this.f_progressBar.hide();
      this.utils.openSnackBar(response);

    } catch (error) { 
      this.f_progressBar.hide();
      this.utils.openSnackBar(error)
    }
     
  }

  load_agency_data(event){
    const organizationkey=  event.value
    this.agency =  this.Agencies.filter(item =>  item.organizationKey === organizationkey)[0]
    console.log(this.agency)
  }


  bo_back(){
    this.location.back();
  }
  

}
