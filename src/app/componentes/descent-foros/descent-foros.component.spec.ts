import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescentForosComponent } from './descent-foros.component';

describe('DescentForosComponent', () => {
  let component: DescentForosComponent;
  let fixture: ComponentFixture<DescentForosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescentForosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescentForosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
