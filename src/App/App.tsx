import { useGetTodosQuery } from "../redux/slice/todoSlice";
import "../App.css";
import { Board } from "../components/Board/Board";
import { GlobalStyle } from "../GlobalStyle";
export const App: React.FC = () => {
  const { data: todos, isLoading } = useGetTodosQuery();

  if (isLoading)
    return (
      <p>
        Loading... <br /> The server is free so please be patient :)
      </p>
    );

  return (
    <>
      <GlobalStyle />
      <Board data={todos?.data || []} />
    </>
  );
};
