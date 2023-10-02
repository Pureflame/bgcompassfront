import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDiscusionesComponent } from './perfil-discusiones.component';

describe('PerfilDiscusionesComponent', () => {
  let component: PerfilDiscusionesComponent;
  let fixture: ComponentFixture<PerfilDiscusionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilDiscusionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilDiscusionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
