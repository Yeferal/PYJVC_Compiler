import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionRunCodeComponent } from './section-run-code.component';

describe('SectionRunCodeComponent', () => {
  let component: SectionRunCodeComponent;
  let fixture: ComponentFixture<SectionRunCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionRunCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionRunCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
