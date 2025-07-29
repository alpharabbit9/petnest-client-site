import React from 'react';
import Banner from './Banner/Banner';
import WhyChooseUs from './WhyChooseUs/WhyChooseUs';
import About from './About/About';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
            <About></About>
        </div>
    );
};

export default Home;