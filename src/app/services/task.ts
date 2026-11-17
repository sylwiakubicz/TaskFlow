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
  readonly tasks = this.tasksState.asReadonly();

  readonly totalCount = computed(() => this.tasks().length);
  readonly completedCount = computed(() => this.tasks().filter((task) => task.completed).length);
  readonly activeCount = computed(() => this.tasks().filter((task) => !task.completed).length);

  deleteTask(id: number): void {
    this.tasksState.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  toggleTask(id: number): void {
    this.tasksState.update((tasks) =>
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
