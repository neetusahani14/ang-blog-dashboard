import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPost } from './all-post';

describe('AllPost', () => {
  let component: AllPost;
  let fixture: ComponentFixture<AllPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
