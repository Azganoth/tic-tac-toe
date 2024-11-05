export type ReducerAction<T, P> = {
  type: T;
  payload: P;
};

export type ReducerActionNoPayload<T> = {
  type: T;
};

export type Reducer<S, A> = React.Reducer<S, A>;
