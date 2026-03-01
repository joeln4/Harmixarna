import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AboutPage from "../pages-temp/AboutPage/AboutPage";
import BookingPage from "../pages-temp/BookingPage/BookingPage";
import ContactPage from "../pages-temp/ContactPage/ContactPage";
import HomePage from "../pages-temp/HomePage/HomePage";
import ConfirmationPage from "../pages-temp/ConfirmationPage/ConfirmationPage";
import NotFoundPage from "../pages-temp/NotFoundPage/NotFoundPage";

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
