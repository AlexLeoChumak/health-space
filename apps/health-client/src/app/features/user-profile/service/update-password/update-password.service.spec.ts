import { TestBed } from '@angular/core/testing';

import { UpdatePasswordService } from './update-password.service';

describe('UpdatePasswordService', () => {
  let service: UpdatePasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
