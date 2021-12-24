import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdmTypology } from 'app/shared/adm-models/AdmTypology';
import { TypologiesService } from '../../typologies/typologies.service';
import { AdmAsociacion } from '../AdmAsociacion';
import {environment  as env } from 'environments/environment';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Component({
  selector: 'app-asociaciones-form',
  templateUrl: './asociaciones-form.component.html',
  styleUrls: ['./asociaciones-form.component.scss']
})
export class AsociacionesFormComponent implements OnInit {
  asociacion: AdmAsociacion;
  action: string;
  dialogTitle: string;

  departamentosTypologies: AdmTypology;
  municipiosTypologies: AdmTypology;

  constructor
  (
    public matDialogRef: MatDialogRef<AsociacionesFormComponent>,
    private typologyService: TypologiesService,
    private progressBar: FuseProgressBarService,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) { 

     this.action = _data.action;
     if ( this.action === 'edit' )
     {
         this.dialogTitle = 'Editar  datos de Asociación';
         this.asociacion = _data.asociacion;
     }
     else
     {
         this.dialogTitle = 'Agergar Nueva Asociación';
         this.asociacion = new AdmAsociacion();
     }

     this.departamentosTypologies = new AdmTypology();
     this.municipiosTypologies = new AdmTypology();
    
  }

  ngOnInit(): void {
    this.load_typologies();
  }




  async load_typologies() {
    
    this.departamentosTypologies = await this.typologyService.getTypology(env.DEFAULT_PAIS_TYPOLOGY);
    this.municipiosTypologies = await this.typologyService.getTypology(this.asociacion.contactAddress.state.typologyId);
    
  }

  async loadNewMunicipios(event) {
    
    this.municipiosTypologies = await this.typologyService.getTypology(event.value);
    
  }

  saveForm(){
    //send asociacion data to subscriber dialog to save it
    
    this.matDialogRef.close(this.asociacion);
  }

}
