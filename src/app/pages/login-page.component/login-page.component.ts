import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GitLabService } from '../../services/gitlab-request/gitlab-request.service';
import { take } from 'rxjs';
@Component({
    selector: 'app-auth',
    imports: [FormsModule, 
        MatFormFieldModule, 
        MatInputModule,
        RouterModule],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
    public token: string = '';
    public signInToken(): void {
        localStorage.setItem('gitlab_token', this.token);
    }

    public loginWithGitLab(): void {
        const clientId = '8021138b8758fc5204a816d4189726b4a4d825599798f2720352008b10dc4abc';
        const redirectUri = 'http://localhost:4200/auth/callback';

        const url = 
            `https://gitlab.com/oauth/authorize` +
            `?client_id=${clientId}` +
            `&redirect_uri=${redirectUri}` +
            `&response_type=code` +
            `&scope=read_user api`;

        window.location.href = url;
    }
}
