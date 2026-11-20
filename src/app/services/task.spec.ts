import { TestBed } from '@angular/core/testing';
import { TaskService } from './task';
import { Service } from '@angular/core';

describe('Task', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have proper default state', () => {
    expect(service.tasks().length).toBe(3);
    expect(service.totalCount()).toBe(3);
    expect(service.completedCount()).toBe(1);
    expect(service.activeCount()).toBe(2);
  });

  it('should add new task to list', () => {
    service.addTask("new task");

    expect(service.tasks().length).toBe(4);
    expect(service.tasks().filter(task => task.title === 'new task').length).toBe(1);
  })

  it('should delete task', () => {
    service.deleteTask(1);

    expect(service.tasks().length).toBe(2);
    expect(service.tasks().filter(task => task.id === 1).length).toBe(0);
  })

  it('toggle should change status', () => {
    service.toggleTask(1);

    const task = service.tasks().find((task) => task.id === 1);
    expect(task?.status).toBe('done');
  })

  it('totalCount should be updated', () => {
    expect(service.totalCount()).toBe(3);

    service.addTask("new task");

    expect(service.totalCount()).toBe(4);
  })

  it('should change completed and active computed signal', () => {
    expect(service.completedCount()).toBe(1);
    expect(service.activeCount()).toBe(2);

    service.toggleTask(1);

    expect(service.completedCount()).toBe(2);
    expect(service.activeCount()).toBe(1);
  });
});

