import { Component, inject } from '@angular/core';
import { GitLabService } from '../../services/gitlab-request/gitlab-request.service';
import { take } from 'rxjs';

@Component({
    selector: 'app-callback',
    imports: [],
    templateUrl: './callback.component.html',
    styleUrl: './callback.component.css',
})
export class CallbackComponent {
    private gitlab: GitLabService = inject(GitLabService)
    ngOnInit() {

        const code = new URLSearchParams(window.location.search).get('code');
        
        if (code) {
            this.gitlab.exchangeCode(code).subscribe({
                next: (res: any) => {
                console.log('TOKEN RESPONSE:', res);

                localStorage.setItem('gitlab_token', res.access_token);
                },
                error: (err) => {
                    console.error('OAUTH ERROR:', err);
                }
            });
        }
    }

    public testApi() {
        this.gitlab.getUser().pipe(take(1)).subscribe(res => {
            console.log('USER DATA:', res)
        });
    }
}
