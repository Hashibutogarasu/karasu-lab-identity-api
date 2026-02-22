export interface IDataBaseService {
  getHandler(): any;
  close(): Promise<void>;
}
