import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammersList } from './programmers-list';

describe('ProgrammersList', () => {
    let component: ProgrammersList;
    let fixture: ComponentFixture<ProgrammersList>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProgrammersList],
        }).compileComponents();

        fixture = TestBed.createComponent(ProgrammersList);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
