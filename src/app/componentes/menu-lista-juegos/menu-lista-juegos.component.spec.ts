import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuListaJuegosComponent } from './menu-lista-juegos.component';

describe('MenuListaJuegosComponent', () => {
  let component: MenuListaJuegosComponent;
  let fixture: ComponentFixture<MenuListaJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuListaJuegosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuListaJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
