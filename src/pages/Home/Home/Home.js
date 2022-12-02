import React from 'react';
import AboutUs from '../AboutUs/AboutUs';
import Advertises from '../Advertise/Advertises';
import Carousel from '../Carousel/Carousel';
import Categories from '../Categories/Categories';
import Banner from '../Banner/Banner'
const Home = () => {

    return (
        <>
            <Banner/>
<Carousel />
<Advertises/>
<Categories />
<AboutUs/>

</>
            

       
    );
};

export default Home;