import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const App = () => {
  return (
    <div id="app" className="App w-full">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;