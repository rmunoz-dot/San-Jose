import React from 'react';
import Hero from '../components/Hero';
import QuickLinks from '../components/QuickLinks';
import About from '../components/About';
import Establishments from '../components/Establishments';
import Facilities from '../components/Facilities';
import Pillars from '../components/Pillars';
import Staff from '../components/Staff';
import News from '../components/News';
import Gallery from '../components/Gallery';


const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <QuickLinks />
            <div id="about"><About /></div>
            <Establishments />
            <div id="infraestructura"><Facilities /></div>
            <Pillars />

            <div id="staff"><Staff /></div>
            <div id="news"><News /></div>
            <Gallery />
        </>
    );
};

export default Home;
