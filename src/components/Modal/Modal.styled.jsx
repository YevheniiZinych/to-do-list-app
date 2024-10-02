import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { MainBtn } from "../../style-templates/MainBtn.styled";

export const Form = styled.form`
  display: flex;

  flex-direction: column;
`;

export const OpenBtn = styled(MainBtn)``;

export const StyledTextField = styled(TextField)(() => ({
  "& .MuiInputBase-root": {
    height: "40px",
    marginBottom: "15px",
  },
  // "& .MuiInputBase-root": {},

  "& .MuiFormLabel-root": {
    top: "-7px",
  },
}));

export const AddBtn = styled(MainBtn)``;

export const CloseBtn = styled(MainBtn)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 5px;
  top: 3px;

  height: 25px;
  width: 25px;
  border-radius: 50%;

  border: none;

  &:hover {
    color: #fff;
    background-color: #ed0d0d;
    box-shadow: rgba(228, 10, 10, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }
`;
