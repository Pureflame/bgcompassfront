import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoDiscusionCrearComponent } from './foro-discusion-crear.component';

describe('ForoDiscusionCrearComponent', () => {
  let component: ForoDiscusionCrearComponent;
  let fixture: ComponentFixture<ForoDiscusionCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForoDiscusionCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForoDiscusionCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
