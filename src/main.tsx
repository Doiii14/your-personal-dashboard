import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import { store, AppDispatch } from "./redux/store";
import { fetchNews } from "./redux/newsSlice";
import "./index.css";
import App from "./App.tsx";

// Component per caricare le news all'avvio
const AppWithNews = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return <App />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppWithNews />
    </Provider>
  </StrictMode>
);
