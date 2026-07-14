import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import CreateBlog from "./pages/CreateBlog/CreateBlog";
import EditBlog from "./pages/EditBlog/EditBlog";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<MainLayout />}>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    <Route
                        path="/blogs/:id"
                        element={<BlogDetails />}
                    />

                    <Route
                        path="/create-blog"
                        element={<CreateBlog />}
                    />

                    <Route
                        path="/edit-blog/:id"
                        element={<EditBlog />}
                    />

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                </Route>

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

            <ToastContainer
    position="top-right"
    autoClose={3000}
    theme="colored"
/>
        </BrowserRouter>
    );
}

export default App;