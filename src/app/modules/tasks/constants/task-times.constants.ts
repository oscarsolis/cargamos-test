import { TaskTime } from '@models/task-time.model';

export const TASK_TIMES: Array<TaskTime> = [
  {
    label: '30 min',
    value: 30 * 60000
  },
  {
    label: '45 min',
    value: 45 * 60000
  },
  {
    label: '1 hr',
    value: 60 * 60000
  },
  {
    label: 'Personalizada',
    value: 0
  }
];
