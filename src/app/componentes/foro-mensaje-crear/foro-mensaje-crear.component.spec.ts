import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoMensajeCrearComponent } from './foro-mensaje-crear.component';

describe('ForoMensajeCrearComponent', () => {
  let component: ForoMensajeCrearComponent;
  let fixture: ComponentFixture<ForoMensajeCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForoMensajeCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForoMensajeCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
