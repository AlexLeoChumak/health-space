import { TestBed } from '@angular/core/testing';

import { StringConverterService } from './string-converter.service';

describe('StringConverterService', () => {
  let service: StringConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
