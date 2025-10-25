import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Home";
import About from "./About";
import Signup from "./Signup";
import Login from "./Login";
import Rootlayout from "./layout/Rootlayout";
import Chatbox from "./Chatbox";
const App = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      Component: Rootlayout,
      children: [
        { index: true, Component: Home },
        { path: "/messages", Component: Chatbox },
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
