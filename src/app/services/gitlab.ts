import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class Gitlab {
    private gitlabUrl = 'https://gitlab.com/api/v4';

    private http = inject(HttpClient)

    private getHeaders(): { headers: HttpHeaders} {
        const token = localStorage.getItem('gitlab_token');

        return {
            headers: new HttpHeaders({'Authorization': `Bearer ${token}` || ""})
        }
    }

    getUser() {
        return this.http.get(`${this.gitlabUrl}/user`, this.getHeaders());
    }
}
