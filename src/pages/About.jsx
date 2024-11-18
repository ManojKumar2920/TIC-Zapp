import React from 'react';
import Navbar from '../components/Navbar';
import AboutHero from '../components/AboutHero';
import Ingredients from '../components/Ingredients';
import DietFocused from '../components/DietFocused';
import FindUs from '../components/FindUs';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div>
        <AboutHero />
        <Ingredients />
        <DietFocused />
        <Footer />
    </div>
  )
}

export default About