import { TestBed } from '@angular/core/testing';

import { ScooterRestAdaptorService } from './scooter-rest-adaptor.service';

describe('ScooterRestAdaptorService', () => {
  let service: ScooterRestAdaptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScooterRestAdaptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
