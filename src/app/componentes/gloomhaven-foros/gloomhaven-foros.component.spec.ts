import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GloomhavenForosComponent } from './gloomhaven-foros.component';

describe('GloomhavenForosComponent', () => {
  let component: GloomhavenForosComponent;
  let fixture: ComponentFixture<GloomhavenForosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GloomhavenForosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GloomhavenForosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
