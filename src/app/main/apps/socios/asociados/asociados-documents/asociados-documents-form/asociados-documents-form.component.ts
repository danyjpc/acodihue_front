import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { UtilsService } from 'app/core/services/utils.service';
import { AdmTypology } from 'app/shared/adm-models/AdmTypology';
import { DocumentParams} from '../AdmDocuments';
import {DocumentsService} from '../documents.service';
import {environment as env } from 'environments/environment';

@Component({
  selector: 'app-asociados-documents-form',
  templateUrl: './asociados-documents-form.component.html',
  styleUrls: ['./asociados-documents-form.component.scss']
})
export class AsociadosDocumentsFormComponent implements OnInit {

  fileForm: FormGroup;
  nombreArchivo = new FormControl('', Validators.required);
  dataFile: File;
  params: DocumentParams;
  entityKey: string;

  creditEnable;

  documentTypesTypologies: AdmTypology;

  constructor(
    public matDialogRef: MatDialogRef<AsociadosDocumentsFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private filesService: DocumentsService,
    private utils: UtilsService

    
  )
  { 
    this.params = new DocumentParams();
    this.entityKey = (this.data.entityKey) ? this.data.entityKey : 'null';
    this.documentTypesTypologies = new AdmTypology();
    this.creditEnable = this.data.creditEnable;
  } 
  ngOnInit(): void {
      this.loadTypology();
  }
  

  onFileChange(file:any){        
      this.dataFile = (file)?  file[0] : "No se ha seleccionado ningun archivo";
      this.nombreArchivo.setValue(this.dataFile.name);
      
  }



  uploadFile(){
    
    const formData: FormData = new FormData();
    formData.append('files', this.dataFile, this.dataFile.name);

    this.params.name = this.dataFile.name;

    this.filesService.uploadFile(formData, this.params, this.entityKey, this.creditEnable )
        .then(res => {
          this.utils.openSnackBar(res);
          this.matDialogRef.close();
        })
        .catch(error => {
          this.utils.openSnackBar(error);
          this.matDialogRef.close();
        })
      

    
  }

  async loadTypology() {
    this.documentTypesTypologies =  <AdmTypology> await this.utils.getTypology(env.DOCUMENT_TYPES_TYPOLOGY);
  }

}
