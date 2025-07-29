import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import { Toaster } from 'react-hot-toast';import Lenis from '@studio-freight/lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


const Root = () => {

   
    return (
        <div className='font-poppins'>
            <Toaster position="center" reverseOrder={false} />

            <header>

                <Navbar></Navbar>
            </header>
            <main className=' pt-20 md:pt-28'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default Root;