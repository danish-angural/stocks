import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockbodyComponent } from './stockbody.component';

describe('StockbodyComponent', () => {
  let component: StockbodyComponent;
  let fixture: ComponentFixture<StockbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockbodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
