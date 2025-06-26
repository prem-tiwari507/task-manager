import { Component } from '@angular/core';
import { TaskDashboard } from './task-dashboard/task-dashboard.component';
import { TaskPopup } from './task-popup/task-popup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskDashboard, TaskPopup],
  template: `
    <app-task-popup></app-task-popup>
    <hr />
    <app-task-dashboard></app-task-dashboard>
  `
})
export class AppComponent {}

