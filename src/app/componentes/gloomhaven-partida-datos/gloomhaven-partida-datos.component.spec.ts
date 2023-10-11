import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GloomhavenPartidaDatosComponent } from './gloomhaven-partida-datos.component';

describe('GloomhavenPartidaDatosComponent', () => {
  let component: GloomhavenPartidaDatosComponent;
  let fixture: ComponentFixture<GloomhavenPartidaDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GloomhavenPartidaDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GloomhavenPartidaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
