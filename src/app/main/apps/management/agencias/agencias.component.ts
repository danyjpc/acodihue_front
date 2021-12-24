import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'app/core/services/utils.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import {AdmAgencias} from './AdmAgencia';
import {AgenciasService} from './agencias.service';
import  {FuseUtils} from '@fuse/utils'
import { AgenciasFormComponent } from './agencias-form/agencias-form.component';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-agencias',
  templateUrl: './agencias.component.html',
  styleUrls: ['./agencias.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class AgenciasComponent implements OnInit {

  dialogRef: any;
  searchInput: FormControl;
  agencias: AdmAgencias[];
  filterAgencies: AdmAgencias[];

  private _unsubscribeAll: Subject<any>;

  constructor(
    private agenciasService: AgenciasService,
    private _matDialog: MatDialog,
    private utilsService : UtilsService,
  ) 
  {
    this.searchInput = new FormControl('');
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.agenciasService.listar_agencias();
    this.searchFunction();
  }

  newAgencia(): void {
    this.dialogRef = this._matDialog.open(AgenciasFormComponent, {
      width: '60%',
      data      : {
          action: 'new'
      }
  });

  this.dialogRef.afterClosed()
      .subscribe( async (_agencia : AdmAgencias) => {
          if ( !_agencia )
          {
              return;
          }
          //console.log(_asociacion);
          try {
            const result = await this.agenciasService.create_new_agencia(_agencia)
            this.utilsService.openSnackBar(result)
       
          } catch (error) {
            this.utilsService.openSnackBar(error)

          }

      });

  }


  searchFunction(){
    //subscribe for all asociaciones

    this.agenciasService.OnAgenciasListaChange
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe( agencias => {
           this.agenciasService.OnAgenciasFilterChange.next(agencias)
           this.agencias = [...agencias];
          })

    this.searchInput.valueChanges
          .pipe(
              takeUntil(this._unsubscribeAll),
              debounceTime(300),
              distinctUntilChanged()
          )
          .subscribe(searchText => {
                if (!searchText) { 
                  this.agenciasService.OnAgenciasFilterChange.next(this.agencias)
                }
                else {
                  console.log('filter');
                  const filterAgencias = FuseUtils.filterArrayByString(this.agencias, searchText);
                  this.agenciasService.OnAgenciasFilterChange.next(filterAgencias)
                  

                }
          });
  }

  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

}
