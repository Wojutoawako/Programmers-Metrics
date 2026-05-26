import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GITLAB_API_URL } from '../../core/tokens/gitlab-api-url.token';
import { finalize, map, Observable } from 'rxjs';
import { IGitlabTokenResponse } from '../../core/models/gitlab-token-response.model';

@Injectable()
export class GitLabService {
    private gitlabUrl = inject(GITLAB_API_URL);
    private http = inject(HttpClient);
    private readonly OAuthUrl = 'https://gitlab.com/oauth/token';

    private getRedirectUri(): string {
        return `${window.location.origin}/auth/callback`;
    }

    private getToken(): string | null {
        return localStorage.getItem('gitlab_token');
    }

    private getHeaders(): HttpHeaders {
        const token = this.getToken();

        return new HttpHeaders({
                Authorization: `Bearer ${token}`,
            });
    }

    public getUser() {
        return this.http.get(`${this.gitlabUrl}/user`, { headers: this.getHeaders() });
    }

    public exchangeCode(code: string): Observable<IGitlabTokenResponse> {
        const redirectUri = this.getRedirectUri();
        return this.http.post<IGitlabTokenResponse>(this.OAuthUrl, {
            client_id: '8021138b8758fc5204a816d4189726b4a4d825599798f2720352008b10dc4abc',
            client_secret: 'gloas-efffc44a8037407f08370172a12a8200c71b0890c2ba803226fc6671aaa60ffe',
            code,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri,
        });
    }

    public getUsersProjects<T>(): Observable<T> {
        return this.http.get<T>(`${this.gitlabUrl}/projects/?membership=true`,
            {
                headers: this.getHeaders(),
            },
        );
    }

    public getProjectMembers<T>(id: number): Observable<T> {
        return this.http.get<T>(`${this.gitlabUrl}/projects/${id}/members`,
            {
                headers: this.getHeaders(),
            },
        ).pipe(
            map((some) => {
                console.log(`members ${id}`);
                return some;
            }),
        );
    }

    public getProjectCommits<T>(id: number, author: string,
        since: Date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        until: Date = new Date(Date.now())): Observable<T>
    {
        const httpParams = new HttpParams()
            .appendAll({
                ['author']: author,
                ['since']: since.toISOString(),
                ['until']: until.toISOString(),
            });

        return this.http.get<T>(`${this.gitlabUrl}/projects/${id}/repository/commits`,
            {
                headers: this.getHeaders(),
                params: httpParams,
            },
        ).pipe(
            map((some) => {
                console.log(`commits for ${id} by ${author}`);
                return some;
            }),
        );
    }
}
