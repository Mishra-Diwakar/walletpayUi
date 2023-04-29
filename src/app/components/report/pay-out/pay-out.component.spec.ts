import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayOutComponent } from './pay-out.component';

describe('PayOutComponent', () => {
  let component: PayOutComponent;
  let fixture: ComponentFixture<PayOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
