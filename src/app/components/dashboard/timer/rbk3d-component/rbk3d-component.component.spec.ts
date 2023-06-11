import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rbk3dComponentComponent } from './rbk3d-component.component';

describe('Rbk3dComponentComponent', () => {
  let component: Rbk3dComponentComponent;
  let fixture: ComponentFixture<Rbk3dComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Rbk3dComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rbk3dComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
