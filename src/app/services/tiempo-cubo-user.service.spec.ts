import { TestBed } from '@angular/core/testing';

import { TiempoCuboUserService } from './tiempo-cubo-user.service';

describe('TiempoCuboUserService', () => {
  let service: TiempoCuboUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiempoCuboUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
