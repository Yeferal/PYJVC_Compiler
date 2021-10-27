import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSaveAsComponent } from './modal-save-as.component';

describe('ModalSaveAsComponent', () => {
  let component: ModalSaveAsComponent;
  let fixture: ComponentFixture<ModalSaveAsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSaveAsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSaveAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
