import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { UtilsService } from 'app/core/services/utils.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddConyuguesAsFiadorListComponent } from '../add-conyugues-as-fiador-list/add-conyugues-as-fiador-list.component';
import { AdmConyugue, ConyugueAsFiador } from '../AdmConyugues';
import { AsociadosConyuguesFormComponent } from '../asociados-conyugues-form/asociados-conyugues-form.component';
import {ConyuguesService} from '../conyugues-service'

@Component({
  selector: 'app-asociados-conyugues-list',
  templateUrl: './asociados-conyugues-list.component.html',
  styleUrls: ['./asociados-conyugues-list.component.scss']
})
export class AsociadosConyuguesListComponent implements OnInit {
  @Input()creditEneable = false;
  asociateConyugues = [];
  displayedColumns: string[] = ['leader', 'fullName', 'phone', 'hijos', 'actions'] ;
  displayedColumns_fiador: string[] =  ['fullName', 'phone', 'actions'];
  conyuges: AdmConyugue[]=[];

  personKey: string;
  $destroy: Subject<any>


  creditKey: string; 
  title: string = '';

  constructor(
    private conyugueService: ConyuguesService,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private progresBar : FuseProgressBarService,
    private utils: UtilsService
  )
  { 
    this.personKey = (this.route.snapshot.params.personKey) ? this.route.snapshot.params.personKey  : 'null';
    this.$destroy = new Subject();
  }

  ngOnInit(): void {

    this.title =  (this.creditEneable) ? 'Fiador' :  'Conyugue';
    this.get_conyugues_by_type();
  }

  get_conyugues_by_type(){
    if (this.creditEneable) {
      this.creditKey = (this.creditEneable) ? this.route.snapshot.params.creditKey : 'null';
      this.conyugueService.get_conyugues_list(this.creditKey, this.creditEneable);
    }
    else {
      this.conyugueService.get_conyugues_list(this.personKey, this.creditEneable);

    }

    this.conyugueService.OnConyuguesChanged
        .pipe(takeUntil(this.$destroy))
        .subscribe(conyuges =>{
          this.conyuges = conyuges
        })
  }


  create_conyugye(){
    const title  = this.title;
    const dialogRef = this.matDialog.open(AsociadosConyuguesFormComponent, {
      width: '650px',
      data: {title}
    })

    dialogRef.afterClosed()
    .subscribe(fiador => {
      if (!fiador){ 
        return 
      }
      this.new_conyugue(fiador, this.creditEneable)
    })

  
  }

  editar_conyugue(fiador: AdmConyugue){
    const title  = this.title;
    const dialogRef = this.matDialog.open(AsociadosConyuguesFormComponent, {
      width: '650px',
      data: {fiador, title}
    })

    dialogRef.afterClosed()
            .subscribe(fiador => {
              if (!fiador){ 
                return 
              }

              this.actualizar_conyugue(fiador, this.creditEneable)
            })

    
  }


  actualizar_conyugue(conyugue: AdmConyugue, creditEnable){
    const entityKey = (creditEnable) ? this.creditKey :  this.personKey;
    this.conyugueService.update_conyugue(conyugue, entityKey, creditEnable)
        .then(res =>  this.utils.openSnackBar(res))
        .catch(error => this.utils.openSnackBar(error));
  }

  new_conyugue(conyuge: AdmConyugue, creditEnable){
    const entityKey = (creditEnable) ? this.creditKey :  this.personKey;
    this.conyugueService.create_conyugue(conyuge, entityKey, creditEnable)
    .then(res =>  this.utils.openSnackBar(res))
    .catch(error => this.utils.openSnackBar(error));
  }


  add_conyugue_as_fiador(){
      const personKey =   this.personKey;

      const dialogRef = this.matDialog.open(AddConyuguesAsFiadorListComponent, {
        width:  '400px',
        data: {personKey}

      });

      dialogRef.afterClosed().subscribe( (fiador: ConyugueAsFiador) => {
        if (!fiador) {
          return
        }
        this.conyugueService.create_conyugue_as_fiador(fiador, this.creditKey);
      });


  }

}
