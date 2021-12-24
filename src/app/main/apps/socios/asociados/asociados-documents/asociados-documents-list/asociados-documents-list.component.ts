import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { UtilsService } from 'app/core/services/utils.service';
import { AdmDocument } from 'app/shared/adm-models/AdmDocument';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AsociadosDocumentsFormComponent } from '../asociados-documents-form/asociados-documents-form.component';
import { DocumentsService } from '../documents.service';
import {environment as env} from '../../../../../../../environments/environment'
import { split } from 'lodash';

@Component({
  selector: 'app-asociados-documents-list',
  templateUrl: './asociados-documents-list.component.html',
  styleUrls: ['./asociados-documents-list.component.scss']
})
export class AsociadosDocumentsListComponent implements OnInit {

  @Input()creditEnabled = false;

  displayedColumns: string[] = ['icon', 'name', 'type', 'actions'];
  documentos: AdmDocument[] = [];

  entityKey: string;
  $destroy: Subject<any>;

  documentsURL:string;

  creditKey: string;
  constructor(
    private documentService: DocumentsService,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private utils: UtilsService
  ) 
  { 
    //this.personKey = (this.route.snapshot.params.personKey) ? this.route.snapshot.params.personKey  : 'null';
 
    this.$destroy = new Subject();

    this.documentsURL =  env.SERVER_URL.split('/acodihue-core')[0];

  }

  ngOnInit(): void {
    this.get_documents();
  }

  get_documents(){

    this.entityKey = (this.creditEnabled) ? this.route.snapshot.params.creditKey : this.route.snapshot.params.personKey; 
    this.documentService.getFilesByPerson(this.entityKey, this.creditEnabled);

    this.documentService.OndocumentsChange
        .pipe(takeUntil(this.$destroy))
        .subscribe(documents =>{
          this.documentos = documents;
        })
  }

  ver_documento(){

  }

  create_file(){
    const entityKey = this.entityKey
    const creditEnable = this.creditEnabled
    const dialogRef = this.matDialog.open(AsociadosDocumentsFormComponent, {
      width: '550px',
      data: {entityKey, creditEnable}
    })

  }

}
