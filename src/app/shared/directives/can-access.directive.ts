import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef, OnDestroy } from '@angular/core';
// import { AdmUser } from '../../main/apps/users/AdmUser';
import { AuthService } from '../../core/services/auth.service';



@Directive({
  selector: '[appCanAccess]'
})
export class CanAccessDirective    {
  
  // admUser : AdmUser

  constructor(
    private element: ElementRef,
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
    private _auth: AuthService) { 
    
      element.nativeElement.style.color ="red";
    }
   
    @Input() set appCanAccess(count: number[]) {
      this._auth.getRole().then(role => {
        console.log(role);
        if (count && count.indexOf(role) === -1) {
          this._viewContainer.clear();
        }
        else {
          this._viewContainer.createEmbeddedView(this._templateRef);
          
        }

      })
    
  
     }

}
