import React, { useContext, useEffect, useState } from 'react';


import axios from 'axios';


import AdminDashboard from './Admin Dashboard/AdminDashboard';
import UserDashboard from './User Dashboard/UserDashboard';
import { AuthContext } from '../../Provider/AuthProvider';
import Loading from '../../Components/Loading/Loading';

const Dashboard = () => {

    const { user } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!user?.email) return;

        axios.get(`https://petnest-server-site.vercel.app/users/profileDetails/${user.email}`)
            .then(res => {
                 console.log('Profile data:', res.data); 
                setCurrentUser(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [user?.email]);

    if (loading) return <Loading></Loading>;


    const userRole = currentUser?.role;
    // console.log(userRole)


    return (
        <div>
            {
                userRole === 'admin'
                    ? <AdminDashboard></AdminDashboard>
                    : <UserDashboard></UserDashboard>
            }
        </div>
    );
};

export default Dashboard;