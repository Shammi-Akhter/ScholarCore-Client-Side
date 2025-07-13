import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './Component/Home/Home.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import Root from './Layout/Root.jsx'
import AboutUs from './Component/AboutUs/AboutUs.jsx'
import Contact from './Component/Contact/Contact.jsx'
import ErrorPage from './Component/ErrorPage/ErrorPage.jsx'
import Login from './Component/Login/Login.jsx'
import Register from './Component/Register/Register.jsx'
import AllScholarship from './Component/AllScholarship/AllScholarship.jsx'
import ScholarshipDetails from './Component/ScholarshipDetails/ScholarshipDetails.jsx'
import AuthProvider from './context/AuthContext.jsx'
import Checkout from './Component/Checkout.jsx';


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
      },
      {
        path: '/all-scholarship',
        element: <AllScholarship/>
      },
      {
        path:"/scholarship-details/:id",
        element:<ScholarshipDetails/>
      },
      {
        path: '/checkout/:id',
        element: <Checkout />
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
     <AuthProvider>
     <RouterProvider router={router} />
     </AuthProvider>
  </StrictMode>,
  
)
