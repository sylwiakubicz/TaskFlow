import { Component, signal, computed, effect, linkedSignal, inject } from '@angular/core';

import { TaskCard } from '../task-card/task-card';
import { AppCard } from '../app-card/app-card';
import { TaskService } from '../../services/task';

type TaskFilter = 'all' | 'active' | 'done';

@Component({
  selector: 'app-task-list',
  imports: [TaskCard, AppCard],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  private readonly taskService = inject(TaskService);
  readonly tasks = this.taskService.tasks;
  readonly totalCount = this.taskService.totalCount;
  readonly completedCount = this.taskService.completedCount;
  readonly activeCount = this.taskService.activeCount;

  filter = signal<TaskFilter>('all');
  searchQuery = signal('');

  visibleTasks = computed(() => {
    const tasks = this.tasks();
    const filter = this.filter();
    const query = this.searchQuery().toLowerCase().trim();

    return tasks.filter((task) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'active' && task.status !== 'done') ||
        (filter === 'done' && task.status === 'done');

      const matchesSearch = task.title.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  });

  selectedTaskId = linkedSignal({
    source: this.visibleTasks,
    computation: (tasks, previous) => {
      const previousId = previous?.value;

      if (tasks.some((task) => task.id === previousId)) {
        return previousId!;
      }

      return tasks[0]?.id ?? null;
    },
  });

  constructor() {
    effect(() => {
      console.log('Liczba ukończonych:', this.completedCount());
    });
  }

  setFilter(filter: TaskFilter): void {
    this.filter.set(filter);
  }

  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  selectTask(id: number): void {
    this.selectedTaskId.set(id);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }

  toggleTask(id: number): void {
    this.taskService.toggleTask(id);
  }
}
