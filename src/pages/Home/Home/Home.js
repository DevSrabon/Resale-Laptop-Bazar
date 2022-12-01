import React from 'react';
import AboutUs from '../AboutUs/AboutUs';
import Advertises from '../Advertise/Advertises';
import Carousel from '../Carousel/Carousel';
import Categories from '../Categories/Categories';

const Home = () => {

    return (
        <>
<Carousel />
<Advertises/>
<Categories />
<AboutUs/>

</>
            

       
    );
};

export default Home;