import { TestBed } from '@angular/core/testing';

import { SaveCubeService } from './save-cube.service';

describe('SaveCubeService', () => {
  let service: SaveCubeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveCubeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
