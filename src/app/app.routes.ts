import { Routes } from '@angular/router';
import { Auth } from './pages/auth/auth';
import { GenerateToken } from './pages/generate-token/generate-token';

export const routes: Routes = [
    {
        path: '',
        component: Auth
    },
    {
        path: 'generate_token',
        component: GenerateToken
    }
];

