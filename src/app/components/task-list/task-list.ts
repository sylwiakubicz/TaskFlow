import { Component, signal, computed, effect, linkedSignal } from '@angular/core';

import { Task } from '../../models/task.model';
import { TaskCard } from '../task-card/task-card';
import { AppCard } from '../app-card/app-card';

type TaskFilter = 'all' | 'active' | 'done';

@Component({
  selector: 'app-task-list',
  imports: [TaskCard, AppCard],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  // 1. Stan źródłowy
  tasks = signal<Task[]>([
    {
      id: 1,
      title: 'Powtórzyć komponenty',
      status: 'todo',
      completed: false,
    },
    {
      id: 2,
      title: 'Zainstalować Angular CLI',
      status: 'done',
      completed: true,
    },
    {
      id: 3,
      title: 'Poznać nowy control flow',
      status: 'in-progress',
      completed: false,
    },
  ]);

  // 2. Stan interfejsu
  filter = signal<TaskFilter>('all');
  searchQuery = signal('');

  // 3. Wartości wyliczane
  totalCount = computed(() => this.tasks().length);

  completedCount = computed(() => this.tasks().filter((task) => task.completed).length);

  activeCount = computed(() => this.tasks().filter((task) => !task.completed).length);

  // 4. Filtrowanie i wyszukiwanie
  visibleTasks = computed(() => {
    const tasks = this.tasks();
    const filter = this.filter();
    const query = this.searchQuery().toLowerCase().trim();

    return tasks.filter((task) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'active' && !task.completed) ||
        (filter === 'done' && task.completed);

      const matchesSearch = task.title.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  });

  // 5. Zapisywalny wybór zależny od listy
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

  // 6. Efekt uboczny
  constructor() {
    effect(() => {
      console.log('Liczba ukończonych:', this.completedCount());
    });
  }

  // 7. Akcje
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
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  toggleTask(id: number): void {
    this.tasks.update((tasks) =>
      tasks.map((task) => {
        if (task.id !== id) {
          return task;
        }

        const completed = !task.completed;

        return {
          ...task,
          completed,
          status: completed ? 'done' : 'todo',
        };
      }),
    );
  }
}
