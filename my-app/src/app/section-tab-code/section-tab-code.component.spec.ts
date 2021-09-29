import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTabCodeComponent } from './section-tab-code.component';

describe('SectionTabCodeComponent', () => {
  let component: SectionTabCodeComponent;
  let fixture: ComponentFixture<SectionTabCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionTabCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTabCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
