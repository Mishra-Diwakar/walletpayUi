import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletOutComponent } from './wallet-out.component';

describe('WalletOutComponent', () => {
  let component: WalletOutComponent;
  let fixture: ComponentFixture<WalletOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
