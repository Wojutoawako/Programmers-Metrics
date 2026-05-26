import { inject, Injectable } from '@angular/core';
import { combineLatestAll, exhaustAll, exhaustMap, Observable } from 'rxjs';
import { GitLabService } from '../gitlab-request/gitlab-request.service';
import { IProgrammerData } from '../../interfaces/programmer-data.interface';
import { ICommitInfo } from '../../interfaces/commit-info.interface';

@Injectable()
export class ListRequestService {
    private gitLabAPI: GitLabService = inject(GitLabService);

    private _comparisonList: string[] = [];

    /**Извлекает всех участников проектов, членом которых является данный пользователь. */
    public getUsers(): Observable<IProgrammerData[]> {
        const projects$ = this.gitLabAPI.getUsersProjects<{id: number}[]>();
        const users$ = projects$.pipe(
            exhaustAll(),
            exhaustMap(project =>
                this.gitLabAPI.getProjectMembers<IProgrammerData[]>(project.id),
            ),
            combineLatestAll(),
        );

        return users$;
    }

    /**Добавляет псевдоним пользователя в список для сравнения */
    public addUserToComparison(username: string) {
        this._comparisonList.push(username);
    }

    /**Удаляет пользователя по псевдониму из списка сравнения */
    public removeUserFromComparison(username: string) {
        this._comparisonList = this._comparisonList.filter(un => un !== username);
    }
}
