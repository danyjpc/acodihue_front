import { Injectable } from '@angular/core';
import {ApiService} from '../../../core/services/api.service';
import {AdmAmortizationsTable, AmortizationParams} from './credit-calucalator-interface';
import {UtilsService} from '../../../core/services/utils.service';
import { FuseProgressBarService } from '../../../../@fuse/components/progress-bar/progress-bar.service';

@Injectable({
    providedIn: 'root'
})
export class OperationsService {

    constructor(
        private api: ApiService,
        private utils: UtilsService,
        private fuseProgresBar: FuseProgressBarService,
    )
    {

    }

    calculateAmorizations(body: AmortizationParams, personKey?, params?): Promise<any> {
        
        return new Promise((resolve, reject) => {
            delete body.calculatorId;
            this.fuseProgresBar.show();
            const url = (personKey) ? `/rest/creditCalculator/v1/${personKey}` : `/rest/creditCalculator/v1`;
            if (!personKey) { 
                delete body.person.personKey;
            }

            this.api.postMethod(url, body, params)
                .then(response  => {
                    this.fuseProgresBar.hide();
                    const _amortizationsTable = response as AdmAmortizationsTable;
                    if (params) {
                        this.utils.openSnackBar('Cotización Almacenada');
                    }
                    resolve (_amortizationsTable);
                })
                .catch(error => {
                    this.fuseProgresBar.hide();
                    this.utils.openSnackBar("Error Al Obtern Tabla de Amortizaciones por favor Revisé")
                })

        });

    }


    getAmortizationtableCotizationSingle(personKey, calculatorId): Promise <any> {
        return new Promise((resolve, reject) => {
            this.fuseProgresBar.show();
            const url = `/rest/creditCalculator/v1/${personKey}/${calculatorId}`;

            this.api.getMethod(url)
                .then(data => {
                    this.fuseProgresBar.hide();
                    const _data  = data as AdmAmortizationsTable;
                    resolve (data);
                })
                .catch(error => {
                    this.fuseProgresBar.hide();
                    this.utils.openSnackBar('error al obtener Talba de amortizacion para esta Solicitud intente más tarde')
                    reject(error);
                });
        });

    }

    getCotizationsByClient(personKey): Promise <any> {
        if (!personKey) {
            this.utils.openSnackBar("Error al Obtener listado de cotizaciones, no es un asociado valido")
        } else {
            this.fuseProgresBar.show();
            const url = `/rest/creditCalculator/v1/${personKey}`;
            return new Promise ((resolve, reject) => {
                this.api.getMethod(url)
                    .then( response => {
                        this.fuseProgresBar.hide();
                        const cotizations = response as AmortizationParams[];
                        resolve(cotizations);
                    })
                    .catch(error => {
                        this.fuseProgresBar.hide();
                        this.utils.openSnackBar('Hubo un problema al obtener el listado de Cotizaciones del asociado')
                    });
            });
        }

        
    }

    updateCotizationTable(body: AmortizationParams): Promise <any> {
        return new Promise ((resolve, reject) => {
            this.fuseProgresBar.show();
            const url = `/rest/creditCalculator/v1/${body.calculatorId}`;
            this.api.putMethod(url, body)
                .then(response => {
                    this.fuseProgresBar.hide();
                    this.utils.openSnackBar('Tabla Actualizada')
                    const _amortizationsTable = response as AdmAmortizationsTable;
                    resolve(_amortizationsTable);
                })
                .catch(error => {
                    this.fuseProgresBar.hide();
                    this.utils.openSnackBar('error al obtener Actualizar de amortizacion  intente más tarde')
                    reject(error);
                });
        });
    }


    printAmorizations(body: AmortizationParams, personKey?, _params?) {

            const params = (_params) ? _params : {type: 'document'};
            const  calcId = body.calculatorId;
            delete body.calculatorId;
            const fileName = `cotizacion-de-credito-${calcId}-${body.person.firstName}-${body.person.lastName}`; 
            const url = (personKey && personKey !== null) ? `rest/creditCalculator/v1/${personKey}` : `rest/creditCalculator/v1`;
            if (!personKey) { 
                delete body.person.personKey;
            }

            this.utils.exportCotizationDoc(url, body, params, 'docx', 'Cotizacion-de-credito-' + fileName);


  

    }

}