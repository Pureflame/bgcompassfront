import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GloomhavenPartidasComponent } from './gloomhaven-partidas.component';

describe('GloomhavenPartidasComponent', () => {
  let component: GloomhavenPartidasComponent;
  let fixture: ComponentFixture<GloomhavenPartidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GloomhavenPartidasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GloomhavenPartidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
