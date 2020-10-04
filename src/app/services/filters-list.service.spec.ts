import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { FiltersListService } from './filters-list.service';

describe('FiltersListService', () => {
  let service: FiltersListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(FiltersListService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
