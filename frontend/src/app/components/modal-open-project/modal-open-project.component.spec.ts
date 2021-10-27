import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOpenProjectComponent } from './modal-open-project.component';

describe('ModalOpenProjectComponent', () => {
  let component: ModalOpenProjectComponent;
  let fixture: ComponentFixture<ModalOpenProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOpenProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOpenProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
