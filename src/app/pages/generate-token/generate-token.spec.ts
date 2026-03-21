import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateToken } from './generate-token';

describe('GenerateToken', () => {
    let component: GenerateToken;
    let fixture: ComponentFixture<GenerateToken>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GenerateToken],
        }).compileComponents();

        fixture = TestBed.createComponent(GenerateToken);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
