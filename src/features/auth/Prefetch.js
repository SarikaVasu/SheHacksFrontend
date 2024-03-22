import { store } from '../../app/store'
import { loginApiSlice } from './loginApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {

    useEffect(() => {
        store.dispatch(loginApiSlice.util.prefetch('get', 'userloginsList', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch
