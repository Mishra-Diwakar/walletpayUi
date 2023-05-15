import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayProfitComponent } from './today-profit.component';

describe('TodayProfitComponent', () => {
  let component: TodayProfitComponent;
  let fixture: ComponentFixture<TodayProfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayProfitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
