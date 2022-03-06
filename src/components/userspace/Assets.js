import React, { useRef, useState, useEffect, useContext } from "react"
import LeftMenu from "./LeftMenu"
import { Form, Button, Card, Alert, CardGroup, CardDeck, Table } from "react-bootstrap"
import Select from 'react-select'
import { useHistory } from "react-router-dom"
import "./Assets.css"
import axios from "axios"
import { AuthContext } from "../../contexts/AuthContext";

export default function Assets() {

    const [click, setClick] = useState(false);
  
    const handleClick = () => setClick(!click);
    
    const history = useHistory()
    const {value, setValue} = useContext(AuthContext);
    setValue(window.localStorage.getItem('name'));

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    
    const assets = [
        { value: 'lands', label: 'Lands' },
        { value: 'houses', label: 'Houses' }
    ]

    const planets = [
        { value: 'mars', label: 'Mars' },
        { value: 'uranus', label: 'Uranus' },
        { value: 'moon', label: 'Moon' },
        { value: 'saturn', label: 'Saturn' },
        { value: 'jupiter', label: 'Jupiter' },
        { value: 'neptun', label: 'Neptun' },
        { value: 'pluto', label: 'Pluto' }
    ]

    const stocks = [
        { value: 'transport', label: 'Transport' },
        { value: 'medicine', label: 'Medicine' },
        { value: 'education', label: 'Education' },
        { value: 'infrastructure', label: 'Infrastructure' },
        { value: 'tesla', label: 'Tesla' },
        { value: 'spaceX', label: 'SpaceX' },
        { value: 'agriculture', label: 'Agriculture' }
    ]

    const options = [
        { value: 'assets', label: 'Assets' },
        { value: 'stocks', label: 'Stocks' }
    ]

    const [list, setList] = useState([
        { value: '', label: '' }
    ]);

    const [extraOption, setExtraOption] = useState('');

    
    const [type, setType] = useState("");

    const handleChange = (e) => {
        setType(e.value);
        if (e.value == "stocks") {
            setList(stocks);
            setExtraOption('');
        }
        if (e.value == "assets") {
            setList(assets);
            setExtraOption('set');
        }
    };

    const [type1, setType1] = useState("");

    const handleChange1 = (e) => {
        setType1(e.value);
    };

    const [type2, setType2] = useState("");

    const handleChange2 = (e) => {
        setType2(e.value);
    };

    const [userLands,setUserLands]=useState([]);

    const [userHouses,setUserHouses]=useState([]);

    const [userStocks,setUserStocks]=useState([]);

    const [userWallet,setUserWallet]=useState([]);

    const currentUser = {
        username: window.localStorage.getItem('name'),
    }

    useEffect(() => {
        axios.all([
            axios.post("http://localhost:5000/stocks/user", currentUser),
            axios.post("http://localhost:5000/houses/user", currentUser),
            axios.post("http://localhost:5000/lands/user", currentUser),
            axios.post("http://localhost:5000/wallet/user", currentUser)
        ])
        .then(axios.spread((response1, response2, response3, response4) => {
            setUserStocks(response1.data);
            setUserHouses(response2.data);
            setUserLands(response3.data);
            setUserWallet(response4.data);
        }));
    }, []);

    const [amount, setAmount] = useState(0);

    const handleChange3 = (e) => {
        setAmount(e.target.value);
        console.log(amount);
    };

    function handleSubmit(e) {
        e.preventDefault()
        setError("");
        if((type && type2) || (type && type1 && type2)) {
            if(type == "stocks") {
                const currentSell = {
                    username: window.localStorage.getItem('name'),
                    stock: type2,
                    amount: amount
                }
                console.log(currentSell)
                const updateItems = {
                    type: "stocks",
                    amount: amount
                }
                axios.all([
                    axios.post("http://localhost:5000/stocks/sell",currentSell), 
                    axios.post("http://localhost:5000/items/sold",updateItems), 
                    axios.post("http://localhost:5000/wallet/update",currentSell) 
                ])   
                .then(axios.spread((response1, response2, response3) => {
                    if(response1.data === "Can't sell!") {
                        setError(response1.data);
                    }
                    else {
                        console.log(response2.data);
                        window.location.reload();
                    }
                })); 
            }

            if(type == "assets") {
                if(type2 == "lands") {
                    const currentSell = {
                        username: window.localStorage.getItem('name'),
                        planet: type1,
                        amount: amount
                    }
                    console.log(currentSell)
                    const updateItems = {
                        type: "lands",
                        amount: amount
                    }
                    axios.all([
                        axios.post("http://localhost:5000/lands/sell",currentSell), 
                        axios.post("http://localhost:5000/items/sold",updateItems), 
                        axios.post("http://localhost:5000/wallet/update",currentSell)  
                    ])   
                    .then(axios.spread((response1, response2) => {
                        if(response1.data === "Can't sell!") {
                            setError(response1.data);
                        }
                        else {
                            console.log(response2.data);
                            window.location.reload();
                        }
                    })); 
                }
                if(type2 == "houses") {
                    const currentSell = {
                        username: window.localStorage.getItem('name'),
                        planet: type1,
                        amount: amount
                    }
                    console.log(currentSell)
                    const updateItems = {
                        type: "houses",
                        amount: amount
                    }
                    axios.all([
                        axios.post("http://localhost:5000/houses/sell",currentSell), 
                        axios.post("http://localhost:5000/items/sold",updateItems), 
                        axios.post("http://localhost:5000/wallet/update",currentSell)  
                    ])   
                    .then(axios.spread((response1, response2) => {
                        if(response1.data === "Can't sell!") {
                            setError(response1.data);
                        }
                        else {
                            console.log(response2.data);
                            window.location.reload();
                        }
                    })); 
                }
            }
        }
        else {
            setError("Fail!")
        }
    
        setLoading(false)
    }


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
            <div className={click ? 'a-new' : 'a-body'}>
                <header class="a-header">
                    <div className='left-menu-icon' onClick={handleClick}>
                        <i className={click ? 'fa fa-bars' : 'fa fa-bars'} id='btn'/>
                    </div>
                    <h5 className="username"><span className="user-icon"></span>{window.localStorage.getItem('name')}</h5>
                </header>
                <div class="a-content">
                    <CardDeck>
                        <Card>
                            <Card.Body>
                                <Card.Title>Assets</Card.Title>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                        <th>#</th>
                                        <th>Planet</th>
                                        <th>Lands</th>
                                        <th>Houses</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td><span className="planet1"></span></td>
                                        <td>Mars</td>
                                        <td>{userLands.mars}</td>
                                        <td>{userHouses.mars}</td>
                                        </tr>
                                        <tr>
                                        <td><span class="planet2"></span></td>
                                        <td>Uranus</td>
                                        <td>{userLands.uranus}</td>
                                        <td>{userHouses.uranus}</td>
                                        </tr>
                                        <tr>
                                        <td><span class="planet3"></span></td>
                                        <td>Moon</td>
                                        <td>{userLands.moon}</td>
                                        <td>{userHouses.moon}</td>
                                        </tr>
                                        <tr>
                                        <td><span class="planet4"></span></td>
                                        <td>Saturn</td>
                                        <td>{userLands.saturn}</td>
                                        <td>{userHouses.saturn}</td>
                                        </tr>
                                        <tr>
                                        <td><span class="planet5"></span></td>
                                        <td>Jupiter</td>
                                        <td>{userLands.jupiter}</td>
                                        <td>{userHouses.jupiter}</td>
                                        </tr>
                                        <tr>
                                        <td><span class="planet6"></span></td>
                                        <td>Neptun</td>
                                        <td>{userLands.neptun}</td>
                                        <td>{userHouses.neptun}</td>
                                        </tr>
                                        <tr>
                                        <td><span class="planet7"></span></td>
                                        <td>Pluto</td>
                                        <td>{userLands.pluto}</td>
                                        <td>{userHouses.pluto}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>Stocks</Card.Title>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                        <th>#</th>
                                        <th>Domain</th>
                                        <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td><span className="stock1"></span></td>
                                        <td>Transport</td>
                                        <td>{userStocks.transport}</td>
                                        </tr>
                                        <tr>
                                        <td><span class="stock2"></span></td>
                                        <td>Medicine</td>
                                        <td>{userStocks.medicine}</td>
                                        </tr>
                                        <tr>
                                        <td><span class="stock3"></span></td>
                                        <td>Education</td>
                                        <td>{userStocks.education}</td>
                                        </tr>
                                        <tr>
                                        <td><span class="stock4"></span></td>
                                        <td>Infrastructure</td>
                                        <td>{userStocks.infrastructure}</td>
                                        </tr>
                                        <tr>
                                        <td><span class="stock5"></span></td>
                                        <td>Tesla</td>
                                        <td>{userStocks.tesla}</td>
                                        </tr>
                                        <tr>
                                        <td><span class="stock6"></span></td>
                                        <td>SpaceX</td>
                                        <td>{userStocks.spaceX}</td>
                                        </tr>
                                        <tr>
                                        <td><span class="stock7"></span></td>
                                        <td>Agriculture</td>
                                        <td>{userStocks.agriculture}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                    <br></br>
                    <CardDeck>
                        <Card className="sellCard">
                            <Card.Body>
                            <h2 className="text-center mb-4">Sell assets</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="cardNumber">
                                <Form.Label>Items</Form.Label>
                                <Select options={options} onChange={handleChange} >
                                </Select>
                                {extraOption == 'set' && (
                                    <br></br>
                                )}
                                {extraOption == 'set' && (
                                    <Select options={planets} onChange={handleChange1}/>
                                )}
                                <br></br>
                                <Select options={list} onChange={handleChange2}>
                                </Select>
                                </Form.Group>
                                <Form.Group id="amount">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                    type="number" onChange={handleChange3}
                                />
                                </Form.Group>
                                <Button disabled={loading} type="submit">
                                Sell
                                </Button>
                            </Form>
                            </Card.Body>
                        </Card>
                        <Card>
                            <br></br>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Coins</Card.Title>
                                    <Table responsive>
                                    <tbody>
                                        <tr>
                                        <td><span className="firstCoin"></span></td>
                                        <td>ECH</td>
                                        <td>{userWallet.ech}</td>
                                        </tr>
                                        <tr>
                                        <td><span class="secondCoin"></span></td>
                                        <td>BTC</td>
                                        <td>{userWallet.btc}</td>
                                        </tr>
                                        <tr>
                                        <td><span class="thirdCoin"></span></td>
                                        <td>ATC</td>
                                        <td>{userWallet.atc}</td>
                                        </tr>
                                    </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                            <br></br>
                        </Card>
                    </CardDeck>
                </div>
            </div>
        </>
    )
}
