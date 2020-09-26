import { TestBed } from '@angular/core/testing';

import { InboundMapperService } from './inbound-mapper.service';

describe('InboundMapperService', () => {
  let service: InboundMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InboundMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
