import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioRubikTrainerComponent } from './inicio-rubik-trainer.component';

describe('InicioRubikTrainerComponent', () => {
  let component: InicioRubikTrainerComponent;
  let fixture: ComponentFixture<InicioRubikTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioRubikTrainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioRubikTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
