import { TestBed } from '@angular/core/testing';

import { SubSer } from './sub-ser';

describe('SubSer', () => {
  let service: SubSer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubSer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
