import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { TypologiesService } from 'app/main/apps/management/typologies/typologies.service';
import { AdmConyugue } from '../AdmConyugues';
import { AdmTypology } from 'app/shared/adm-models/AdmTypology';
import { environment as env } from 'environments/environment';

@Component({
  selector: 'app-asociados-conyugues-form',
  templateUrl: './asociados-conyugues-form.component.html',
  styleUrls: ['./asociados-conyugues-form.component.scss']
})
export class AsociadosConyuguesFormComponent implements OnInit {
  fiador : AdmConyugue;
  dialogTitle: string;
  action: string;
  EstadoCivilTypologies: AdmTypology;
  ProfesionTypologies: AdmTypology;
  title;

  constructor
  (
    public matDialogRef: MatDialogRef<AsociadosConyuguesFormComponent>,
    private typologyService: TypologiesService,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private f_progressBar: FuseProgressBarService,
  )
  { 
    this.title = _data.title;
    this.fiador  = (this._data.fiador) ? this._data.fiador :  new AdmConyugue();
    this.dialogTitle  = (_data.beneficiary) ? `Editar datos de ${this.title}` : `Agregar Nuevo(a) ${this.title}` ;
    this.action       = (this._data.fiador) ? 'edit' :  'new';
    this.EstadoCivilTypologies    =   new AdmTypology();
    this.ProfesionTypologies     =   new AdmTypology(); 
    //this.parentezcosTypologies =  new AdmTypology();
    this.load_typologies();
  }

  ngOnInit(): void {
  }

  async load_typologies() {
    this.EstadoCivilTypologies    = await this.typologyService.getTypology(env.ESTADO_CIVIL_TYPOLOGIES);
    this.ProfesionTypologies      = await this.typologyService.getTypology(env.PROFESIONES_TYPOLOGIES);
  }
  closeDigalog(){
    this.matDialogRef.close(this.fiador);
  }

}
