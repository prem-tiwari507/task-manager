import { TestBed } from '@angular/core/testing';

import { TaskActions } from './task-actions';

describe('TaskActions', () => {
  let service: TaskActions;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskActions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
