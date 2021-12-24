import {Injectable} from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { environment as env } from 'environments/environment';
import { HttpClient} from '@angular/common/http';
import { ApiService } from './api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogComponent } from 'app/shared/utils-components/alert-dialog/alert-dialog.component';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    OnUserlogedChanges: BehaviorSubject<any>;
    userKey; 
    organizationKey;


    constructor(
        private api: ApiService,  
        private http: HttpClient,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private fuseprogressBar: FuseProgressBarService
        ) {
        this.OnUserlogedChanges = new BehaviorSubject([]);
    

    }
    // dialogRef: MatDialogRef<AlertDialogComponent>;

    
    // tslint:disable-next-line: typedef
    getTypology(tipologyId) {
        return this.api.getMethod(`/rest/typologies/${tipologyId}`);

    }

    openSnackBar(message: string) {
        return this.snackBar.open(
            message,
            'OK', 
            {
                duration: 4000,
                verticalPosition: 'top'
            }

        );
    }


    exportFile(endPoint,  params?, type?, fileName?) {
        this.fuseprogressBar.show();
        const url = `${env.SERVER_URL}/${endPoint}`;
        this.http.get(url, {params , responseType: 'blob'})
            .subscribe(data => {
                this.fuseprogressBar.hide();
                this.downloadFile(data, fileName, type);
            }, error => {
                this.fuseprogressBar.hide();
                this.openSnackBar('ocurrió un problema al obtener detalle de cuenta associado  error: ' +  error.statusText);
            });


    }

    exportDocument(endPoint,  params?){
        const url = `${env.SERVER_URL}/${endPoint}`;
        return this.http.get(url, {params , responseType: 'blob'});
    }

    exportCotizationDoc(endpoint, body, params?, type?, fileName?) {
        this.fuseprogressBar.show();
        const url = `${env.SERVER_URL}/${endpoint}`;
        this.http.post(url, body, {params , responseType: 'blob'})
            .subscribe(data => {
                this.downloadFile(data, fileName, type);
                this.fuseprogressBar.hide();
            }, error => {
                this.fuseprogressBar.hide();
                this.openSnackBar('Error al  generar el documento de la cotización solicitada');
            });
    }


    downloadFile(data, fileName?, _type?) {
        // example type = 'text/csv';
        const type =  (_type) ? _type : 'docx';
        // const blob = new Blob([data]);
        // console.log(blob);
        const blob = new Blob([data], { type });
        const url =  window.URL.createObjectURL(blob);
        // const url =  window.URL.createObjectURL(data);
  
        const anchor = document.createElement('a');
        anchor.download = `${fileName}.${type}`;
        // window.open(url);
        anchor.href = url;
        anchor.click();
  
    }


    get_months(type?) {

        const monts: Months[] = [
            {
                name: 'Enero',
                index: 1
            },
            {
                name: 'Febrero',
                index: 2
            },
            {
                name: 'Marzo',
                index: 3
            },
            {
                name: 'Abril',
                index: 4
            },
            {
                name: 'Mayo',
                index: 5
            },
            {
                name: 'Junio',
                index: 6
            },
            {
                name: 'Julio',
                index: 7
            },
            {
                name: 'Agosto',
                index: 8
            },
            {
                name: 'Septiembre',
                index: 9
            },
            {
                name: 'Octubre',
                index: 10
            },
            {
                name: 'Noviembre',
                index: 11
            },
            {
                name: 'Diciembre',
                index: 12
            }
        ];

        if (type && type === 'current') {
            const curren_mont = moment().month() + 1;
            return monts.slice(0, curren_mont);
        }else {
            return monts;
        }
        
    }


    openConfirDialogService(question?: string) {
        const dialogRef = this.dialog.open(AlertDialogComponent, {
            data: {question}
        });

        return dialogRef.afterClosed();
        
    }



    // uploadImage(file: File, productKey?: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         const url = `rest/product/photo/${productKey}`;
    //         const formData: FormData = new FormData();
    //         formData.append('files', file, file.name);
    //         this.api.uploadFile(url, formData ).subscribe(res => {
    //             if (res ) {
    //                 resolve ('Archivo subido exitosamente');
    //             }
    //         }, 
    //         error => {
    //             reject('Error' + error.error.msg);
    //         });
     
    //     });
       

    // }



    // CrearImagen(url, file) : Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         const formData: FormData = new FormData();
    //         formData.append('files', file, file.name);
    //         this.api.uploadFile(url, formData ).subscribe(res => {
    //             if (res === 201 || res === 200 ) {
    //                 resolve(true);
    //             }
    //         }, 
    //         error => {
    //             reject('Error' + error.error.msg);
    //         });
    //     });
    // }



    // subirMultiplesImagenes(url, files: File[]): Promise <any>{
    //     return new Promise((resolve, reject) => {
    //         const formData: FormData = new FormData();
            
    //         files.forEach(file => {
    //             formData.append('files' , file , file.name);
    //         });

    //         this.api.uploadFile(url, formData).subscribe(res => {
    //             if (res === 201 || res === 200  ) {
    //                 resolve(true);
    //             }
    //         }),
    //         // tslint:disable-next-line: no-unused-expression
    //         error => {
    //             reject('Error al subir imágenes, el servidor respondió' + error.error.msg);
    //         };
    //     });
    // }
}





export interface Months {
    name: string;
    index: number;
}
