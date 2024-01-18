// pages

import { Home } from "./pages/home/Home";
import { Signup } from "./pages/authenticaton/signup";
import { Login } from "./pages/authenticaton/login";

//Layout
import { RootLayout } from "./layouts/RootLayout";
import { AuthProvider } from "./context/AuthProvider";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <RootLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="friends" element={<div>Friends</div>} />
        <Route path="games" element={<div>Games</div>} />
      </Route>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
    </Route>
  ),
  { basename: "/facebook-clone" }
);

export const App = () => {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
};
