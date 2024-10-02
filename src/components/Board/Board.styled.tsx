import styled from "styled-components";
import { MainBtn } from "../../style-templates/MainBtn.styled";

export const Container = styled.div`
  display: flex;
  justify-content: center;

  gap: 15px;

  max-width: 1200px;

  margin: 0 auto;
`;

export const Boards = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 90dvh;
  flex-basis: calc((90% - 15px * 2) / 3);

  padding: 30px 8px 10px;
  margin-top: 50px;

  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);

  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;
export const BoardTitle = styled.h3`
  position: fixed;
  top: 15px;

  font-size: 25px;

  color: #46c336;
`;

export const BoardList = styled.ul`
  width: 100%;
`;

export const CardItem = styled.div`
  padding: 8px;
  margin: 4px 0px;

  background: rgba(121, 111, 111, 0.81);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(121, 111, 111, 0.3);
`;

export const CardTitle = styled.p`
  width: 100%;

  padding: 3px;

  background-color: #ffffff;
  box-shadow: inset 1px 0px 61px -37px rgba(0, 0, 0, 0.75);
  border-radius: 4px;

  word-wrap: break-word;
`;

export const CardDescription = styled.p`
  width: 100%;

  word-wrap: break-word;
`;

export const CardBtnWrapp = styled.div`
  display: flex;
  gap: 5px;

  justify-content: flex-end;
`;

export const DeleteBtn = styled(MainBtn)``;
