import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidaCrearComponent } from './partida-crear.component';

describe('PartidaCrearComponent', () => {
  let component: PartidaCrearComponent;
  let fixture: ComponentFixture<PartidaCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartidaCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartidaCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
