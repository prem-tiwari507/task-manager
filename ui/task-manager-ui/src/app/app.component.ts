import { Component } from '@angular/core';
import { TaskDashboard } from './task-dashboard/task-dashboard.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskDashboard],
  template: `
    <app-task-dashboard></app-task-dashboard>
  `
})
export class AppComponent {}
