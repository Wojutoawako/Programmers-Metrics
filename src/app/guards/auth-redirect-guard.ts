import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authRedirectGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);

    const token: string | null = localStorage.getItem('gitlab_token');

    return !token || router.parseUrl('list');
};
