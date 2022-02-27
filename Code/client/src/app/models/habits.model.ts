import { Progress } from './progress.model';
export interface Habits {
  userId: string,
  Name: string,
  Goal: number,
  schedual: number,
  repeat: string,
  start_date: Date,
  streak: number,
  catagory: string,
  progress: Progress[],
  _id?: string,
}
