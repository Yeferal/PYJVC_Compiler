import { TestBed } from '@angular/core/testing';

import { FilesOptService } from './files-opt.service';

describe('FilesOptService', () => {
  let service: FilesOptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesOptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
