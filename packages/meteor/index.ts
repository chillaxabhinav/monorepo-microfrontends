import {
    Provider,
    store,
    useAppDispatch,
    useAppSelector,
    createReduxStore
} from './locker/createStore';

import type {
    AnyAction,
    AppDispatch,
    AppThunkAction,
    Reducer,
    ReducersMapObject,
    StoreExtended,
    StoreRedux,
    ThunkOptions,
    Action,
    RootState
} from './locker/createStore';

import {
    Magician
} from './locker/hoc/magician';

export {
    createReduxStore,
    Provider,
    store,
    useAppDispatch,
    useAppSelector,
    Magician
}

export type {
    AnyAction,
    AppDispatch,
    Reducer,
    ReducersMapObject,
    StoreExtended,
    StoreRedux,
    ThunkOptions,
    Action,
    RootState,
    AppThunkAction
}