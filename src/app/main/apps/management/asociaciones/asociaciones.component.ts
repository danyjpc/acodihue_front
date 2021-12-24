import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { UtilsService } from 'app/core/services/utils.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { AdmAsociacion } from './AdmAsociacion';
import { AsociacionesFormComponent } from './asociaciones-form/asociaciones-form.component';
import {AsociacionesService} from './asociaciones.service'

@Component({
  selector: 'app-asociaciones',
  templateUrl: './asociaciones.component.html',
  styleUrls: ['./asociaciones.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class AsociacionesComponent implements OnInit {

  dialogRef: any;
  searchInput: FormControl;
  asociaciones: AdmAsociacion[];
  filterAsociaciones: AdmAsociacion[];

  private _unsubscribeAll: Subject<any>;

  constructor( 
    private asociacionesService: AsociacionesService,
    private _matDialog: MatDialog,
    private utilsService : UtilsService,
    
  ) 
  {
    this.searchInput = new FormControl('');
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    //call asociations 
    this.asociacionesService.listar_asociaciones();

    this.searchFunction();
    
  }

  newAsociation(): void {
    this.dialogRef = this._matDialog.open(AsociacionesFormComponent, {
      width: '60%',
      data      : {
          action: 'new'
      }
  });

  this.dialogRef.afterClosed()
      .subscribe( async (_asociacion : AdmAsociacion) => {
          if ( !_asociacion )
          {
              return;
          }
          //console.log(_asociacion);
          try {
            const result = await this.asociacionesService.create_new_asociacion(_asociacion)
            this.utilsService.openSnackBar(result)
       
          } catch (error) {
            this.utilsService.openSnackBar(error)

          }

      });

  }


  searchFunction(){
    //subscribe for all asociaciones

    this.asociacionesService.OnAsociacionesListaChange
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe( asociaciones => {
           this.asociacionesService.OnAsociacionesFilterChange.next(asociaciones)
           this.asociaciones = [...asociaciones];
          })

    this.searchInput.valueChanges
          .pipe(
              takeUntil(this._unsubscribeAll),
              debounceTime(300),
              distinctUntilChanged()
          )
          .subscribe(searchText => {
                if (!searchText) { 
                  this.asociacionesService.OnAsociacionesFilterChange.next(this.asociaciones)
                }
                else {
                  console.log('filter');
                  const filterAsociaciones = FuseUtils.filterArrayByString(this.asociaciones, searchText);
                  this.asociacionesService.OnAsociacionesFilterChange.next(filterAsociaciones)
                  

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
