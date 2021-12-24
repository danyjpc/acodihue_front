import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { UtilsService } from './utils.service';

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';
const USER_DATA = 'user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authenticated: boolean;

  public userData = new BehaviorSubject(null);

  constructor(public jwtHelper: JwtHelperService,
              private api: ApiService,
              private router: Router,
              private _utils: UtilsService) { 
              this.authenticated = this.isAuthenticated()
    }

  public isAuthenticated(token?): boolean {
    
    try {
      const session = JSON.parse(sessionStorage.getItem('session'));
      if (session && !this.jwtHelper.isTokenExpired(session['token'])) {
        
        const decoded = helper.decodeToken(session['token']);
        console.log(decoded);
        sessionStorage.setItem('user', JSON.stringify(decoded));
        const data = decoded as UserData;
        this.userData.next(data);
        return true;
      }
      else {
        return false;
      }

    } catch (error) {
      return false;
    }
  }


  // tslint:disable-next-line: typedef
  async getUser(): Promise<any> {

   await this.userData.subscribe(data => {
      return data as UserData;
    });
  }

  // tslint:disable-next-line: typedef
  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.userData.next(null);
    this.userData.complete();
    this.router.navigateByUrl('/pages/auth/login');

  }


  getUserLogued(): UserData {
    const session = JSON.parse(sessionStorage.getItem('session'));
    const data = (helper.decodeToken(session['token'])) as UserData;
    return data;
  }

  public async  getRole()  {
    if (!this.authenticated) {
      return null;
    } 
    else {
      try {
        const role =   JSON.parse(localStorage.getItem('user'))['role']
        return role
      } catch (error) {
        return null
      }  
    }
  }

}

export  class UserData {
  email: string = 'S/D';
  person_key: '000-000-0-00';
  role: 160000;
}
