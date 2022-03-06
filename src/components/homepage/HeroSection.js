import React from 'react'
// import { Button } from './Button'
import './HeroSection.css'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link } from 'react-router-dom';

export default function HeroSection() {
    return (
        <section className='hero-container'>
            <div className="background"></div>
            <h1>
                <span className="icon"></span>
                extraland
            </h1>
            <span className="rover"></span>
            <span className="mars"></span>
            <span className="rocket"></span>
            <span className="secondRocket"></span>
            <div className='hero-btns'>
                <Link to="/signup">
                    <Button className='btns' buttonsStyle='btn--outline'
                    buttonSize='btn--large'>GET STARTED</Button>
                </Link>
            </div>
        </section>
    )
}
