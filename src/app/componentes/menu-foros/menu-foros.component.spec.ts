import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuForosComponent } from './menu-foros.component';

describe('MenuForosComponent', () => {
  let component: MenuForosComponent;
  let fixture: ComponentFixture<MenuForosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuForosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuForosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
