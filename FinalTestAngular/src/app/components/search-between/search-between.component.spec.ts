import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBetweenComponent } from './search-between.component';

describe('SearchBetweenComponent', () => {
  let component: SearchBetweenComponent;
  let fixture: ComponentFixture<SearchBetweenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBetweenComponent]
    });
    fixture = TestBed.createComponent(SearchBetweenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
