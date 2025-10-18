import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Home";
import About from "./About";
import Signup from "./Signup";
import Login from "./Login";
import Rootlayout from "./layout/Rootlayout";
const App = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      Component: Rootlayout,
      children: [
        { index: true, Component: Home },
        { path: "about", Component: About },
      ],
    },
    {
      path: "/signup",
      Component: Signup,
    }
    ,{
      path: "/login",
      Component: Login,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
