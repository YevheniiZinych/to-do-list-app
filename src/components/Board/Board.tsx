import { useState, useEffect } from "react";
import {
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  Todo,
} from "../../redux/slice/todoSlice.jsx";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

import {
  Container,
  Boards,
  BoardTitle,
  CardItem,
  CardTitle,
  CardDescription,
  CardBtnWrapp,
  DeleteBtn,
  BoardList,
} from "./Board.styled.jsx";
import { ModalMain } from "../Modal/Modal.tsx";

interface UpdateStatus {
  status: string;
}

interface TodoData {
  createdAt: string;
  description: string;
  id: string;
  status: string;
  title: string;
  updatedAt: string;
}

interface BoardProps {
  status: number;
  success: boolean;
  todos: {
    data: TodoData[];
  };
}

export const Board: React.FC<BoardProps> = ({ todos }) => {
  const { data } = todos;

  const [localTodos, setLocalTodos] = useState<TodoData[]>(data);

  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  useEffect(() => {
    setLocalTodos(data);
  }, [data]);

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
  };

  const handleUpdateTodo = async (id: string, data: UpdateStatus) => {
    await updateTodo({ id, data });
  };

  const reorder = (list: TodoData[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const reorderedTodos = reorder(
        localTodos.filter((todo) => todo.status === source.droppableId),
        source.index,
        destination.index
      );

      setLocalTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.status === source.droppableId ? reorderedTodos.shift() : todo
        )
      );
    } else {
      // Якщо картка переміщується в іншу колонку
      const draggedTodo = data.find((todo) => todo.id === result.draggableId);

      if (draggedTodo) {
        const newStatus = destination.droppableId as Todo["status"];
        handleUpdateTodo(draggedTodo.id, { status: newStatus });
      }
    }
  };

  return (
    <main>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {["ToDo", "In Progress", "Done"].map((status) => (
            <>
              <Droppable key={status} droppableId={status}>
                {(provided) => (
                  <Boards {...provided.droppableProps} ref={provided.innerRef}>
                    <BoardTitle>{status}</BoardTitle>
                    <BoardList>
                      {localTodos
                        ?.filter((todo) => todo.status === status)
                        .map(({ id, title, description }, index) => (
                          <Draggable key={id} draggableId={id} index={index}>
                            {(provided) => (
                              <CardItem
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                }}
                              >
                                <CardTitle>{title}</CardTitle>
                                <CardDescription>{description}</CardDescription>
                                <CardBtnWrapp>
                                  <ModalMain
                                    text={"Edit card"}
                                    id={id}
                                    name={title}
                                    descr={description}
                                  />

                                  <DeleteBtn
                                    onClick={() => handleDeleteTodo(id)}
                                  >
                                    Delete
                                  </DeleteBtn>
                                </CardBtnWrapp>
                              </CardItem>
                            )}
                          </Draggable>
                        ))}
                    </BoardList>

                    <ModalMain status={status} text={"Add card"} />

                    {provided.placeholder}
                  </Boards>
                )}
              </Droppable>
            </>
          ))}
        </Container>
      </DragDropContext>
    </main>
  );
};
