import styled from "styled-components";

export const MainBtn = styled.button`
  display: inline-block;

  background-color: transparent;
  border: 2px solid #1a1a1a;
  border-radius: 15px;
  box-sizing: border-box;
  color: #3b3b3b;

  padding: 7px;
  text-align: center;
  text-decoration: none;

  outline: none;

  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: transform;

  cursor: pointer;

  font-size: 16px;
  font-weight: 600;
  line-height: normal;

  appearance: none;

  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);

  &:disabled {
    pointer-events: none;
  }

  &:hover {
    color: #fff;
    background-color: #1a1a1a;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;
