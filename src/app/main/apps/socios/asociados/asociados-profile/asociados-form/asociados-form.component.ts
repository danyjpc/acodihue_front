import { Component, Input, OnInit } from '@angular/core';
import { AdmPerson } from 'app/shared/adm-models/AdmPerson';
import { AdmTypology } from 'app/shared/adm-models/AdmTypology';
import * as moment from 'moment';
import { environment as env } from 'environments/environment';
import { TypologiesService } from '../../../../management/typologies/typologies.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AgenciasService } from 'app/main/apps/management/agencias/agencias.service';
import { ActivatedRoute } from '@angular/router';
import {AssociateManagerService} from '../../AssociateManagerService'
import { UtilsService } from 'app/core/services/utils.service';
import { PersonsService } from 'app/shared/services/person.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdmCredit } from 'app/main/apps/credits/AdmCredit';
import { CreditService } from 'app/main/apps/credits/credit-service';



@Component({
  selector: 'app-asociados-form',
  templateUrl: './asociados-form.component.html',
  styleUrls: ['./asociados-form.component.scss']
})
export class AsociadosFormComponent implements OnInit {
  @Input()creditEneable = false;

  associate: AdmPerson;

  env = env;
  GeneroTypologies: AdmTypology;
  EstadoCivilTypologies: AdmTypology;
  PuebloMayaTypologies: AdmTypology;
  ProfesionTypologies: AdmTypology;
  departamentosTypologies: AdmTypology;
  municipiosTypologies: AdmTypology;
  parentezcosTypologies: AdmTypology;
  comunidadesLinguisticas: AdmTypology;
  age : number = 0;
  personKey: string;

  _unsubscribe: Subject<any>;



   // variables for credits
   credit: AdmCredit;
   creditKey: string;

  constructor
  (
    private typologyService : TypologiesService,
    private agenciesService: AgenciasService,
    private f_progressBar: FuseProgressBarService,
    private  route: ActivatedRoute,
    private AssociateManagerService : AssociateManagerService,
    private utils: UtilsService,
    private personsService: PersonsService,
    private creditService: CreditService
  ) 
  { 
    this.associate = new AdmPerson();
    this.GeneroTypologies         =   new AdmTypology();
    this.EstadoCivilTypologies    =   new AdmTypology();
    this.PuebloMayaTypologies     =   new AdmTypology();   
    this.ProfesionTypologies      =   new AdmTypology();
    this.departamentosTypologies  =   new AdmTypology();
    this.municipiosTypologies     =   new AdmTypology();
    this.parentezcosTypologies    =   new AdmTypology();
    this.comunidadesLinguisticas  =   new AdmTypology();

    const _personKey = this.route.snapshot.params.personKey
    this.personKey = (_personKey) ? _personKey  : 'null';
    
    this._unsubscribe =  new  Subject();

    //Creditos
    this.credit = new AdmCredit();
    const _creditKey = this.route.snapshot.params.creditKey
    this.creditKey = (_creditKey) ? _creditKey  : 'null';
  }

  ngOnInit(): void {
    this.load_typologies();
    this.loadPersonData();
    this.setAge();
    console.log(this.creditEneable, 'credit')
  }

  setAge($event?) {
    const _date = ($event) ? moment($event.value).format('YYYY-MM-DD') : moment(this.associate.birthday).format('YYYY-MM-DD');
    this.age =  moment().diff(_date,  'years');
  }

  async load_typologies() {

    this.f_progressBar.show();
    this.departamentosTypologies  = await this.typologyService.getTypology(env.DEFAULT_PAIS_TYPOLOGY);
    this.municipiosTypologies     = await this.typologyService.getTypology(env.DEFAULT_DEPARTAMENTO_TYPOLOGY);

    this.GeneroTypologies         = await this.typologyService.getTypology(env.GENERO_TYPOLOGIES);
    this.EstadoCivilTypologies    = await this.typologyService.getTypology(env.ESTADO_CIVIL_TYPOLOGIES);
    this.PuebloMayaTypologies     = await this.typologyService.getTypology(env.MAYAN_PEOPLE_TYPOLOGY);
    this.ProfesionTypologies      = await this.typologyService.getTypology(env.PROFESIONES_TYPOLOGIES);
    this.parentezcosTypologies    = await this.typologyService.getTypology(env.PARENTEZCOS_TYPOLOGY);
    this.comunidadesLinguisticas  = await this.typologyService.getTypology(env.COMUNIDAD_LINGUISTICA_TYPOLOGY);

    this.f_progressBar.hide();
        
  }

  async loadNewMunicipios(event) {
    
    this.municipiosTypologies = await this.typologyService.getTypology(event.value);
    
  }


  loadPersonData(){

    this.AssociateManagerService.get_associate_single(this.personKey)
    //     .then(person => {
    //       delete person.createdBy;
    //       this.associate =  person as AdmPerson;
    //     })
    //     .catch(error => {
    //       this.utils.openSnackBar(error);
    //     })


    this.AssociateManagerService.OnAssociateChange 
        .pipe(takeUntil(this._unsubscribe))
        .subscribe(_person => {
          this.associate = (_person.personKey) ? _person  : new AdmPerson();
        });
    
    if (this.creditEneable) {
      this.creditService.get_single_credit(this.creditKey)
          .then(credit => {
            this.credit = credit as AdmCredit;
          });
    }
  }


  updateData(){

    if (this.creditEneable) { 
      const credit = this.credit;
      this.creditService.updateCreditInfo(credit);
    }

    this.associate.birthday =  moment(this.associate.birthday).format('YYYY-MM-DD');
    this.personsService.updatePerson(this.associate)
        .then(res => { this.utils.openSnackBar(res)})
        .catch(error => {this.utils.openSnackBar(error)});




  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._unsubscribe.next();
    this._unsubscribe.complete()
  }

}
