import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingTwo } from './onboarding_2.component';

describe('WalletOutComponent', () => {
  let component: OnboardingTwo;
  let fixture: ComponentFixture<OnboardingTwo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingTwo ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingTwo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
