import { TestBed } from '@angular/core/testing';

import { PushTokensService } from './push-tokens.service';

describe('PushTokensService', () => {
  let service: PushTokensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PushTokensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
