import {React, useState} from 'react'
import HeroSection from './HeroSection'
import Footer from './Footer'
import Middle from './Middle'
import Navbar from './Navbar'

export default function Homepage() {
    return (
        <>
            <Navbar/>  
            <HeroSection/>
            <Middle/>
            <Footer/>
        </>
    )
}
