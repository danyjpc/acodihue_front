import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { AdmCredit } from '../AdmCredit';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CreditService } from '../credit-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterCreditsSociosService } from 'app/shared/utils-components/filter-credits-socios-form/filter-credit-socios-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-credis-list',
  templateUrl: './credis-list.component.html',
  styleUrls: ['./credis-list.component.scss']
})
export class CredisListComponent implements OnInit {
  
  @Input()creditsBySocio = false;
  credits: AdmCredit[] = [];

  displayedColumns: string[] = ['id', 'agency', 'status', 'actions'];
  dataSource: MatTableDataSource<AdmCredit>;
  unsuscribe: Subject<any>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private creditService: CreditService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private filterCreditSocios: FilterCreditsSociosService
  ) { 
    this.dataSource = new MatTableDataSource([]);
    this.unsuscribe =  new Subject();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadCredits();
    this.suscribeCreditsData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadCredits(){
    const personKey = (this.creditsBySocio) ?  this.activateRoute.snapshot.params.personKey : 'null'
    this.creditService.list_credits(personKey)
  }

  suscribeCreditsData(){
    this.filterCreditSocios.OnListadoCreditsChange
        .pipe(takeUntil(this.unsuscribe))
        .subscribe(credits => {
          this.credits =  credits;
          this.dataSource.data = credits;
  
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
  }



  credit_details(credit: AdmCredit){
    const url = `/credit/details/${credit.creditKey}/check-list/${credit.calculator.person.personKey}`;
    this.router.navigateByUrl(url);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsuscribe.next();
    this.unsuscribe.complete();
  }

}
