import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealDataComponent } from './heal-data.component';

describe('HealDataComponent', () => {
  let component: HealDataComponent;
  let fixture: ComponentFixture<HealDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
