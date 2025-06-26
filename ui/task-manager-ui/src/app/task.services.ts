import { Injectable } from '@angular/core';
import { TaskModel } from './interfaces/task.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TaskActions {
  private baseUrl = `${environment.apiBaseUrl}/tasks/`;

  constructor(private http: HttpClient) {}

 getTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }
  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}${id}`, task).pipe(
      catchError(this.handleError)
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`).pipe(
      catchError(this.handleError)
    );
  }


  createTask(task: Task): Observable<Task> {
      return this.http.post<Task>(this.baseUrl, task).pipe(
        catchError(this.handleError)
      );
    }



  private handleError(error: any) {
    console.error('TaskService error:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
