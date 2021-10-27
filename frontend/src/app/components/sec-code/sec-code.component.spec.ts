import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecCodeComponent } from './sec-code.component';

describe('SecCodeComponent', () => {
  let component: SecCodeComponent;
  let fixture: ComponentFixture<SecCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
