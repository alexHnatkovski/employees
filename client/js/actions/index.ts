export interface ReducerAction {
  type: symbol;
  payload?: {
    [key: string]: any;
    [index: number]: any
  };
}
