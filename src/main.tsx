import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./App/App.tsx";
import "./index.css";
import { store } from "./redux/store.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
