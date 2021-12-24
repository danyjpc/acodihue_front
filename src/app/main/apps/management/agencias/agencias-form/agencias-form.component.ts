import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AdmTypology } from 'app/shared/adm-models/AdmTypology';
import { TypologiesService } from '../../typologies/typologies.service';
import { AdmAgencias } from '../AdmAgencia';
import {environment  as env } from 'environments/environment';


@Component({
  selector: 'app-agencias-form',
  templateUrl: './agencias-form.component.html',
  styleUrls: ['./agencias-form.component.scss']
})
export class AgenciasFormComponent implements OnInit {

  agencia: AdmAgencias;
  action: string;
  dialogTitle: string;

  departamentosTypologies: AdmTypology;
  municipiosTypologies: AdmTypology;

  
  constructor(
    public matDialogRef: MatDialogRef<AgenciasFormComponent>,
    private typologyService: TypologiesService,
    private progressBar: FuseProgressBarService,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) 
  {
    this.action = _data.action;
    if ( this.action === 'edit' )
    {
        this.dialogTitle = 'Editar  datos de Agencia';
        this.agencia = _data.agencia;
    }
    else
    {
        this.dialogTitle = 'Agergar Nueva Agencia';
        this.agencia = new AdmAgencias();
    }

    this.departamentosTypologies = new AdmTypology();
    this.municipiosTypologies = new AdmTypology();  
  }

  ngOnInit(): void {
    this.load_typologies();
  }


  async load_typologies() {
    
    this.departamentosTypologies = await this.typologyService.getTypology(env.DEFAULT_PAIS_TYPOLOGY);
    this.municipiosTypologies = await this.typologyService.getTypology(this.agencia.agencyAddress.state.typologyId);
    
  }

  async loadNewMunicipios(event) {
    
    this.municipiosTypologies = await this.typologyService.getTypology(event.value);
    
  }

  saveForm(){
    //send asociacion data to subscriber dialog to save it
    
    this.matDialogRef.close(this.agencia);
  }

}
