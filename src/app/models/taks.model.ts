import { TaskStatus } from '@root/enums/task-status.enum';

export interface Task {
  id?: string;
  description: string;
  duration: number;
  timeRemaing?: number;
  timeUsed?: number;
  dateRunning?: number;
  state?: TaskStatus;
}
