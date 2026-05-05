import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page.component/login-page.component';
import { CallbackComponent } from './pages/callback.component/callback.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginPageComponent,
    },
    {
        path: 'auth/callback',
        component: CallbackComponent,
    }
];

