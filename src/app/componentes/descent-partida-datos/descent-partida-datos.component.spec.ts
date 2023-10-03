import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescentPartidaDatosComponent } from './descent-partida-datos.component';

describe('DescentPartidaDatosComponent', () => {
  let component: DescentPartidaDatosComponent;
  let fixture: ComponentFixture<DescentPartidaDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescentPartidaDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescentPartidaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
