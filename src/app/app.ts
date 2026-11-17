import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { TaskList } from './components/task-list/task-list';

@Component({
  selector: 'app-root',
  imports: [Header, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
