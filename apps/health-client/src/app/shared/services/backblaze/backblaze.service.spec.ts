import { TestBed } from '@angular/core/testing';

import { BackblazeService } from './backblaze.service';

describe('BackblazeService', () => {
  let service: BackblazeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackblazeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
