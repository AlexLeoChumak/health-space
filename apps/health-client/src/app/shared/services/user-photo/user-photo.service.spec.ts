import { TestBed } from '@angular/core/testing';

import { UserPhotoService } from './user-photo.service';

describe('UserPhotoService', () => {
  let service: UserPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
