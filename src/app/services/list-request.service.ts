import { inject, Injectable } from '@angular/core';
import { Gitlab } from './gitlab';
import { concatAll, map, mergeAll, Observable } from 'rxjs';
import { IProgrammerData } from '../interfaces/programmer-data.interface';
import { ICommitInfo } from '../interfaces/commit-info.interface';

@Injectable({
    providedIn: 'root',
})
export class ListRequestService {
    private gitLabAPI: Gitlab = inject(Gitlab);

    private _comparisonList: string[] = [];

    /**Извлекает всех участников проектов, членом которых является данный пользователь. */
    public getUsers(): Observable<IProgrammerData[]> {
        return this.gitLabAPI.getUsersProjects<{id: number}[]>().pipe(
            /**Для каждого ID проекта получаем его участников */
            map(projects => projects.map(project => {
                return this.gitLabAPI.getProjectMembers<IProgrammerData[]>(project.id).pipe(
                    /**Собираем коммиты пользователя в текущем проекте */
                    map(users => users.map(user => {
                        this.gitLabAPI.getProjectCommits<ICommitInfo[]>(project.id, user.username).subscribe({
                            next: commits => user.commits = commits,
                        });
                        return user;
                    })),
                );
            })),
            concatAll(),
            mergeAll(),
        );
    }

    /**Development only.
     * Полезно для того, чтобы смотреть на список из нескольких пользователей
     */
    public getUsersTest(): Observable<IProgrammerData[]> {
        return this.gitLabAPI.getUsers<IProgrammerData[]>();
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
