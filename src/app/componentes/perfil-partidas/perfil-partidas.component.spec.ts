import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPartidasComponent } from './perfil-partidas.component';

describe('PerfilPartidasComponent', () => {
  let component: PerfilPartidasComponent;
  let fixture: ComponentFixture<PerfilPartidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilPartidasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilPartidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
