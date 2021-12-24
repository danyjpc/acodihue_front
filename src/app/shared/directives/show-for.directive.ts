import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { environment as env} from '../../../environments/environment.dev';

@Directive({
  selector: '[showFor]'
})
export class ShowForDirective    {
  
  count : number[]
  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
    private _auth: AuthService) { 

    }
   
    @Input() set showFor(role: string) {
      

      switch (role) {
          case 'sudo':
              this.count = [env.DEFAULT_ROLE_AMINISTRATOR]
              this.aplyDirective(this.count);
              break;
        //   case 'digitors': 
        //   this.count = [this.env.DEFAULT_ADMIN_ROLE, this.env.ROLE_SUPER_DIGITOR, this.env.ROLE_DIGITOR]
        //       this.aplyDirective(this.count);
        //       break;
          case 'dentista':
            this.count = [env.DEFAULT_ROLE_AMINISTRATOR]
              this.aplyDirective(this.count);
              break
        //   case 'all': 
        //       this.count = [this.env.DEFAULT_ADMIN_ROLE, this.env.ROLE_DIGITOR, this.env.ROLE_SUPER_DIGITOR, this.env.ROLE_GESTION_ADMON]
        //       this.aplyDirective(this.count);
          default:
              break;
      }


  
     }

    private aplyDirective(count){ 
      this._auth.getRole().then(role => {

        if (count && count.indexOf(role) === -1) {
          this._viewContainer.clear();
        }
        else {
          this._viewContainer.createEmbeddedView(this._templateRef);
          
        }

      })
    
     }

}
