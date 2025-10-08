import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Rootlayout from "./layout/rootlayout";
import Home from "./Home";
import About from "./About";
import Signup from "./Signup";

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
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
