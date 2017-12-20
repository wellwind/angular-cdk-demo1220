import { TestBed, inject } from '@angular/core/testing';

import { OnlineUsersService } from './online-users.service';

describe('OnlineUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlineUsersService]
    });
  });

  it('should be created', inject([OnlineUsersService], (service: OnlineUsersService) => {
    expect(service).toBeTruthy();
  }));
});
