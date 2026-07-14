import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

function MainLayout() {
    return (
        <>
            <Navbar />

            <main className="mx-auto min-h-screen max-w-7xl px-6 py-8">
                <Outlet />
            </main>
        </>
    );
}

export default MainLayout;