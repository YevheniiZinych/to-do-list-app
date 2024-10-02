import { useState, useEffect } from "react";
import {
  useUpdateTodoMutation,
  useDeleteTodoMutation,
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
} from "./Board.styled";

import { ModalMain } from "../Modal/Modal.tsx";
import { DataTodo } from "../../redux/slice/todoSlice.jsx";

interface UpdateStatus {
  status: string;
}

interface BoardProps {
  data: DataTodo[];
}

export const Board: React.FC<BoardProps> = ({ data }) => {
  const [localTodos, setLocalTodos] = useState<DataTodo[]>(data);

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

  const reorder = (list: DataTodo[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const filteredTodos = localTodos.filter(
        (todo) => todo.status === source.droppableId
      );
      const reorderedTodos = reorder(
        filteredTodos,
        source.index,
        destination.index
      );
      const result = localTodos.map((todo) => {
        if (todo.status === source.droppableId) {
          const reorderedTodo = reorderedTodos.shift();
          // Перевірка на undefined перед присвоєнням
          return reorderedTodo ? reorderedTodo : todo;
        }
        return todo;
      });

      setLocalTodos(result);

      // setLocalTodos((prevTodos) =>
      //   prevTodos.map((todo) =>
      //     todo.status === source.droppableId ? reorderedTodos.shift() : todo
      //   )
      // );
    } else {
      const draggedTodo = data.find((todo) => todo.id === result.draggableId);

      if (draggedTodo) {
        const newStatus = destination.droppableId as DataTodo["status"];
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
