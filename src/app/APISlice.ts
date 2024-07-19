import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todos } from "../interfaces/interfaces";

const URL = `http://localhost:8000`;

const baseQuery = fetchBaseQuery({
    baseUrl: URL
});

export const apiSlice = createApi({
    reducerPath: 'todosAPI',
    tagTypes: ['Todos'],
    baseQuery,
    endpoints: (builder) => ({
        
        // First paramater Represents the Expected Return Data Type
        // Second parameter Represents the Passed Data Type

        getTodos: builder.query<Todos[], void>({
            query: () => ({
                url: `/todos`,
                method: 'GET',
            }),
            providesTags: ['Todos'],
        }),
        addNewTodo: builder.mutation<void, Todos>({
            query: (newTodo) => ({
                url: `todos`,
                method: 'POST',
                body: newTodo,
            }),
            invalidatesTags: ['Todos'],
        }),
        getTodoById: builder.query<Todos, string>({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'GET'
            }),
            providesTags: ['Todos'],
        }),
        deleteTodo: builder.mutation<void, string>({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo: builder.mutation<void, Todos>({
            query: (updateTodo) => ({
                url: `/todos/${updateTodo.id}`,
                method: 'PUT',
                body: updateTodo
            }),
            invalidatesTags: ['Todos']
        }),
    }),
});


export const { useGetTodosQuery, useAddNewTodoMutation, useGetTodoByIdQuery, useUpdateTodoMutation, useDeleteTodoMutation } = apiSlice;