import { TestBed } from '@angular/core/testing';

import { KociembaSolutionService } from './kociemba-solution.service';

describe('KociembaSolutionService', () => {
  let service: KociembaSolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KociembaSolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
