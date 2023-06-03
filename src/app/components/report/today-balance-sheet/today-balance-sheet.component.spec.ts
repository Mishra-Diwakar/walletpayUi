import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayBalanceSheetComponent } from './today-balance-sheet.component';

describe('TodayBalanceSheetComponent', () => {
  let component: TodayBalanceSheetComponent;
  let fixture: ComponentFixture<TodayBalanceSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayBalanceSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayBalanceSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
