import { Injectable } from '@angular/core';
import{ AdmPreescription} from './AdmPreinscriptions';
import {ApiService} from '../../../core/services/api.service';
import * as moment from 'moment'
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AdmAsociationsMember } from './asociados/asociados-asociations/admAsociationsMember';
import { UtilsService } from 'app/core/services/utils.service';
import { BehaviorSubject } from 'rxjs';
import { FilterCreditsSociosService } from 'app/shared/utils-components/filter-credits-socios-form/filter-credit-socios-service';

@Injectable({
    providedIn: 'root'
})
export class AssociatesService {

    baseUrl = `/rest/preinscripciones`;
    OnAsociationsMemberChange: BehaviorSubject<any>;
    

    constructor (
        private api: ApiService,
        private route: Router,
        private fuseProgressBar: FuseProgressBarService,
        private utils: UtilsService,
        private filterCreditsSociosService: FilterCreditsSociosService
    )
    {
        this.OnAsociationsMemberChange = new BehaviorSubject([]);
    }


    make_preinscription(preinscription: AdmPreescription ): Promise<any>{
        return new Promise ((resolve, reject) =>{
            //delete unnecesary object

            delete preinscription.associate.personId;
            delete preinscription.associate.phoneAccount;
            delete preinscription.associate.documentAccount;
            delete preinscription.associate.beneficiaryAccount;
            delete preinscription.associate.countryOfBirth;
            delete preinscription.associate.stateOfBirth;
            delete preinscription.associate.cityOfBirth;
            delete preinscription.associate.immigrationCondition;
            delete preinscription.associate.passport;
            delete preinscription.associate.ownAccount;
            delete preinscription.associate.ownAccountDescription;
            delete preinscription.associate.role;
            delete preinscription.associate.dateCreated;
            delete preinscription.associate.isPartner;
            delete preinscription.associate.isBeneficiary;
            delete preinscription.associate.membershipNumber;
            delete preinscription.associate.personKey;
            delete preinscription.associate.addressAccount;
            delete preinscription.associate.documentOrder;
            delete preinscription.associate.documentType;
            //delete preinscription.associate.middleName;
            //delete preinscription.associate.nit;
            delete preinscription.associate.orderNumber;
            //delete preinscription.associate.partnerName;

            preinscription.associate.birthday = moment(preinscription.associate.birthday).format('YYYY-MM-DD');
            preinscription.associate.nameComplete = `${preinscription.associate.firstName}, ${preinscription.associate.lastName}`


            const url = this.baseUrl;
            this.api.postMethod(url, preinscription)
            
                .then ( res   =>  {
                    const personKey = res[0].personKey
                    if(personKey) { 
                        this.navigate_to_associate_profile(personKey)
                        resolve ('registro insertado')
                        
                    }
                    
                    })
                .catch( error => {
                    console.log(error)
                    reject  ('error al insertar preinscripción ' + error.error.msg)  ;
                });
        });

    }

    listado_preinscripciones(): Promise<any>{
        return new Promise ((resolve, reject) => {
            const url = this.baseUrl;
            this.api.getMethod(url)
                .then(data => {
                    const _preinscripciones = data as AdmPreescription[];
                    this.filterCreditsSociosService.OnListadoSociosChange.next(_preinscripciones)
                    resolve(_preinscripciones)
                })
                .catch(error => {
                    this.filterCreditsSociosService.OnListadoSociosChange.next([])
                    reject ('Error al obtener Listado error ' +  error.statusText)
                })
        })

    }

    navigate_to_associate_profile(personKey: string){
        const url = `/associate/profile/${personKey}/personal-info`
        
        setTimeout(()=>{                           
            this.route.navigateByUrl(url)
        }, 2000);
        
        
    }

    add_association_member(member: AdmAsociationsMember){
        delete member.associationResponsibleId;
        member.dischargeDate = moment(member.dischargeDate).format('YYYY-MM-DD HH:MM:ss');
        member.admissionDate = moment(member.admissionDate).format('YYYY-MM-DD HH:MM:ss');

        this.fuseProgressBar.show();
        const url = `/rest/association_responsibles/v1/`;
        this.api.postMethod(url, member)
            .then(data => {
                this.fuseProgressBar.hide();
                this.getAsociacionesBysocio(member.person.personKey)

            })
            .catch(error => {
                this.fuseProgressBar.hide();
                this.utils.openSnackBar('Ocurrio un problema al asignar a la asociacion')
            })

    }


    getAsociacionesBysocio(personKey: string): Promise <any> {
        return new Promise((resolve, reject) => {
            this.fuseProgressBar.show();
            const url = `/rest/associate/v1/${personKey}/associations`;
            this.api.getMethod(url)
                .then(response => {
                    
                    this.fuseProgressBar.hide();
                    const data = response  as AdmAsociationsMember[];
                    this.OnAsociationsMemberChange.next(data)
                    resolve(data)
                })
                .catch(error => {
                    this.fuseProgressBar.hide();
                    this.utils.openSnackBar('Error al Obtener la o las Asocicaicones a las que pertenece el asociado')
                    reject(error)
                })
        })
    }

    get_asociate_inscription_details(personkey: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.fuseProgressBar.show()
            const url = `/rest/associate/v1/${personkey}`;
            this.api.getMethod(url).then(res => {
                this.fuseProgressBar.hide();
                const associate_info = res as AdmPreescription;
                resolve(associate_info);
            })  

            .catch(error => {
                this.fuseProgressBar.hide();
                const message = `error al obtener informacion de inscripción`;
                this.utils.openSnackBar(message)
                reject (message)
            })
        })
    }
}