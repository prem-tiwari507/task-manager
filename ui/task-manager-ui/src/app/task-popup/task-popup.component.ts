import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TaskActions } from '../task.services';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { TaskModel } from '../interfaces/task.interface';

@Component({
  selector: 'app-task-popup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './task-popup.html'
})
export class TaskPopup {
  taskForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskActions,
    private dialogRef: MatDialogRef<TaskPopup>,
    @Inject(MAT_DIALOG_DATA) public data: TaskModel | null
  ) {
    this.taskForm = this.fb.group({
      title: [data?.title || '', Validators.required],
      description: [data?.description || ''],
      status: [data?.status || 'pending', Validators.required]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.loading = true;
      const taskPayload = this.taskForm.value;
      const request = this.data?.id
        ? this.taskService.updateTask(this.data.id, taskPayload)
        : this.taskService.createTask(taskPayload);

      request.subscribe({
        next: () => this.dialogRef.close(true),
        error: () => this.loading = false
      });
    }
  }
}

