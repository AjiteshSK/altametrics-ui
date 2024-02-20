import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./provider/AuthProvider";
import { router } from "./router";

const App = () => {
  return (
    <div id="app" className="App w-full">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
};

export default App;
