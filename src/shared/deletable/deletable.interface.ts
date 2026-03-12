export interface IDeletable {
  deleteData(userId: string): Promise<void>;
}
