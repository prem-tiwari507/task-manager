import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { TaskActions } from '../task.services';
import { TaskModel } from '../interfaces/task.interface';
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

  constructor(private taskService: TaskActions) {}

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

}


