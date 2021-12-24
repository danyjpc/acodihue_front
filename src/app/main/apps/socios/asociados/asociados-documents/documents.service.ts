import { Injectable } from '@angular/core';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AdmDocument } from 'app/shared/adm-models/AdmDocument';
import { BehaviorSubject } from 'rxjs';
import { ApiService} from '../../../../../core/services/api.service'
import { UtilsService} from '../../../../../core/services/utils.service'
import { DocumentParams } from './AdmDocuments';


@Injectable({
    providedIn: 'root'
})

export class DocumentsService {
    BaseUrl = `/rest/associate/v1`

    OndocumentsChange: BehaviorSubject<any>
    constructor(
        private api: ApiService,
        private utils: UtilsService,
        private f_progressBar: FuseProgressBarService
    )
    {
        this.OndocumentsChange = new BehaviorSubject([]);
    }


    uploadFile(fileData, params: DocumentParams, entityKey, creditEnable): Promise<any>{

        this.f_progressBar.show();

        const url = (!creditEnable) ? 
                    `${this.BaseUrl}/${entityKey}/document` :
                    `/rest/credits/v1/${entityKey}/documents`;
                    
        return new Promise((resolve, reject) => {
         this.api.uploadFile(url, fileData, params)
         .then(response => {
            this.f_progressBar.hide();    
            resolve ('Archivo Almacendado');
            this.getFilesByPerson(entityKey, creditEnable);
         })
         .catch((error)=>{
            this.f_progressBar.hide();
           reject('no ha sido posible guardar la informacion, ' + error.error.msg);
         });
      });
  
    }


    getFilesByPerson(entityKey, creditEnable):  Promise<any>{
        this.f_progressBar.show()
        const url = (!creditEnable) ? 
                    `${this.BaseUrl}/${entityKey}/document` :
                    `/rest/credits/v1/${entityKey}/documents`;
        return new Promise((resolve, reject) => {
            this.api.getMethod(url)
                .then(documents => {
                    this.OndocumentsChange.next(documents)
                    resolve(documents as AdmDocument[]);
                    this.f_progressBar.hide();
                })

                .catch(error => {
                    reject ([])
                    this.f_progressBar.hide();
                    this.utils.openSnackBar('ocurrió un problema al obtener documentos  error: ' +  error.statusText)
                })
        })
    }




    
}