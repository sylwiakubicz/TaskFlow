import { computed, Service, signal } from '@angular/core';
import { Task } from '../models/task.model';

// @Injectable({
//   providedIn: 'root'
// })
@Service()
export class TaskService {
  private readonly tasksState = signal<Task[]>([
    {
      id: 1,
      title: 'Review components',
      status: 'todo',
    },
    {
      id: 2,
      title: 'Install Angular CLI',
      status: 'done',
    },
    {
      id: 3,
      title: 'Learn the new control flow',
      status: 'in-progress',
    },
  ]);
  readonly tasks = this.tasksState.asReadonly();

  readonly totalCount = computed(() => this.tasks().length);
  readonly completedCount = computed(
    () => this.tasks().filter((task) => task.status === 'done').length,
  );
  readonly activeCount = computed(
    () => this.tasks().filter((task) => task.status !== 'done').length,
  );

  deleteTask(id: number): void {
    this.tasksState.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  addTask(title: string): void {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    this.tasksState.update((tasks) => {
      const nextId = Math.max(0, ...tasks.map((task) => task.id)) + 1;

      const newTask: Task = {
        id: nextId,
        title: trimmedTitle,
        status: 'todo',
      };

      return [...tasks, newTask];
    });
  }

  toggleTask(id: number): void {
    this.tasksState.update((tasks) =>
      tasks.map((task) => {
        if (task.id !== id) {
          return task;
        }

        return {
          ...task,
          status: task.status === 'done' ? 'todo' : 'done',
        };
      }),
    );
  }
}
