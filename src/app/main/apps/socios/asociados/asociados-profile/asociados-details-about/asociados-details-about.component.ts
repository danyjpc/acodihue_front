import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { UtilsService } from 'app/core/services/utils.service';
import { AdmPerson } from 'app/shared/adm-models/AdmPerson';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AssociateManagerService } from '../../AssociateManagerService';

@Component({
  selector: 'app-asociados-details-about',
  templateUrl: './asociados-details-about.component.html',
  styleUrls: ['./asociados-details-about.component.scss']
})
export class AsociadosDetailsAboutComponent implements OnInit {
  _unsubscribe: Subject<any>;
  person : AdmPerson
  constructor(
    private asociateManagerService: AssociateManagerService,
    private utils : UtilsService,
    private f_progressBar: FuseProgressBarService,
    private router: Router,
    
  ) 
  { 
    this.person = new AdmPerson();
    this._unsubscribe = new Subject();
  }

  ngOnInit(): void {

    this.asociateManagerService.OnAssociateChange
        .pipe(takeUntil(this._unsubscribe))
        .subscribe((_person: AdmPerson) => {

          this.person = (_person.personKey) ?  _person : new AdmPerson();
        })
  }


  print_solicitud(){
    const url = `rest/associate/v1/${this.person.personKey}/files/archivo_preinscripcion`;
    this.f_progressBar.show()

    this.utils.exportDocument(url)
          .pipe(takeUntil(this._unsubscribe))
          .subscribe( data => {
            this.f_progressBar.hide();                        
            this.utils.downloadFile(data, 'Solicitud de Ingreso', 'docx');
          },error=>{
            this.f_progressBar.hide();
            this.utils.openSnackBar('Error al descargar el archivo, vuelva a intentarlo')
          })  
          
    
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  goToPerfil(asociateKey: string){
    const url =`/associate/profile/${asociateKey}/personal-info`;
    this.router.navigateByUrl(url)
  }

}
