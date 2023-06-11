import { TestBed } from '@angular/core/testing';

import { LoguearService } from './loguear.service';

describe('LoguearService', () => {
  let service: LoguearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoguearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
