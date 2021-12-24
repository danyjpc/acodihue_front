import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AgenciasFormComponent } from 'app/main/apps/management/agencias/agencias-form/agencias-form.component';
import { TypologiesService } from 'app/main/apps/management/typologies/typologies.service';
import { AdmAddress } from 'app/shared/adm-models/AdmAddress';
import { AdmTypology } from 'app/shared/adm-models/AdmTypology';
import { environment as env } from 'environments/environment';

@Component({
  selector: 'app-asociados-address-form',
  templateUrl: './asociados-address-form.component.html',
  styleUrls: ['./asociados-address-form.component.scss']
})
export class AsociadosAddressFormComponent implements OnInit {

  address: AdmAddress;
  dialogTitle: string; 
  departamentosTypologies: AdmTypology;
  municipiosTypologies: AdmTypology;
  action: string = 'new';

  constructor
  (
    public matDialogRef: MatDialogRef<AsociadosAddressFormComponent>,
    private typologyService: TypologiesService,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private f_progressBar: FuseProgressBarService,
  ) 
  {
    this.address      = (_data.address) ? _data.address :  new AdmAddress();
    this.dialogTitle  = (_data.address) ? 'Editar Dirección' : 'Agregr Nueva Dirección' ;
    this.action       = (_data.address) ? 'edit' :  'new';

    this.departamentosTypologies =  new AdmTypology();
    this.municipiosTypologies = new AdmTypology();
  }

  ngOnInit(): void {
    this.load_typologies();
  }

  closeDigalog(){
    this.matDialogRef.close(this.address);
  }

  async load_typologies(){
    this.departamentosTypologies = await this.typologyService.getTypology(env.DEFAULT_PAIS_TYPOLOGY);
    const _typology = (this.action === 'edit') ? this.address.state.typologyId : env.DEFAULT_DEPARTAMENTO_TYPOLOGY;
    this.municipiosTypologies   = await this.typologyService.getTypology(_typology)
  }

  async loadNewMunicipios(event) {
    this.municipiosTypologies = await this.typologyService.getTypology(event.value);  
  }

}
