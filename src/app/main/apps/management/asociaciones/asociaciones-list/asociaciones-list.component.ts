import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UtilsService } from 'app/core/services/utils.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AsociacionesService } from '../asociaciones.service';
import {AdmAsociacion} from '../AdmAsociacion'
import {environment  as env } from 'environments/environment';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { AsociacionesFormComponent } from '../asociaciones-form/asociaciones-form.component';

@Component({
  selector: 'app-asociaciones-list',
  templateUrl: './asociaciones-list.component.html',
  styleUrls: ['./asociaciones-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class AsociacionesListComponent implements OnInit {

  env = env;
  // -- Angular Material Tables
  displayedColumns: string[] = ['name', 'status', 'contact','interes_rate', 'actions'];
  dataSource = new MatTableDataSource<AdmAsociacion>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // --

  
  $destroy: Subject<any>;
  Asociaciones:AdmAsociacion[]=[]
  constructor
  (
    private asociacionesService: AsociacionesService,
    private utilsService: UtilsService,
    private matDialog: MatDialog
  ) { 
    this.$destroy = new Subject();
  }

  ngOnInit(): void {

    // listar asociaciones
    
    this.asociacionesService.OnAsociacionesFilterChange
        .pipe(takeUntil(this.$destroy))
        .subscribe(
          asociaciones => { this.Asociaciones = asociaciones },
          error => { this.utilsService.openSnackBar(error)
        })
  }

  asociacion_edit(asociacion: AdmAsociacion){

    const dialogRef = this.matDialog.open(AsociacionesFormComponent, {
      width: '60%',
      data      : {
          action: 'edit',
          asociacion
      }
    })

    dialogRef.afterClosed()
            .subscribe( async (_asociacion : AdmAsociacion) => {
                if ( !_asociacion )
                {
                    return;
                }
                //console.log(_asociacion);
                const result = await this.asociacionesService.update_asociacion(_asociacion)
                this.utilsService.openSnackBar(result)
          
            });

  }



  ngOnDestroy(): void { 
    this.$destroy.next();
    this.$destroy.complete();
  }

}
