import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavOptsComponent } from './nav-opts.component';

describe('NavOptsComponent', () => {
  let component: NavOptsComponent;
  let fixture: ComponentFixture<NavOptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavOptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavOptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
