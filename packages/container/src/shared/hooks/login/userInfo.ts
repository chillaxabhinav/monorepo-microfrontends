import { useState, useEffect } from 'react';
import { useAppDispatch } from '@ixigo/meteor';
import { getUserDetails } from '../../actions/userDetails';
import { LoginResponse } from '../../types/login';
export function useUserInfo() {
    const [userInfo, setUserInfo] = useState<Partial<LoginResponse> & {loggedIn: boolean, loading?: boolean}>( {loggedIn: false, loading: true});
    const dispatch = useAppDispatch();
    useEffect(() => {
        let mounted = true;
        dispatch(getUserDetails()).then(info => mounted && setUserInfo(info));
        return () => {
            mounted = false;
        }
    }, []);

    return [userInfo, setUserInfo] as const;
}