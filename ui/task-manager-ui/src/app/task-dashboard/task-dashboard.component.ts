import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TaskActions } from '../task.services';
import { TaskModel } from '../interfaces/task.interface';
import { TaskPopup } from '../task-popup/task-popup.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatProgressSpinnerModule],
 templateUrl: './task-dashboard.html',
  styleUrl: './task-dashboard.scss'
})
export class TaskDashboard implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'status', 'actions'];
  dataSource: TaskModel[] = [];
  loading = false;

  constructor(private taskService: TaskActions, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(): void {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.dataSource = tasks;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => this.getAllTasks());
  }

  openTaskDialog(task?: Task): void {
    const dialogRef = this.dialog.open(TaskPopup, {
      data: task || null,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.getAllTasks();
    });
  }
}



