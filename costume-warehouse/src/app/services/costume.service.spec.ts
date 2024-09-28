import { TestBed } from '@angular/core/testing';

import { CostumeService } from './costume.service';

describe('CostumeService', () => {
  let service: CostumeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostumeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
