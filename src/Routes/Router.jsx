import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import About from '../Pages/About/About';
import ContactPage from '../Pages/Contact Us/ContactUs';

const Router = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'about',
                element:<About></About>
            },
            {
                path:'contact',
                element:<ContactPage></ContactPage>
            }
        ]
    },
    {
        path:'login',
        element:<Login></Login>
    },
    {
        path:'register',
        element:<Register></Register>
    },
])

export default Router;