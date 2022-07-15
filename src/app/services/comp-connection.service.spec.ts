import { TestBed } from '@angular/core/testing';

import { CompConnectionService } from './comp-connection.service';

describe('CompConnectionService', () => {
  let service: CompConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
