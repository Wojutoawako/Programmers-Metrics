import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GitLabService } from './services/gitlab-request/gitlab-request.service';
import { GITLAB_API_URL } from './core/tokens/gitlab-api-url.token';

@Component({
    standalone: true,
    selector: 'app-root',
    imports: [RouterOutlet],
    providers: [GitLabService,
        { provide: GITLAB_API_URL, useValue: 'https://gitlab.com/api/v4' }
    ],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
}
