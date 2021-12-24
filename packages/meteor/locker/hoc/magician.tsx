import React, { useEffect, useRef, useState } from "react";
import { AppThunkAction, StoreExtended, injectAsyncReducer, useAppDispatch } from '../createStore';
import type { ReducersMapObject, StateFromReducersMapObject, ActionFromReducersMapObject } from 'redux';
import { useStore } from "react-redux";
import { useLocation } from "react-router";

interface MagicianInputArgs<M extends ReducersMapObject<any, any>> {
    loadData?: AppThunkAction<unknown, StateFromReducersMapObject<M>, ActionFromReducersMapObject<M>>,
    reducers: M
};

let isServerRendered = __SERVER__ || window.__SSR__;

function Magician<M extends ReducersMapObject<any, any>>(args: MagicianInputArgs<M>){
    return function pageWrapper<TProps extends {dataFetched?: boolean} = {}> (WrappedComponent: React.FC<TProps>) {

    const {
        reducers,
        loadData = () => Promise.resolve()
    } = args;

    if(__SERVER__) {
        const FetchWrap: React.FC<TProps> = (props) => <WrappedComponent {...props} dataFetched />;
        return Object.assign(FetchWrap, args);
    }

    const FetchWrap: React.FC<TProps> = (props) => {
        const [isLoaded, setLoaded] = useState(isServerRendered);
        const backendResult = useRef(isServerRendered);
        const store: StoreExtended = useStore();
        const dispatch = useAppDispatch<StateFromReducersMapObject<M>, ActionFromReducersMapObject<M>>();

        const {pathname} = useLocation();
    
        const setBackendResult = (value: boolean) => {
            backendResult.current = value;
            isServerRendered = value
        }

        const fetchDataClient = () => {
            setLoaded(false);
            Promise.resolve(dispatch(loadData)).finally(() => setLoaded(true));
        }

        useEffect(() => {
            reducers && injectAsyncReducer(store, reducers);
            const { current: isFetchByBackend } = backendResult
            !isFetchByBackend && fetchDataClient()
            if (isFetchByBackend) {
                // this block is only run once
                setBackendResult(false)
            }
        }, [pathname]);

        return <WrappedComponent {...props} dataFetched={isLoaded}/>
    }

    return FetchWrap
}};

export {
    Magician
};