import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './Component/Home/Home.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import AllScholarships from './Component/AllScholarships/AllScholarships.jsx'
import Root from './Layout/Root.jsx'
import AboutUs from './Component/AboutUs/AboutUs.jsx'
import Contact from './Component/Contact/Contact.jsx'
import ErrorPage from './Component/ErrorPage/ErrorPage.jsx'
import Login from './Component/Login/Login.jsx'
import Register from './Component/Register/Register.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/all-scholarships',
        element: <AllScholarships />
      },
      {
        path: '/about-us',
        element: <AboutUs />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ],
    errorElement: <ErrorPage />
  },
  {
    path: '*',
    element: <ErrorPage />
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
  
)
