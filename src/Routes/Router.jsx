import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import About from '../Pages/About/About';
import ContactPage from '../Pages/Contact Us/ContactUs';
import PetList from '../Pages/PetList/PetList';
import PetDetails from '../Pages/PetList/Pet Details/PetDetails';
import Random from '../Components/Random';
import Error from '../Components/Error';
import DonationCampaign from '../Pages/Donation Campaign/DonationCampaign';
import DonationDetals from '../Pages/Donation Campaign/Donation Details/DonationDetals';
import DonationDetails from '../Pages/Donation Campaign/Donation Details/DonationDetals';
import Dashboard from '../Pages/Dashboard/Dashboard';
import UserDashboard from '../Pages/Dashboard/User Dashboard/UserDashboard';
import AdminDashboard from '../Pages/Dashboard/Admin Dashboard/AdminDashboard';

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
            },
            {
                path:'petlist',
                element:<PetList></PetList>
            },
            {
                path:'donationCampaign',
                element:<DonationCampaign></DonationCampaign>
            },
            {
                path:'petDetails/:id',
                element:<PetDetails></PetDetails>
            },
            {
                path:'donationDetails/:id',
                element:<DonationDetails></DonationDetails>
            },
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
    {
        path:'userDashboard',
        element:<UserDashboard></UserDashboard>
    },
    {
        path:'dashboard',
        element:<Dashboard></Dashboard>
    },
    {
        path:'AdminDashboard',
        element:<AdminDashboard></AdminDashboard>
    },
    {
        path:'*',
        element:<Error></Error>
    },
])

export default Router;