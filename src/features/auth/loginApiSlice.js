import {
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const loginAdapter = createEntityAdapter({}); //get normalised state, ids ans entity. Use ids to get data from entity
const initialState = loginAdapter.getInitialState() ;

export const loginApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        get: builder.query({
            query: () => ({
                url: '/login',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            // keepUnusedDataFor: 60,
            transformResponse: responseData => {
                
                const loadedUsers = responseData.map(user => {
                    user.id = user._id  //normalised data
                    return user
                });
                return loginAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'login', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'login', id }))
                    ]
                } else return [{ type: 'login', id: 'LIST' }]
            }
        }),
        addNew: builder.mutation({
            query: initialUserData => ({
                url: '/login',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                { type: 'login', id: "LIST" }
            ]
        }),
        update: builder.mutation({
            query: initialUserData => ({
                url: '/login',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'login', id: arg.id }
            ]
        }),
        delete: builder.mutation({
            query: ({ id }) => ({
                url: `/login`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'login', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetQuery,
    useAddNewMutation,
    useUpdateMutation,
    useDeleteMutation,
} = loginApiSlice

// returns the query result object
export const selectResult = loginApiSlice.endpoints.get.select()

// creates memoized selector
const selectData = createSelector(
    selectResult,
    usersResult => usersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAll,
    selectById: selectById,
    selectIds: selectIds
    // Pass in a selector that returns the users slice of state
} = loginAdapter.getSelectors(state => selectData(state) ?? initialState)