import { Routes } from '@angular/router';
import { Auth } from './pages/auth/auth';
import { GenerateToken } from './pages/generate-token/generate-token';
import { ProgrammersList } from './pages/programmers-list/programmers-list';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
    },
    {
        path: 'generate_token',
        component: GenerateToken,
    },
    {
        path: 'list',
        component: ProgrammersList,
        canActivate: [authGuard],
    },
    {
        path: '401',
        component: Auth,
    },
];

