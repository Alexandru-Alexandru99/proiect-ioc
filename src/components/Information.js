import React, { useRef, useState } from "react"
import LeftMenu from "../components/userspace/LeftMenu"
import { Card, Table, CardDeck } from "react-bootstrap"
import "./Information.css"

export default function Information() {

    const [click, setClick] = useState(false);
  
    const handleClick = () => setClick(!click);

    let menu;
    var w = window.innerWidth

    if(click) {
        if(w<=767) {
            menu=<LeftMenu type="lm-new-min"/>
        }
        else
            menu=<LeftMenu type="lm-new"/>
    }
    else {
        if(w<=767) {
            menu=<LeftMenu type="lm-min"/>
        }
        else
            menu=<LeftMenu type="lm"/>
    }
  
    return (
        
        <>
          {menu}
          <div className={click ? 'u-new' : 'u-body'}>
                <header class="u-header">
                    <div className='left-menu-icon' onClick={handleClick}>
                    <i className={click ? 'fa fa-bars' : 'fa fa-bars'} id='btn'/>
                    </div>
                    <h5 className="username"><span className="user-icon"></span>{window.localStorage.getItem('name')}</h5>
                </header>
                <div class="u-table">
                    <h3 className="d-h1">Informations</h3>
                        <Card>
                            <Card.Header as="h5">Lands</Card.Header>
                            <span className="information1"></span>
                            <Card.Body>
                            <Card.Text className="i-text">Buy a land on every planet.</Card.Text>
                            </Card.Body>
                        </Card>
                        <br></br>
                        <Card>
                            <Card.Header as="h5">Houses</Card.Header>
                            <span className="information2"></span>
                            <Card.Body>
                            <Card.Text className="i-text">Buy a house on every planet.</Card.Text>
                            </Card.Body>
                        </Card>
                        <br></br>
                        <Card>
                            <Card.Header as="h5">Stocks</Card.Header>
                            <span className="information3"></span>
                            <Card.Body>
                            <Card.Text className="i-text">There are 7 stocks which you can buy.</Card.Text>
                            </Card.Body>
                        </Card>
                        <br></br>
                        <Card>
                            <Card.Header as="h5">Coins</Card.Header>
                            <span className="information4"></span>
                            <Card.Body>
                            <Card.Text className="i-text">Coins are used for buying lands, houses on different planets and different types of stocks. There are 3 types of coins: ECH, ATC, BTC.</Card.Text>
                            </Card.Body>
                        </Card>
                </div>
            </div> 
        </>
    )
}
