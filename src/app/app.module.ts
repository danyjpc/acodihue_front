import {NgModule, LOCALE_ID, APP_INITIALIZER} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';

//extras

import {JwtModule} from '@auth0/angular-jwt';
import localeEs from '@angular/common/locales/es-GT';
import {LocationStrategy, PathLocationStrategy, registerLocaleData} from '@angular/common';
import {Interceptor} from './core/interceptor.interceptor';
import { AuthGuard } from './core/guards/auth.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';



//routes
registerLocaleData(localeEs, 'es');

// tslint:disable-next-line: typedef
export function tokenGetter() {
    try {
        const session = JSON.parse(sessionStorage.getItem('session'));
        return session !== null ? session['token'] : '';

    } catch (error) {
        return null;
    }

}

const appRoutes: Routes = [

    {
        path: 'pages',
        loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule),
        
    },
    {
        path: 'profile',
        loadChildren: () => import('./main/apps/profile-page/profile-page.module').then(m => m.ProfilePageModule),
        
    },
    {
        path: 'management',
        loadChildren: () => import('./main/apps/management/management.module').then(m => m.ManagementModule),
        
    },
    {
        path: 'associate',
        loadChildren: () => import('./main/apps/socios/socios.module').then(m => m.SociosModule),
        
    },
    {
        path: 'accounts',
        loadChildren: () => import('./main/apps/accounts/accounts.module').then(m => m.AccountsModule),
        
    },
    {
        path: 'search',
        loadChildren: () => import('./main/apps/global-search/global-search.module').then(m => m.GlobalSearchModule),
        
    },
    {
        path: 'operations',
        loadChildren: () => import('./main/apps/operations/operations.module').then(m => m.OperationsModule),
        
    },
    {
        path: 'credit',
        loadChildren: () => import('./main/apps/credits/credits.module').then(m => m.CreditsModule)
        
    },
    {
        path      : '',
        redirectTo: 'sample',
        pathMatch: 'full',

    },
    {
        path      : 'logout',
        redirectTo: 'sample',
        pathMatch: 'full',

    }
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, {useHash: true}),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        MatSnackBarModule,
        MatDialogModule,

        //jwt
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter
            }
        })
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'es'},
        
        {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},
        {
            provide: LOCALE_ID,
            useValue: 'es',
        },

        Location, {provide: LocationStrategy, useClass: PathLocationStrategy}
    ]
})
export class AppModule
{
}
