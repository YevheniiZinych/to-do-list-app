import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import {
  useCreateTodoMutation,
  useUpdateTodoMutation,
} from "../../redux/slice/todoSlice";
import {
  Form,
  OpenBtn,
  StyledTextField,
  AddBtn,
  CloseBtn,
} from "./Modal.styled.jsx";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export interface ModalMain {
  status?: string;
  text: string;
  id: string;
  name: string;
  descr: string;
}

export interface TodoData {
  data: {
    title: string;
    description: string;
    status?: string;
  };
}

export interface UpdateTodo {
  title: string;
  description: string;
  status?: string;
}

export const ModalMain: React.FC<ModalMain> = ({
  status,
  text,
  id,
  descr,
  name,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (text === "Edit card") {
      setTitle(name);
      setDescription(descr);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [name, descr, text]);

  const handleCreateTodo = async (data: TodoData) => {
    await createTodo(data);
  };

  const handleUpdateTodo = async (id: string, data: UpdateTodo) => {
    await updateTodo({ id, data });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "title":
        return setTitle(value);
      case "description":
        return setDescription(value);
      default:
        return;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text === "Edit card") {
      handleUpdateTodo(id, { title, description });
    } else {
      const { elements } = e.currentTarget as HTMLFormElement & {
        elements: { title: HTMLInputElement; description: HTMLInputElement };
      };

      handleCreateTodo({
        title: elements.title.value,
        description: elements.description.value,
        status,
      });
    }

    setTitle("");
    setDescription("");
    setOpen(false);
  };

  return (
    <div>
      <OpenBtn onClick={handleOpen} text={text}>
        {text}
      </OpenBtn>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Form onSubmit={handleSubmit}>
            <StyledTextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              type="text"
              required
              name="title"
              value={title}
              onChange={handleChange}
            />
            <StyledTextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              type="text"
              name="description"
              value={description}
              onChange={handleChange}
            />

            <AddBtn type="submit">{text}</AddBtn>
            <CloseBtn onClick={handleClose}>X</CloseBtn>
          </Form>
        </Box>
      </Modal>
    </div>
  );
};
