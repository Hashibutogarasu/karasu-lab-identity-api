export interface LogEntity {
  id: string;
  stoneId: string;
  userId: string;
  amount: number;
  previousAmount?: number;
  nextAmount?: number;
  createdAt: string;
  updatedAt: string;
}
