import { useContext, useEffect, useState } from 'react';
import './App.scss';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/home/home";
import Listings from "./pages/listings/listings";
import About from "./pages/static/about";
import Contact from "./pages/static/contact";
import Terms from "./pages/static/terms";
import Login from "./pages/login/login";
import Profile from "./pages/profile/profile";
import Admin from "./pages/profile/admin";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Details from './pages/details/details';
import Form from './pages/form/form';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Edit from './pages/edit/edit';
import HouseEdit from './pages/edit/houseEdit';
import CarEdit from './pages/edit/carEdit';
import HouseForm from './pages/form/houseForm';
import CarForm from './pages/form/carForm';
import VerifyForm from './pages/contact/verifyForm';
import { LangContext } from './context/LangContext'
import { AuthContext } from './context/AuthContext';
import { OnLogContext } from './context/OnLogContext';
import CookieConsent from "react-cookie-consent";

function App() {
  const [lang, setLang] = useState("En");
  const [onLog, setOnLog] = useState(false);
  const queryClient = new QueryClient();
  const { user } = useContext(AuthContext);

  const Layout = () => {
    return (
      <div className="app min-w-[320px] overflow-x-hidden">
        <QueryClientProvider client={queryClient}>
          <div>
            <script src="js/wow.min.js"></script>
            <script src="https://kit.fontawesome.com/4d59ceec4b.js" crossOrigin="anonymous"></script>
            <script>
              new WOW().init();
            </script>
            <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
          </div>
          <Navbar />
          <Outlet />
          <Footer />
          <CookieConsent
            location="bottom"
            buttonText="Accept"
            cookieName="myCookieConsentCookie"
            style={{ background: "#333" }}
            buttonStyle={{ color: "#fff", backgroundColor: "#4CAF50" }}
            expires={150}
          >
            This website uses cookies to enhance the user experience.
          </CookieConsent>
        </QueryClientProvider>
        {/* <Footer /> */}
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/listings",
          element: <Listings />,
        },
        {
          path: "/listings/:id",
          element: <Listings />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/form",
          element: <Form />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/terms",
          element: <Terms />,
        },
        {
          path: "/details/:id",
          element: <Details />,
        },
        {
          path: "/house-edit/:id",
          element: <HouseEdit />,
        },
        {
          path: "/car-edit/:id",
          element: <CarEdit />,
        },
        {
          path: "/house-form",
          element: <HouseForm />,
        },
        {
          path: "/car-form",
          element: <CarForm />,
        },
        {
          path: "/verify/:id",
          element: <VerifyForm />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
      ],
    },
  ]);

  return (
    <OnLogContext.Provider value={{ onLog, setOnLog }}>
      <LangContext.Provider value={{ lang, setLang }}>
        <RouterProvider router={router} />
      </LangContext.Provider>
    </OnLogContext.Provider>

  );
}

export default App
