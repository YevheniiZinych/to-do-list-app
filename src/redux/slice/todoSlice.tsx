import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface DataTodo {
  id: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  status: "ToDo" | "In Progress" | "Done";
}

export interface ServerResponse {
  data: DataTodo[];
  status: number;
  success: boolean;
}

export interface CreateTodo {
  title: string;
  description: string;
  status: string;
}

interface UpdateTodo {
  id: string;

  data?: {
    title?: string;
    description?: string;
    status?: string;
  };
}

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://to-do-list-api-fc3t.onrender.com/api",
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<ServerResponse, void>({
      query: () => "/todo",
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "Todo", id } as const)),
              { type: "Todo", id: "LIST" },
            ]
          : [{ type: "Todo", id: "LIST" }],
    }),
    createTodo: builder.mutation<CreateTodo, Partial<CreateTodo>>({
      query: (newTodo) => ({
        url: "/todo/create",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }],
    }),
    updateTodo: builder.mutation<UpdateTodo, Partial<UpdateTodo>>({
      query: ({ id, ...todo }) => {
        return {
          url: `/todo/${id}`,
          method: "PUT",
          body: todo.data,
        };
      },
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

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
