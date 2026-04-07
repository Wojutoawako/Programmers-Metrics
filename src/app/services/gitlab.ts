import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class Gitlab {
    private http: HttpClient = inject(HttpClient);

    private static readonly apiURL = 'https://gitlab.com/api/v4';

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('gitlab_token');

        return new HttpHeaders({
            'Authorization': `Bearer ${token}` || '',
        });
    }

    public getCurrentUser<T>(): Observable<T> {
        return this.http.get<T>(`${Gitlab.apiURL}/user`, 
            {
                headers: this.getHeaders(),
            },
        );
    }

    public getUsersProjects<T>(): Observable<T> {
        return this.http.get<T>(`${Gitlab.apiURL}/projects/?membership=true`, 
            {
                headers: this.getHeaders(), 
            },
        );
    }

    public getProjectMembers<T>(id: number): Observable<T> {
        return this.http.get<T>(`${Gitlab.apiURL}/projects/${id}/members`, 
            {
                headers: this.getHeaders(),
            },
        );
    }

    public getProjectCommits<T>(id: number, author: string,
    since: Date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    until: Date = new Date(Date.now())): Observable<T>
    {
        const httpParams: HttpParams = new HttpParams();
        httpParams.appendAll({
            ['author']: author,
            ['since']: since.toISOString(),
            ['until']: until.toISOString(),
        });

        return this.http.get<T>(`${Gitlab.apiURL}/projects/${id}/repository/commits`,
            {
                headers: this.getHeaders(),
                params: httpParams,
            },
        );
    }

    public getGroups<T>(): Observable<T> {
        return this.http.get<T>(`${Gitlab.apiURL}/groups`, 
            {
                headers: this.getHeaders(),
            },
        );
    }

    public getGroupMembers<T>(groupID: number): Observable<T> {
        return this.http.get<T>(`${Gitlab.apiURL}/groups/${groupID}/members`, 
            {
                headers: this.getHeaders(),
            },
        );
    }

    /** Development only */
    public getUsers<T>(): Observable<T> {
        return this.http.get<T>(`${Gitlab.apiURL}/users/`, 
            {
                headers: this.getHeaders(),
            },
        );
    }
}
