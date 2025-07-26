import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div className='font-poppins'>
        <header>
            <Navbar></Navbar>
        </header>
        <main>
            <Outlet></Outlet>
        </main>
        <footer></footer>
        </div>
    );
};

export default Root;