import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-asociados-sidebar',
  templateUrl: './asociados-sidebar.component.html',
  styleUrls: ['./asociados-sidebar.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class AsociadosSidebarComponent implements OnInit {

  ProfileSidebarMenu = [ 
    {
      'id'    : 0,
      'handle': 'personal-info',
      'title' : 'General',
      'icon'  : 'person',
      
    },
    {
      'id'    : 1,
      'handle': 'address',
      'title' : 'Direcciones de Contacto',
      'icon'  : 'map'
    },
    {
      'id'    : 2,
      'handle': 'phones',
      'title' : 'Teléfonos de contacto',
      'icon'  : 'call'
    },
    {
      'id'    : 3,
      'handle': 'conyugues',
      'title' : 'Conyugues',
      'icon'  : 'perm_identity'
    },
    {
      'id'    : 4,
      'handle': 'beneficiarios',
      'title' : 'Beneficiarios',
      'icon'  : 'face'
    },
    {
      'id'    : 5,
      'handle': 'documentos',
      'title' : 'Documentos / Scanners',
      'icon'  : 'description'
    },
    {
      'id'    : 6,
      'handle': 'cuentas',
      'title' : 'Cuentas de Ahorro',
      'icon'  : 'account_balance'
    },
    {
      'id'    : 7,
      'handle': 'cotizaciones',
      'title' : 'Cotizaciónes de Crédito',
      'icon'  : 'ballot'
    },
    {
      'id'    : 8,
      'handle': 'creditos',
      'title' : 'Créditos',
      'icon'  : 'attach_money'
    },
    {
      'id'    : 9,
      'handle': 'asociaciones',
      'title' : 'Asociaciones Del Asociado',
      'icon'  : 'ballot'
    },


  ]


  baseRoutePath: string;
  $destroy: Subject<any>;
  personKey: string;

  constructor
  (
    private _fuseSplashService: FuseSplashScreenService,
    private router: ActivatedRoute,
  ) 
  { 
    this.$destroy = new Subject();

    this.personKey = (this.router.snapshot.params.personKey) ? this.router.snapshot.params.personKey  : 'null';
    this.baseRoutePath = `/associate/profile/${this.personKey}/`;
  }

  ngOnInit(): void {
    //this.get_person_key();
  }

  get_person_key(){

    
    this.router.params 
        .pipe(takeUntil(this.$destroy)) 
        .subscribe( params => {
          this.personKey = (params.personKey) ? params.personKey : '000-00'
          this.baseRoutePath = `/associate/profile/${this.personKey}/`
        })
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$destroy.next();
    this.$destroy.complete();
  }

}
