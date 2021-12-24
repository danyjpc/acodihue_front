import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(public auth: AuthService, private router: Router) { }
  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/sample']);
      return false;
    }
    return true;
  }
}
