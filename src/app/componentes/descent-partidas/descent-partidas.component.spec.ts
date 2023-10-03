import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescentPartidasComponent } from './descent-partidas.component';

describe('DescentPartidasComponent', () => {
  let component: DescentPartidasComponent;
  let fixture: ComponentFixture<DescentPartidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescentPartidasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescentPartidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
