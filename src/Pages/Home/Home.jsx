import React from 'react';
import Banner from './Banner/Banner';
import WhyChooseUs from './WhyChooseUs/WhyChooseUs';
import About from './About/About';
import Review from './Review/Review';
import FAQ from './FAQ/FAQ';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
            <FAQ></FAQ>
            <About></About>
            <Review></Review>
        </div>
    );
};

export default Home;