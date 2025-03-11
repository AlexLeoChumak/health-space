import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { blockReAuthenticationGuard } from './block-re-authentication.guard';

describe('blockReAuthenticationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => blockReAuthenticationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
