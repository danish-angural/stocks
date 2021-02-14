import { TestBed } from '@angular/core/testing';

import { Chart.DataService } from './chart.data.service';

describe('Chart.DataService', () => {
  let service: Chart.DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Chart.DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
