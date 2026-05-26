import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page.component/login-page.component';
import { CallbackComponent } from './pages/callback.component/callback.component';
import { ProgrammersList } from './pages/programmers-list/programmers-list';
import { authGuard } from './guards/auth-guard';
import { authRedirectGuard } from './guards/auth-redirect-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        component: LoginPageComponent,
    },
    {
        path: 'auth/callback',
        component: CallbackComponent,
        canActivate: [authRedirectGuard],
    },
    {
        path: 'list',
        component: ProgrammersList,
        canActivate: [authGuard],
    },
];

