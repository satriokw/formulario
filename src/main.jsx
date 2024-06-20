import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { MantineProvider, createTheme } from "@mantine/core";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
// import "./index.css";
const theme = createTheme({
  /** Put your mantine theme override here */
});

// Create a new router instance
const router = createRouter({ routeTree });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
