import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockListItemComponent } from './stocklist-item.component';

describe('StockListItemComponent', () => {
  let component: StockListItemComponent;
  let fixture: ComponentFixture<StockListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
