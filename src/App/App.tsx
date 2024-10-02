import { useGetTodosQuery } from "../redux/slice/todoSlice";
import { GlobalStyle } from "../GlobalStyle.jsx";

import "../App.css";
import { Board } from "../components/Board/Board";

export const App: React.FC = () => {
  const { data: todos, isLoading, isError } = useGetTodosQuery();

  if (isLoading)
    return (
      <p>
        Loading... <br /> The server is free so please be patient :)
      </p>
    );

  return (
    <>
      <GlobalStyle />
      <Board todos={todos} />
    </>
  );
};
