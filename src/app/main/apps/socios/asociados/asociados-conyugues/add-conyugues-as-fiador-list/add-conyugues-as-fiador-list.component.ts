import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdmConyugue, ConyugueAsFiador } from '../AdmConyugues';
import { ConyuguesService } from '../conyugues-service';

@Component({
  selector: 'app-add-conyugues-as-fiador-list',
  templateUrl: './add-conyugues-as-fiador-list.component.html',
  styleUrls: ['./add-conyugues-as-fiador-list.component.scss']
})
export class AddConyuguesAsFiadorListComponent implements OnInit {

  personKey;
  conyugues: AdmConyugue[] = [];

  newFiador: ConyugueAsFiador;

  constructor(
    public matDialogRef: MatDialogRef<AddConyuguesAsFiadorListComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private conyuguesService: ConyuguesService
    

  ) {

    this.personKey =  (data.personKey) ? data.personKey  : 'null';
    this.newFiador = new ConyugueAsFiador();
   }

  ngOnInit(): void {
    this.load_conyugues();
  }
  load_conyugues(){
    this.conyuguesService.get_conyugues_list(this.personKey, false, false)
      .then( data => {
         this.conyugues = data as AdmConyugue[];
      });
  }

  closeDigalog(){
    this.matDialogRef.close(this.newFiador);
  }

}
