import { createStore, applyMiddleware, Action, EmptyObject, Store, AnyAction, ReducersMapObject, Reducer } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { useSelector, useDispatch, Provider } from 'react-redux';
import createReducer, { RootAction, RootState } from "../reducers/rootReducer";
import type { CookieHelpers } from '../../types/cookie';
import type { Fetch } from '../../shared/interceptor';

type ThunkOptions = CookieHelpers & {
    fetch: Fetch
    btoa: (data: string) => string,
    atob: (data: string) => string
};


type AppDispatch<S = EmptyObject, A = RootAction> = ThunkDispatch<S & RootState, ThunkOptions, A & RootAction>;
type AppThunkAction<ReturnType = any, S = RootState, A = RootAction> = ThunkAction<ReturnType, S & RootState, ThunkOptions, RootAction & A>

interface ReducerThunkOption {
    reducers?: ReducersMapObject,
    thunkOptions?: ThunkOptions
}

type StoreRedux<S, A=RootAction> = Store<S & RootState, A & RootAction> & { dispatch: AppDispatch<S, A> };

interface StoreExtended<T = RootState, A = RootAction> extends StoreRedux<T, A> {
    asyncReducers?: ReducersMapObject,
    injectReducer?: (key: string, asyncReducer: Reducer<object>) => void,
};

let store: StoreExtended<RootState>;

const createReduxStore = <S extends Record<string, any>>(initialState: S, { reducers, thunkOptions }: ReducerThunkOption = {}) => {

    const rootReducer = createReducer({
        ...(Object.keys(initialState) as Array<keyof S>).reduce((res, key) => {
            res[key] = () => initialState[key]
            return res
          }, {} as Record<keyof S, () => S[keyof S]>),
        ...reducers
    });
    const _store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunk.withExtraArgument(thunkOptions || {})))
    );
    store = Object.assign(_store, {
        asyncReducers: {}
    });

    store.asyncReducers = {};

    return _store;

}

function injectAsyncReducer<M extends ReducersMapObject<any, any>>(store: StoreExtended, reducerObj: M) {
    const keys = Object.keys(reducerObj).filter((name) => {
        store.asyncReducers = store.asyncReducers || {};
        if (!store.asyncReducers[name]) {
            store.asyncReducers[name] = reducerObj[name]
            return true
        }
        return false;
    })
    if (keys.length) {
        store.replaceReducer(createReducer(store.asyncReducers))
    }
}
interface TypedSelectorHook {
    <IState = RootState, TSelected = unknown>(
        selector: (state: IState & RootState) => TSelected,
        equalityFn?: (left: TSelected, right: TSelected) => boolean
    ): TSelected;
}

const useAppSelector: TypedSelectorHook = useSelector;
const useAppDispatch = <S, A>() => useDispatch<AppDispatch<S, A>>();
export type {
    Reducer,
    ReducersMapObject,
    AppDispatch,
    StoreExtended,
    StoreRedux,
    ThunkOptions,
    AnyAction,
    Action,
    RootState,
    AppThunkAction
}

export {
    store,
    Provider,
    useAppDispatch,
    useAppSelector,
    createReduxStore,
    injectAsyncReducer
}
