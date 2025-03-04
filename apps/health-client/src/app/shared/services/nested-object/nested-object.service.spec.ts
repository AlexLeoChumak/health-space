import { TestBed } from '@angular/core/testing';

import { NestedObjectService } from './nested-object.service';

describe('NestedObjectService', () => {
  let service: NestedObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NestedObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
