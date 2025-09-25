import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AboutPage from "../Pages/AboutPage/AboutPage";
import BookingPage from "../Pages/BookingPage/BookingPage";
import ContactPage from "../Pages/ContactPage/ContactPage";
import HomePage from "../Pages/HomePage/HomePage";
import ConfirmationPage from "../Pages/ConfirmationPage/ConfirmationPage";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {path: "", element: <HomePage />},
      {path: "about", element: <AboutPage />},
      {path: "booking", element: <BookingPage />},
      {path: "confirmation/:id", element: <ConfirmationPage />},
      {path: "contact", element: <ContactPage />}
    ]
  }]);
