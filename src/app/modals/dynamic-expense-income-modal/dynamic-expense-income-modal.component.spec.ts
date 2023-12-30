import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicExpenseIncomeModalComponent } from './dynamic-expense-income-modal.component';

describe('DynamicExpenseIncomeModalComponent', () => {
  let component: DynamicExpenseIncomeModalComponent;
  let fixture: ComponentFixture<DynamicExpenseIncomeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicExpenseIncomeModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicExpenseIncomeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
