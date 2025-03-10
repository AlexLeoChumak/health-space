import { TestBed } from '@angular/core/testing';
import { UpdateUserProfileService } from 'src/app/features/user-profile/service/update-user-profile/update-user-profile.service';

describe('UpdateUserProfileService', () => {
  let service: UpdateUserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateUserProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
