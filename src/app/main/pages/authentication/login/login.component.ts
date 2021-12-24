import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { ApiService } from 'app/core/services/api.service';
import { Router } from '@angular/router';
import { UtilsService } from 'app/core/services/utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */

    type = 'password';

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private api: ApiService,
        private router: Router,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            pwd: ['', Validators.required]
        });
    }

    // tslint:disable-next-line: typedef
    login(){
        this._fuseSplashScreenService.show();
        this.api.loginMethod(this.loginForm.getRawValue()).then(res => {
            // console.log(res);
            const session = {
                expire: res['expire'],
                token:  res['token'].split(' ').pop(),
                usuario_id:   res['person_key']
            };

            sessionStorage.setItem('session', JSON.stringify(session));
            this._fuseSplashScreenService.hide();
            
            this.router.navigate(['sample']);
        }).catch(error => {
            this._fuseSplashScreenService.hide();
            if (error.status === 400) {
                // console.log(error.error);
                // this.utils.errorNotification('El nombre de usuario o contraseña son invalidos, intentelo de nuevo!');
                this._snackBar.open('Opps, el servidor respondió ' +  error.error.message,  'ok', {
                    duration: 2000,
                });
            } else {
                // this.utils.errorNotification('Ocurrio un error inesperado, intenta de nuevo!');
                this._snackBar.open('Ocurrio un error inesperado, intenta de nuevo!, verifique comunicación con el servidor', 'ok', {
                    duration: 2000,
                });
            }

        });
    }

    // tslint:disable-next-line: typedef
    showInput(type?: string){
        
        switch (type) {
            case 'text':
                this.type = 'text'
                break;
            case 'pass':
                this.type = 'password'
                break;
            default:
                break;
        }
    }
}
