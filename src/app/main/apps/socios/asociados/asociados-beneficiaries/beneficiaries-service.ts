import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {ApiService} from '../../../../../core/services/api.service';
import {environment as env } from '../../../../../../environments/environment';
import { AdmBeneficiary } from './AdmBeneficiary'
import * as moment from 'moment'

@Injectable({
    providedIn: 'root'
})
export class BeneficiariesService {



    BaseUrl = `/rest/associate/v1`;
    OnBeneficiariesChange: BehaviorSubject<any>;

    constructor(
        private api: ApiService,
    )
    {
        this.OnBeneficiariesChange = new BehaviorSubject([]);
    }

    list_beneficiaries(personCreditKey, creditEnable = false): Promise<any> {
    

        return new Promise((resolve,reject) => {
            const url = (!creditEnable) ?  `${this.BaseUrl}/${personCreditKey}/beneficiary` : `/rest/credits/v1/${personCreditKey}/references` ;
            const status = env.DEFAULT_STATUS_ACTIVE;
            const params = {status};

            this.api.getMethod(url, params) 
                .then(beneficiaries => {
                    this.OnBeneficiariesChange.next(beneficiaries as AdmBeneficiary[]);
                    resolve (beneficiaries as AdmBeneficiary[]);
                })
                .catch(error => {
                    reject('error al obtener beneficiarios ' + error.error.msg)
                });
        });
    }
    

    update_beneficiary(beneficiary: AdmBeneficiary, entityKey: string, creditEnable): Promise<any> {

        return new Promise((resolve,reject) => {
            beneficiary.person.birthday = moment(beneficiary.person.birthday).format('YYYY-MM-DD');
            const url = (!creditEnable) ? 
                        `${this.BaseUrl}/${entityKey}/beneficiary/${beneficiary.beneficiaryId}` :
                        `/rest/credits/v1/${entityKey}/references/${beneficiary.referenceId}`;

            this.api.putMethod(url, beneficiary) 
                .then(res => {
                    this.list_beneficiaries(entityKey, creditEnable)
                    resolve ('Datos de Beneficiario Actualizados');
                })
                .catch(error => {
                    reject('error al actualizar datos del beneficiarios ' + error.error.msg)
                })
        })
    }


    create_beneficiary(beneficiary: AdmBeneficiary, entityKey: string, creditEnable): Promise<any> {

        delete beneficiary.dateCreated;
        delete beneficiary.person.personKey;
        if (creditEnable) {
            delete beneficiary.beneficiaryId;
        }
        else {
            delete beneficiary.referenceId;
        }
        beneficiary.person.birthday = moment(beneficiary.person.birthday).format('YYYY-MM-DD');

        return new Promise((resolve,reject) => {
            const url =     (!creditEnable) ? `${this.BaseUrl}/${entityKey}/beneficiary` : `/rest/credits/v1/${entityKey}/references/new`;


            this.api.postMethod(url, beneficiary) 
                .then(res => {
                    this.list_beneficiaries(entityKey, creditEnable )
                    resolve ('Datos  Ingresados');
                })
                .catch(error => {
                    console.log(error)
                    reject('error al ingresar datos  ' + error.error.msg);
                })
        })
    }
}