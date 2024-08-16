import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlogScreen from "./screens/BlogScreen";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children:[  {
      path: "blog/:category",
      element: <BlogScreen/>
    },]
  },
]);

const App = () => {
  return (
    <ChakraProvider>
      <RouterProvider router={router}></RouterProvider>
    </ChakraProvider>
  );
};

export default App;
