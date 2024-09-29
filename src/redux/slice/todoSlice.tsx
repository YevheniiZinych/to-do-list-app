import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://to-do-list-api-fc3t.onrender.com",
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/todo",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Todo", id } as const)),
              { type: "Todo", id: "LIST" },
            ]
          : [{ type: "Todo", id: "LIST" }],
    }),
    createTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (newTodo) => ({
        url: "/todo",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }],
    }),
    updateTodo: builder.mutation<Todo, Partial<Todo>>({
      query: ({ id, ...todo }) => ({
        url: `/todo/${id}`,
        method: "PUT",
        body: todo,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Todo", id }],
    }),
    deleteTodo: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/todo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Todo", id }],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;

// Define the Todo interface
export interface Todo {
  id: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  status: "ToDo" | "In Progress" | "Done";
}
