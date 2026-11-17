import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  task = input.required<Task>();

  deleteRequested = output<number>();
  completedToggled = output<number>();

  requestDelete(): void {
    this.deleteRequested.emit(this.task().id);
  }

  toggleCompleted(): void {
    this.completedToggled.emit(this.task().id);
  }
}
