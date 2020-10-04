import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { FiltersListService } from './filters-list.service';

describe('FiltersListService', () => {
  let service: FiltersListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient,HttpHandler]
    });
    service = TestBed.inject(FiltersListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
