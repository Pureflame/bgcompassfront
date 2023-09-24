import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuListaForosComponent } from './menu-lista-foros.component';

describe('MenuListaForosComponent', () => {
  let component: MenuListaForosComponent;
  let fixture: ComponentFixture<MenuListaForosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuListaForosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuListaForosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
