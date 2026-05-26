import { ChangeDetectionStrategy, Component, DestroyRef, inject, Signal, signal, WritableSignal } from '@angular/core';
import { IProgrammerData } from '../../interfaces/programmer-data.interface';
import { MatList, MatListItem, MatListItemLine, MatListItemTitle } from '@angular/material/list';
import { MatCard, MatCardActions, MatCardContent,
    MatCardAvatar, MatCardTitleGroup, MatCardTitle, MatCardSubtitle } from '@angular/material/card';
import { ListRequestService } from '../../services/list-request/list-request.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';

@Component({
    selector: 'app-programmers-list',
    imports: [MatList, MatListItem, MatListItemLine, MatListItemTitle,
    MatCard, MatCardActions, MatCardContent, FormsModule, ReactiveFormsModule,
    MatCardAvatar, MatCardTitleGroup, MatCardTitle, MatCardSubtitle],
    providers: [ListRequestService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './programmers-list.html',
    styleUrl: './programmers-list.scss',
})
export class ProgrammersList {
    private listRequestService: ListRequestService = inject(ListRequestService);
    private destroyRef: DestroyRef = inject(DestroyRef);

    public programmersList: Signal<IProgrammerData[]> =
        toSignal(
            this.listRequestService.getUsers()
                .pipe(
                    takeUntilDestroyed(this.destroyRef),
                ),
            { initialValue: [] },
        );

    public filteredProgrammersList: WritableSignal<IProgrammerData[]> = signal<IProgrammerData[]>([]);

    public filterFormGroup = new FormGroup({ nameFilter: new FormControl<string>('') });

    public isCompareButtonActive: WritableSignal<boolean> = signal(false);

    constructor() {
        this.filterFormGroup.valueChanges
            .pipe(
                startWith({
                    nameFilter: '',
                }),
                debounceTime(500),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe(filter => {
                this.filteredProgrammersList.set(this.programmersList()
                    .filter(user =>
                        user.name.toLowerCase().includes(filter.nameFilter!.toLowerCase()),
                    ));
            });
    }

    /**Реакция на нажатие кнопки "Добавить в сравнение" */
    public onAddUserButtonClicked(ev: PointerEvent, username: string) {
        if (!this.isCompareButtonActive()) {
            this.listRequestService.addUserToComparison(username);
        } else {
            this.listRequestService.removeUserFromComparison(username);
        }

        this.isCompareButtonActive.set(!this.isCompareButtonActive());
    }

    /**TODO */
    public onDetailsButtonClicked(username: string) {

    }

    /**TODO */
    public onCompareButtonClicked() {

    }
}
