import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task';

@Component({
  imports: [RouterLink],
  selector: 'app-task-details',
  styleUrl: './task-details.scss',
  templateUrl: './task-details.html',
})
export class TaskDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly taskService = inject(TaskService);

  private readonly params = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  readonly taskId = computed(() => {
    const rawId = this.params().get('id');

    if (rawId === null || !/^[1-9]\d*$/.test(rawId)) {
      return null;
    }

    const id = Number(rawId);
    return Number.isSafeInteger(id) ? id : null;
  });

  readonly task = computed(() => {
    const id = this.taskId();

    return id === null ? undefined : this.taskService.tasks().find((task) => task.id === id);
  });
}
