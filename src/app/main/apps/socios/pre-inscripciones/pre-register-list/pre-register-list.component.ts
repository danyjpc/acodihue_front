import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdmPreescription } from '../../AdmPreinscriptions';
import {AssociatesService} from '../../Associates.service';
import {FuseUtils} from '@fuse/utils';
import { UtilsService } from 'app/core/services/utils.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FilterCreditsSociosService } from 'app/shared/utils-components/filter-credits-socios-form/filter-credit-socios-service';
import { AddExistingPartnerFormComponent } from 'app/main/apps/credits/group-credits/add-existing-partner-form/add-existing-partner-form.component'; 
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pre-register-list',
  templateUrl: './pre-register-list.component.html',
  styleUrls: ['./pre-register-list.component.scss']
})
export class PreRegisterListComponent implements OnInit {

  displayedColumns: string[] = ['associate', 'agency', 'actions'];
  
  dataSource: MatTableDataSource<AdmPreescription>;

  preinscripciones: AdmPreescription[];
  searchInput: FormControl;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private associateService: AssociatesService,
    private utilsService: UtilsService,
    private fuseSplash: FuseSplashScreenService,
    private router: Router,
    private filterAsociadoCreditService: FilterCreditsSociosService,
    private dialog: MatDialog
  ) { 

    this.dataSource = new MatTableDataSource([]);
    this._unsubscribeAll = new Subject();
    this.searchInput = new FormControl('');


  }

  ngAfterViewInit() {
    this.listar_preinscripciones();
    
  }

  ngOnInit(): void {
    this.searchFunction();

    this.subscribePreiniscriptions();
  }


  async listar_preinscripciones(){
    try {
      this.fuseSplash.show();
      const _data = await this.associateService.listado_preinscripciones();
      this.fuseSplash.hide();

    } catch (error) { 
      this.fuseSplash.hide();
      this.utilsService.openSnackBar(error);
      
    }
  }
  // async listar_preinscripciones(){
  //   try {
  //     this.fuseSplash.show();
  //     const _data = await this.associateService.listado_preinscripciones();
  //     this.preinscripciones = [..._data];
  //     this.dataSource.data = (_data[0]) ? _data : [];
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;

  //     this.fuseSplash.hide();
  //   } catch (error) { 
  //     this.fuseSplash.hide();
  //     this.utilsService.openSnackBar(error);
      
  //   }
  // }

  subscribePreiniscriptions(){
    this.filterAsociadoCreditService.OnListadoSociosChange
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(_data => {
           
            this.preinscripciones = [..._data];
            this.dataSource.data = (_data[0]) ? _data : [];
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
      
            console.log( _data[0])

        })
  }

  load_profile(asociado: AdmPreescription){
    const url = `/associate/profile/${asociado.associate.personKey}/personal-info`;
    this.router.navigateByUrl(url)
  }

  searchFunction(){
    //subscribe for all asociaciones



    this.searchInput.valueChanges
          .pipe(
              takeUntil(this._unsubscribeAll),
              debounceTime(300),
              distinctUntilChanged()
          )
          .subscribe(searchText => {
                if (!searchText) { 
                  this.dataSource.data = this.preinscripciones;
                }
                else {
                  console.log('filter');
                  const filterAgencias = FuseUtils.filterArrayByString(this.preinscripciones, searchText);
                  this.dataSource.data = filterAgencias;
                  

                }
          });
  }

  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  openAddExitingPartnerForm(){
    const dialogRef = this.dialog.open(AddExistingPartnerFormComponent,{
      width :'800px'
    });
  }
}
