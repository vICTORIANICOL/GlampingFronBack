import { useRoutes } from "react-router-dom";
import { useState } from "react";
import Nav from "./components/nav/Nav";
import Home from "./pages/Home";
import Ophold from "./pages/ophold";
import Kontakt from "./pages/kontakt";
import ActivityPage from "./pages/activitypage/ActivityPage"; // ActivityPage route
import MinListe from "./pages/minliste/MinListe"; // MinListe route
import Footer from "./components/footer/Footer";
import Backoffice from "./pages/Backoffice"; // Backoffice route
import Login from "./pages/Login"; // Login route
import StayDetailPage from "./components/staydetailpage/StayDetailPage";
import ScrollToTop from "./components/ScrollToTop";
import UserCard from "./components/userCard/UserCard";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/ophold", element: <Ophold /> },
    { path: "/kontakt", element: <Kontakt /> },
    { path: "/activitypage", element: <ActivityPage /> },
    { path: "/:stayName", element: <StayDetailPage /> },
    { path: "/minliste", element: <MinListe /> }, // Fixed route: "/minliste"
    {
      path: "/backoffice",
      element: (
        <ProtectedRoute requiredRole="admin">
          <Backoffice />
        </ProtectedRoute>
      ),
    }, // Backoffice route
    { path: "/login", element: <Login /> }, // Login route
  ]);

  return (
    <div className="app">
      <UserCard />
      <ScrollToTop />
      <Nav isOpen={menuOpen} setIsOpen={setMenuOpen} />
      <main className="content">{routes}</main>

      <Footer />

      {/* ToastContainer for toast notifications */}
      <ToastContainer position="bottom-right" autoClose={4000} />
    </div>
  );
}
