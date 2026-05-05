import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GITLAB_API_URL } from '../../core/tokens/gitlab-api-url.token';
import { Observable } from 'rxjs';
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
    
    private getHeaders(): { headers: HttpHeaders } {
        const token = this.getToken();

        return {
            headers: new HttpHeaders({
                Authorization: `Bearer ${token}`
            })
        };
    }

    public getUser() {
        return this.http.get(`${this.gitlabUrl}/user`, this.getHeaders());
    }

    public exchangeCode(code: string): Observable<IGitlabTokenResponse> {
        const redirectUri = this.getRedirectUri();
        return this.http.post<IGitlabTokenResponse>(this.OAuthUrl, {
            client_id: '8021138b8758fc5204a816d4189726b4a4d825599798f2720352008b10dc4abc',
            client_secret: 'gloas-efffc44a8037407f08370172a12a8200c71b0890c2ba803226fc6671aaa60ffe',
            code,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri
        });
    }
}
