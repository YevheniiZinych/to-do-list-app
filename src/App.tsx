import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  Todo,
} from "./redux/slice/todoSlice";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { Board } from "./interface/board";

// const initialBoards: Board[] = [
//   {
//     id: uuidv4(),
//     name: "Main",
//     columns: {
//       todo: {
//         name: "ToDo",
//         tasks: [{ id: uuidv4(), content: "Task 1" }],
//       },
//       inProgress: {
//         name: "In Progress",
//         tasks: [{ id: uuidv4(), content: "Task 2" }],
//       },
//       done: {
//         name: "Done",
//         tasks: [{ id: uuidv4(), content: "Task 3" }],
//       },
//     },
//   },
//   // More boards can be added here...
// ];

export const App: React.FC = () => {
  const { data: todos, isLoading, isError } = useGetTodosQuery();
  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleCreateTodo = async (content: string) => {
    await createTodo({ content, status: "ToDo" });
  };

  const handleUpdateTodo = async (id: string, status: string) => {
    await updateTodo({ id, status });
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Logic for changing the status of the task
    if (todos) {
      const todo = todos[source.index];
      const newStatus = destination.droppableId as Todo["status"];
      handleUpdateTodo(todo.id, newStatus);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading todos</p>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex" }}>
        {["ToDo", "In Progress", "Done"].map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  margin: "8px",
                  padding: "8px",
                  width: "250px",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <h3>{status}</h3>
                {todos
                  ?.filter((todo) => todo.status === status)
                  .map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            padding: "8px",
                            margin: "4px 0",
                            backgroundColor: "#fff",
                            borderRadius: "4px",
                          }}
                        >
                          {todo.content}
                          <button onClick={() => handleDeleteTodo(todo.id)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Add a new task"
          onKeyDown={(e) => {
            if (e.key === "Enter")
              handleCreateTodo((e.target as HTMLInputElement).value);
          }}
        />
      </div>
    </DragDropContext>
  );
};
