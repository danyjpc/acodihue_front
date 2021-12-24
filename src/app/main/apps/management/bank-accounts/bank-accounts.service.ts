import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FuseProgressBarService } from '../../../../../@fuse/components/progress-bar/progress-bar.service';
import { ApiService } from '../../../../core/services/api.service';
import { UtilsService } from '../../../../core/services/utils.service';
import { AdmTypology } from '../../../../shared/adm-models/AdmTypology';
import { environment as env } from 'environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class BankAccountsService{
    onchangeTypology : BehaviorSubject<any>;
    constructor(
        private fuseprogresbar: FuseProgressBarService,
        private utilsService: UtilsService,
        private api: ApiService,
    ){
        this.onchangeTypology = new BehaviorSubject([]);
    }
    //Usado para listar los tipos de cuentas
    getAccountTypes(): Promise <any> {
        const endpoint = `/rest/account_types/v1`;
        this.fuseprogresbar.show();
        return new Promise (( resolve, reject ) => {
          this.api.getMethod( endpoint )
            .then( (res :AdmTypology[]) => {
                this.fuseprogresbar.hide()
                //Se retorna un array de los hijos de la tipologia padre
                const typologies = res as AdmTypology[];
                this.onchangeTypology.next(typologies)
                resolve(typologies);
                
            }).catch( error => {
                this.fuseprogresbar.hide();
                this.utilsService.openSnackBar('Error al obtener el listado de tipologias')
                reject( 'Error al obtener la lista de tipologias' + error );
          })
        });
    }
    //Usado para obtener las operaciones Debe y Haber
    getParentTypology2(parentTypologyId: number): Promise <any> {
        const endpoint = `/rest/typologies/${parentTypologyId}`;
        this.fuseprogresbar.show();
        return new Promise (( resolve, reject ) => {
          this.api.getMethod( endpoint )
            .then( (res :AdmTypology) => {
                this.fuseprogresbar.hide()
                //Se retorna un array de los hijos de la tipologia padre
                const typologies = res.childTypologies as AdmTypology[];
                resolve(typologies);
                
            }).catch( error => {
                this.fuseprogresbar.hide();
                this.utilsService.openSnackBar('Error al obtener el listado de tipologias')
                reject( 'Error al obtener la lista de tipologias' + error );
          })
        });
    }

    newChildTypology( childTypology: AdmTypology ): Promise <any> {
        const endpoint =`/rest/account_types/v1`;
        this.fuseprogresbar.show()
        return new Promise ((resolve, reject) => {
        this.api.postMethod( endpoint, childTypology )
            .then( response => {
                this.fuseprogresbar.hide();
                this.getAccountTypes();
                this.utilsService.openSnackBar('Registro creado correctamente');
                resolve( response );
            })
            .catch( error  => {
                this.fuseprogresbar.hide();
                this.utilsService.openSnackBar('Error al crear nuevo registro, intente de nuevo')
                reject( 'Error al persistir el registro ' + error );
            });
        });
    }

    updateTypology(typology : AdmTypology): Promise<any>{
        const endpoint = `/rest/account_types/v1/${typology.typologyId}`;
        this.fuseprogresbar.show();
        return new Promise((resolve, reject) => {
        this.api.putMethod( endpoint, typology )
            .then(( response ) => {
                this.fuseprogresbar.hide()
                this.getAccountTypes()
                this.utilsService.openSnackBar('Registro actualizado correctamente')
                resolve( response );
            }).catch( error => {
                this.fuseprogresbar.hide()
                this.utilsService.openSnackBar('Error al actualizar el registro')
                reject( 'Error al actualizar el registro' + error );
            })
        })
    }
    //Obtiene las tipologias asignadas a una cuenta filtradas por la transaccion debe y haber
    getAssignedTypologies(typeAccount: number, transactionType: number):Promise<any>{
        const enpoint = `/rest/products_accounts/v1/${typeAccount}/transaction/type/${transactionType}`
        this.fuseprogresbar.show();
        return new Promise((resolve, reject)=>{
            this.api.getMethod(enpoint)
                .then(res =>{
                    this.fuseprogresbar.hide()
                    resolve(res);
                }).catch(error => {
                    this.fuseprogresbar.hide()
                    this.utilsService.openSnackBar('Ocurrio un error al cargar las tipologias asigandas')
                    reject('Ocurrio un error al cargar las tipologias asigandas '+error);
                })
        })
    }

    saveTransaction(typeAccount: number, transactionType: number, array): Promise<any>{
        const enpoint = `/rest/products_accounts/v1/${typeAccount}/transaction/type/${transactionType}`
        this.fuseprogresbar.show();
        return new Promise((resolve, reject)=>{
            this.api.postMethod(enpoint, array)
            .then(res =>{
                this.fuseprogresbar.hide()
                this.utilsService.openSnackBar('Cambios guardados con exito')
                resolve(res)
            }).catch(error=>{
                this.fuseprogresbar.hide()
                this.utilsService.openSnackBar('Ocurrio un error al guardar, intente de nuevo')
                reject(error)
            })
        })
    }
}