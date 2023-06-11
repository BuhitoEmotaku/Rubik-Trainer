import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSolverComponent } from './home-solver.component';

describe('HomeSolverComponent', () => {
  let component: HomeSolverComponent;
  let fixture: ComponentFixture<HomeSolverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSolverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
