import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpaListComponent } from './vpa-list.component';

describe('VpaListComponent', () => {
  let component: VpaListComponent;
  let fixture: ComponentFixture<VpaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VpaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
