import { TestBed } from '@angular/core/testing';

import { AbonneService } from './abonne.service';

describe('AbonneService', () => {
  let service: AbonneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbonneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
