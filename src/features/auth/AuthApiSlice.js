import { apiSlice } from "../../app/api/apiSlice"
import { logOut, setCredentials } from "./authSlice"

export const AuthApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        Signup: builder.mutation({
            query: credentials => ({
                url: '/signup',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        Signin: builder.mutation({
            query: credentials => ({
                url: '/signin',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        SendLogout: builder.mutation({
            query: () => ({
                url: '/signout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000) //check if unmount 
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
    })
})

export const {
    useSignupMutation,
    useSigninMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = AuthApiSlice 