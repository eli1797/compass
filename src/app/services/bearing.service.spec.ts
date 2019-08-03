import { TestBed } from '@angular/core/testing';

import { BearingService } from './bearing.service';

describe('BearingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BearingService = TestBed.get(BearingService);
    expect(service).toBeTruthy();
  });
});
