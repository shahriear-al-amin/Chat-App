import { createBrowserRouter, RouterProvider } from "react-router";
import Rootlayout from "./layout/rootlayout";
import Home from "./Home";
import About from "./About";
import Signup from "./Signup";
import Login from "./Login";
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
