import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOptComponent } from './modal-opt.component';

describe('ModalOptComponent', () => {
  let component: ModalOptComponent;
  let fixture: ComponentFixture<ModalOptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
