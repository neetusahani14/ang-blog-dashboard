import { TestBed } from '@angular/core/testing';

import { CategoriesList } from './categories-list';

describe('CategoriesList', () => {
  let service: CategoriesList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
