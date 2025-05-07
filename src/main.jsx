import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./utils/store/store.js";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")).render(
  <SnackbarProvider
    maxSnack={2}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    autoHideDuration={1000}
  >
    <Theme>
      <Provider store={store}>
        <App />
      </Provider>
    </Theme>
  </SnackbarProvider>
);
