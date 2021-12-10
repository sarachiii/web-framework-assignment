import { TestBed } from '@angular/core/testing';

import { SessionSbServiceService } from './session-sb-service.service';

describe('SessionSbServiceService', () => {
  let service: SessionSbServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionSbServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
