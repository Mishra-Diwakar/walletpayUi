import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletLoadComponent } from './wallet-load.component';

describe('WalletLoadComponent', () => {
  let component: WalletLoadComponent;
  let fixture: ComponentFixture<WalletLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletLoadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
