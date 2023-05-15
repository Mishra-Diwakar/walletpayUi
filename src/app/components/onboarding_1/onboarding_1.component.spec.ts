import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingOne } from './onboarding_1.component';

describe('WalletOutComponent', () => {
  let component: OnboardingOne;
  let fixture: ComponentFixture<OnboardingOne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingOne ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingOne);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
