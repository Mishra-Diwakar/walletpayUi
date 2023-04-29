import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayInComponent } from './pay-in.component';

describe('PayInComponent', () => {
  let component: PayInComponent;
  let fixture: ComponentFixture<PayInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
