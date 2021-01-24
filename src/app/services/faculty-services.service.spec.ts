import { TestBed } from '@angular/core/testing';

import { FacultyServicesService } from './faculty-services.service';

describe('FacultyServicesService', () => {
  let service: FacultyServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultyServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
