import { combineReducers, ReducersMapObject } from 'redux';
import shell from "./shell";

export default function createReducer<M extends ReducersMapObject<any, any>>(asyncReducers?: M) {

  return combineReducers({
    ...asyncReducers,
    shell
  });

};


export type RootState = NonNullable<Parameters<ReturnType<typeof createReducer>>[0]>

export type RootAction = Parameters<ReturnType<typeof createReducer>>[1];