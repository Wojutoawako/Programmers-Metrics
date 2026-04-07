import { Component, inject } from '@angular/core';
import { IProgrammerData } from '../../interfaces/programmer-data.interface';
import { ListRequestService } from '../../services/list-request.service';
import { MatList, MatListItem, MatListItemLine, MatListItemTitle } from '@angular/material/list';
import { MatCard, MatCardActions, MatCardContent, 
    MatCardAvatar, MatCardTitleGroup, MatCardTitle, MatCardSubtitle } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
    selector: 'app-programmers-list',
    imports: [MatList, MatListItem, MatListItemLine, MatListItemTitle,
    MatCard, MatCardActions, MatCardContent,
    MatCardAvatar, MatCardTitleGroup, MatCardTitle, MatCardSubtitle],
    templateUrl: './programmers-list.html',
    styleUrl: './programmers-list.scss',
})
export class ProgrammersList {
    private listRequest: ListRequestService = inject(ListRequestService);
    // private router: Router = inject(Router);
    
    private _programmersList: IProgrammerData[] = [];

    private _displayList: IProgrammerData[] = [];

    public get displayList() {
        return this._displayList;
    }

    private set displayList(value: IProgrammerData[]) {
        this._displayList = value;
    }
    
    constructor() {
        this.listRequest.getUsers().subscribe(users => this._programmersList = users);
        // this.listRequest.getUsersTest().subscribe(users => this._programmersList = users);
        this.displayList = this._programmersList;
    }

    /**Реакция на получение ввода в фильтре по имени */
    public onNameFilterInputChanged(event: Event) {
        const value: string = (event.target as HTMLInputElement).value;

        if (!value) {
            this.displayList = this._programmersList;
        } else {
            this.displayList = this._programmersList.filter(user => {
                return user.name.toLowerCase().includes(value.toLowerCase());
            });
        }
    }

    /**Реакция на нажатие кнопки "Добавить в сравнение" */
    public onAddUserButtonClicked(ev: PointerEvent, username: string) {
        const targetButton = (ev.target as HTMLButtonElement);

        // toggle
        if (targetButton.textContent === 'Добавить в сравнение') {
            targetButton.classList.add('button-active');
            targetButton.textContent = 'Убрать из сравнения';

            this.listRequest.addUserToComparison(username);
        } else {
            targetButton.classList.remove('button-active');
            targetButton.textContent = 'Добавить в сравнение';

            this.listRequest.removeUserFromComparison(username);
        }
    }

    /**Переход на страницу подробным содержанием о пользователе */
    public onDetailsButtonClicked(username: string) {
        // this.router.navigateByUrl(`details/${username}`);
        console.log(`navigate to details/${username}`);
    }

    /**Переход к странице сравнения */
    public onCompareButtonClicked() {
        // this.router.navigateByUrl('compare');
        console.log('navigate to compare');
    }
}
