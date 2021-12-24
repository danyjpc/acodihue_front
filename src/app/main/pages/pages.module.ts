import { NgModule } from '@angular/core';
import {LoginModule} from './authentication/login/login.module';
import {ForgotPasswordModule} from './authentication/forgot-password/forgot-password.module';
import {ResetPasswordModule} from './authentication/reset-password/reset-password.module';


@NgModule({
    imports: [
        // Authentication
        LoginModule,
        ForgotPasswordModule,
        ResetPasswordModule,
    

   
    ]
})
export class PagesModule
{

}
