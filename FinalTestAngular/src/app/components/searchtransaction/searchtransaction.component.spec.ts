import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchtransactionComponent } from './searchtransaction.component';

describe('SearchtransactionComponent', () => {
  let component: SearchtransactionComponent;
  let fixture: ComponentFixture<SearchtransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchtransactionComponent]
    });
    fixture = TestBed.createComponent(SearchtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
