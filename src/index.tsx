import { createRoot } from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import {router} from "./router";

// Clear the existing HTML content
document.body.innerHTML = '<div id="root"></div>';

// Render your React component instead
const root = createRoot(document.getElementById("root") as Element);
root.render(<RouterProvider router={router} />);
