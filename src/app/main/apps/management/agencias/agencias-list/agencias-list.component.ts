import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { UtilsService } from 'app/core/services/utils.service';
import {environment  as env } from 'environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdmAgencias } from '../AdmAgencia';
import { AgenciasFormComponent } from '../agencias-form/agencias-form.component';
import { AgenciasComponent } from '../agencias.component';
import { AgenciasService } from '../agencias.service';



@Component({
  selector: 'app-agencias-list',
  templateUrl: './agencias-list.component.html',
  styleUrls: ['./agencias-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class AgenciasListComponent implements OnInit {
  
  displayedColumns: string[] = ['name','address', 'state_city','status', 'actions'];
  dataSource = new MatTableDataSource<AdmAgencias>([]);
  env = env;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  $destroy: Subject<any>;
  Agencias:AdmAgencias[]=[]


  constructor(
    private agenciasService: AgenciasService,
    private utilsService: UtilsService,
    private matDialog: MatDialog
  )
  {
    this.$destroy = new Subject();
  }

  ngOnInit(): void {
    this.agenciasService.OnAgenciasFilterChange
    .pipe(takeUntil(this.$destroy))
    .subscribe(
      agencias => { this.Agencias = agencias },
      error => { this.utilsService.openSnackBar(error)
    })
  }


  agencias_edit(agencia: AdmAgencias){

    const dialogRef = this.matDialog.open(AgenciasFormComponent, {
      width: '60%',
      data      : {
          action: 'edit',
          agencia
      }
    })

    dialogRef.afterClosed()
            .subscribe( async (_agencia : AdmAgencias) => {
                if ( !_agencia )
                {
                    return;
                }
                //console.log(_asociacion);
                const result = await this.agenciasService.update_agencia(_agencia)
                this.utilsService.openSnackBar(result)
          
            });

  }


  ngOnDestroy(): void { 
    this.$destroy.next();
    this.$destroy.complete();
  }

}
