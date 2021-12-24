import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdmTypology } from '../../../../../shared/adm-models/AdmTypology';
import { TypologiesService } from '../typologies.service';
import { FuseProgressBarService } from '../../../../../../@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {
  parentTypologyId: number;
  typology: AdmTypology;
  tittle: string = '';
  typologyForm: FormGroup;
  _unsubscribe: Subject<any>;
  constructor(public matDialogRef                 : MatDialogRef<DialogFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public formBuilder                  : FormBuilder,
              public typologyService              : TypologiesService, 
              public progresBar                   : FuseProgressBarService,
              public snackBar                     : MatSnackBar) {
                
               if (data.operation === 'edit-typology'){
                 this.tittle   = 'Actualizar Catalogo'
                 this.typology = data.typology;
               } else {
                 this.tittle           = 'Nuevo Catalogo';
                 this.typology         = new AdmTypology();
                 this.typology.parentTypology.typologyId = (data.typology.typologyId !== 0)? data.typology.typologyId : data.typology.parentTypology.typologyId;
               }

               this._unsubscribe = new Subject();
               }

  ngOnInit(): void {
    this.buildTypologyForm();
  }

  buildTypologyForm (){
    this.typologyForm = this.formBuilder.group ({
      typologyName: ['', Validators.required]
    });
  }

  saveTypology( typology: AdmTypology ){

    this.progresBar.show();
    this.matDialogRef.close(typology);

    this.matDialogRef.afterClosed().subscribe(( typology: AdmTypology )=> {
      if (typology.typologyId !== 0){
        this.typologyService.updateChild( typology ).then( result => {
          this.snackBar.open('Registro Actualizado con exito' , 'OK');
          this.progresBar.hide();
        }).catch( error => {
          this.snackBar.open( 'Ocurrio un error al actualizar '+ error, 'OK' );
          this.progresBar.hide();
        });
      } else {
   
        this.typologyService.newChildTypology( this.typology ).then( response => {
          this.snackBar.open('Registro creado con exito', 'OK');
          this.progresBar.hide();
        }).catch( error => {
           this.snackBar.open('Ocurrio un error al crear el nuevo item ' + error, 'OK');
           this.progresBar.hide();
        });
      }
    });
  }

}
