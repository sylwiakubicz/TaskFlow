import { Component, model } from '@angular/core';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.html',
  styleUrl: './task-filter.scss',
})
export class TaskFilter {
  showCompleted = model(true);

  toggle(): void {
    this.showCompleted.update((value) => !value);
  }
}
