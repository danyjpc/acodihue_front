import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-credits-sidebar',
  templateUrl: './credits-sidebar.component.html',
  styleUrls: ['./credits-sidebar.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class CreditsSidebarComponent implements OnInit {

  ProfileSidebarMenu = [ 
    {
      'id'    : 0,
      'handle': 'check-list',
      'title' : 'Chequeo de Lista',
      'icon'  : 'fact_check',
      
    },
    {
      'id'    : 1,
      'handle': 'associate-info',
      'title' : 'Datos del Asociado',
      'icon'  : 'person'
    },
    {
      'id'    : 2,
      'handle': 'fiadores',
      'title' : 'Fiadores',
      'icon'  : 'person'
    },
    {
      'id'    : 3,
      'handle': 'references',
      'title' : 'Referencias',
      'icon'  : 'perm_identity'
    },
    {
      'id'    : 4,
      'handle': 'address',
      'title' : 'Direcciones',
      'icon'  : 'map'
    },
    {
      'id'    : 5,
      'handle': 'activities',
      'title' : 'Destino del crédito',
      'icon'  : 'description'
    },
    {
      'id'    : 6,
      'handle': 'guarantees',
      'title' : 'Avaluos',
      'icon'  : 'account_balance'
    },
    {
      'id'    : 7,
      'handle': 'patrimonial-status',
      'title' : 'Estado patrimonial',
      'icon'  : 'ballot'
    },
    {
      'id'    : 8,
      'handle': 'income-expenses',
      'title' : 'Ingresos y egresos',
      'icon'  : 'ballot'
    },
    {
      'id'    : 9,
      'handle': 'documents',
      'title' : 'Scanners',
      'icon'  : 'ballot'
    },
  ]

  baseRoutePath: string;
  $destroy: Subject<any>;
  creditKey: string;
  personKey: string;

  routerLink: string;

  constructor
  (
    private _fuseSplashService: FuseSplashScreenService,
    private router: ActivatedRoute,
  ) 
  { 
    this.$destroy = new Subject();
    this.personKey = (this.router.snapshot.params.personKey) ? this.router.snapshot.params.personKey  : 'null';  
    this.creditKey = (this.router.snapshot.params.creditKey) ? this.router.snapshot.params.creditKey  : 'null';
    this.baseRoutePath = `/credit/details/${this.creditKey}/`;
  }

  ngOnInit(): void {
    //this.get_person_key();
  }

  get_person_key(){

    
    this.router.params 
        .pipe(takeUntil(this.$destroy)) 
        .subscribe( params => {
          this.creditKey = (params.creditKey) ? params.creditKey : '000-00'
          this.baseRoutePath = `/credit/details/${this.creditKey}/`;
        })
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$destroy.next();
    this.$destroy.complete();
  }

}
