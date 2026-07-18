import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { ToastContainer } from "react-toastify";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import CreateBlog from "./pages/CreateBlog/CreateBlog";
import EditBlog from "./pages/EditBlog/EditBlog";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import NotFound from "./pages/NotFound/NotFound";

import AdminLayout from "./layouts/AdminLayout";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminBlogs from "./pages/Admin/AdminBlogs";
import AdminCategories from "./pages/Admin/AdminCategories";

import AdminProtectedRoute from "./components/AdminProtectedRoute/AdminProtectedRoute";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route element={<MainLayout />}>

                <Route
    path="/admin"
    element={
        <AdminProtectedRoute>
            <AdminLayout />
        </AdminProtectedRoute>
    }
>

    <Route
        index
        element={<AdminDashboard />}
    />

    <Route
        path="users"
        element={<AdminUsers />}
    />

    <Route
        path="blogs"
        element={<AdminBlogs />}
    />

    <Route
        path="categories"
        element={<AdminCategories />}
    />

</Route>

                    {/* Public Routes */}
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

                    {/* Protected Routes */}
                    <Route
                        path="/create-blog"
                        element={
                            <ProtectedRoute>
                                <CreateBlog />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/edit-blog/:id"
                        element={
                            <ProtectedRoute>
                                <EditBlog />
                            </ProtectedRoute>
                        }
                    />
                    <Route
    path="/profile/change-password"
    element={
        <ProtectedRoute>
            <ChangePassword />
        </ProtectedRoute>
    }
/>

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                     <Route
                        path="/profile/edit"
                        element={
                            <ProtectedRoute>
                                <EditProfile />
                            </ProtectedRoute>
                        }
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