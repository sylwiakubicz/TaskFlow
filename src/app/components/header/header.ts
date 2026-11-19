import { Component, inject } from '@angular/core';
import { TaskService} from '../../services/task';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly taskService = inject(TaskService);
  appName = 'TaskFlow';

  readonly totalCount = this.taskService.totalCount;
  readonly completedCount = this.taskService.completedCount;
}
