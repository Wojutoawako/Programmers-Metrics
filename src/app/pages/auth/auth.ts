import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Gitlab } from '../../services/gitlab';
@Component({
    selector: 'app-auth',
    imports: [FormsModule, 
        MatFormFieldModule, 
        MatInputModule,
        RouterModule],
    templateUrl: './auth.html',
    styleUrl: './auth.scss',
})
export class Auth {
    token: string = '';
    signInToken(): void {
        localStorage.setItem('gitlab_token', this.token);
        console.log('Токен сохранен');
    }

    private gitlab = inject(Gitlab);

    testApi() {
        this.gitlab.getUser().subscribe(res => {
            console.log(res);
        });
    }
}
