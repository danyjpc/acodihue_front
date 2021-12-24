import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { itemDetail,PathDocument } from '../AdmCreditCheckList';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { UtilsService } from 'app/core/services/utils.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdmPerson } from 'app/shared/adm-models/AdmPerson';
import { AssociateManagerService } from 'app/main/apps/socios/asociados/AssociateManagerService';
import { CreditService } from '../../../credit-service';

@Component({
  selector: 'app-download-doc',
  templateUrl: './download-doc.component.html',
  styleUrls: ['./download-doc.component.scss']
})
export class DownloadDocComponent implements OnInit {
  listDocD:PathDocument []= [];
  creditKey : string;

  displayedColumns: string[] = ['name', 'action'];
  _unsubscribe: Subject<any>;
  person : AdmPerson

  constructor(
    public matDialogRef: MatDialogRef<DownloadDocComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private utils : UtilsService,
    private f_progressBar: FuseProgressBarService,
    private asociateManagerService: AssociateManagerService,
    private creditService : CreditService
  ) 
  {

    this.creditKey = (data && data.creditK) ? data.creditK : 'null'
    this.person = new AdmPerson();
    this._unsubscribe = new Subject();
  }

  ngOnInit(): void {
    /*this.asociateManagerService.OnAssociateChange
        .pipe(takeUntil(this._unsubscribe))
        .subscribe((_person: AdmPerson) => {

          this.person = (_person.personKey) ?  _person : new AdmPerson();
        })*/
    this.creditService.getPathDocs().then(data =>{
      this.listDocD = data;
    })
  }

 

  downloadDocument(document:itemDetail){
    const url = `rest/credit/v1/${this.creditKey}/files/${document.pathDownload}`;
    this.f_progressBar.show()

    this.utils.exportDocument(url)
          .pipe(takeUntil(this._unsubscribe))
          .subscribe( data => {
            this.f_progressBar.hide();                        
            this.utils.downloadFile(data, document.nameDocument, 'docx');
          },error=>{
            this.f_progressBar.hide();
            this.utils.openSnackBar('Error al descargar el archivo, vuelva a intentarlo')
          })
  }
}
