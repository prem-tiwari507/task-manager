export type TaskStatus = 'pending' | 'completed';

export interface TaskModel {
  id?: number;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
}
