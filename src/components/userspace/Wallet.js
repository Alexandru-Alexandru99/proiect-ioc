import React, { useState, useEffect, useContext } from 'react'
import LeftMenu from "./LeftMenu"
import { Form, Button, Card, Alert, CardDeck, Table } from "react-bootstrap"
import {XYPlot, LineSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, VerticalBarSeriesCanvas, HorizontalBarSeries, DiscreteColorLegend, makeWidthFlexible, LabelSeries, MarkSeries} from 'react-vis';
import "./Wallet.css"
import "./LeftMenu.css"
import axios from "axios"
import { AuthContext } from "../../contexts/AuthContext";

export default function Wallet() {
    const FlexibleXYPlot = makeWidthFlexible(XYPlot); 
    const [click, setClick] = useState(false);
  
    const handleClick = () => setClick(!click);
    const {value, setValue} = useContext(AuthContext);

    const [useCanvas,setUseCanvas] = useState(false);

    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;

    const [error, setError] = useState("")

    const currencyValue1 = 15000;
    const currencyValue2 = 35000;
    const currencyValue3 = 50000;

    const [euroValue1, setEuroValue1] = useState(currencyValue1);
    const [euroValue2, setEuroValue2] = useState(currencyValue2);
    const [euroValue3, setEuroValue3] = useState(currencyValue3);

    const [coin1Status, setCoin1Status] = useState(true);
    const [coin2Status, setCoin2Status] = useState(false);
    const [coin3Status, setCoin3Status] = useState(false);

    const currentUser = {
        username: window.localStorage.getItem('name'),
    }

    const handleCurrency1 = (e) => {
        setEuroValue1(e.target.value*currencyValue1);
    };

    const handleCurrency2 = (e) => {
        setEuroValue2(e.target.value*currencyValue2);
        console.log(e.target.value*currencyValue2)
    };

    const handleCurrency3 = (e) => {
        setEuroValue3(e.target.value*currencyValue3);
    };

    const handleCoinChange = (e) => {
        setCoin1Status(true);
        setCoin2Status(false);
        setCoin3Status(false);
    };
    const handleCoinChange1 = (e) => {
        setCoin1Status(false);
        setCoin2Status(true);
        setCoin3Status(false);
    };
    const handleCoinChange2 = (e) => {
        setCoin1Status(false);
        setCoin2Status(false);
        setCoin3Status(true);
    };

    const [chartData, setChartData] = useState([])

    const [amount, setAmount] = useState(0);

    const handleAmount = (e) => {
        setAmount(e.target.value);
        console.log(amount);
    };

    const [userWallet,setUserWallet]=useState([]);

    const [wallets,setWallets]=useState([]);

    useEffect(() => {
        axios.all([
            axios.post("http://localhost:5000/wallet/user", currentUser),
            axios.get("http://localhost:5000/wallet/")  
        ])
        .then(axios.spread((response1, response2) => {
            setUserWallet(response1.data);
            setWallets(response2.data);

            var echTotal = 0;
            var btcTotal = 0;
            var atcTotal = 0;
            response2.data.map(({ ech, btc, atc }, index) => {
                echTotal = echTotal + ech;
                btcTotal = btcTotal + btc;
                atcTotal = atcTotal + atc;
            })
            console.log(btcTotal);
            console.log(echTotal);
            setChartData([
                {x: 'ECH', y: echTotal},
                {x: 'BTC', y: btcTotal},
                {x: 'ATC', y: atcTotal}
            ]);
            
            
        }));
        
        

    }, []);

    function handleSubmit(e) {
        setError("")
        e.preventDefault()
        if(coin1Status == true) {
            const currentBuy = {
                username: value,
                coin: "ech",
                amount: amount 
            }
            const updateItems = {
                type: "coins",
                amount: amount
            }
            axios.all([
                axios.post("http://localhost:5000/wallet/buy",currentBuy), 
                axios.post("http://localhost:5000/items/bought",updateItems) 
            ])   
            .then(axios.spread((response1, response2) => {
                if(response2.data === "Succesfully update!" && response1.data === "Transaction completed!") {
                    window.location.reload()
                }
                else {
                    if(response2.data !== "Succesfully update!") {
                        setError(response2.data);
                    }
                    else {
                        setError(response1.data);
                    }
                }
            })); 
        }
        if(coin2Status == true) {
            const currentBuy = {
                username: value,
                coin: "btc",
                amount: amount 
            }
            const updateItems = {
                type: "coins",
                amount: amount
            }
            axios.all([
                axios.post("http://localhost:5000/wallet/buy",currentBuy), 
                axios.post("http://localhost:5000/items/bought",updateItems) 
            ])   
            .then(axios.spread((response1, response2) => {
                if(response2.data === "Succesfully update!" && response1.data === "Transaction completed!") {
                    window.location.reload()
                }
                else {
                    if(response2.data !== "Succesfully update!") {
                        setError(response2.data);
                    }
                    else {
                        setError(response1.data);
                    }
                }
            })); 
        }
        if(coin3Status == true) {
            const currentBuy = {
                username: value,
                coin: "atc",
                amount: amount 
            }
            const updateItems = {
                type: "coins",
                amount: amount
            }
            axios.all([
                axios.post("http://localhost:5000/wallet/buy",currentBuy), 
                axios.post("http://localhost:5000/items/bought",updateItems) 
            ])   
            .then(axios.spread((response1, response2) => {
                if(response2.data === "Succesfully update!" && response1.data === "Transaction completed!") {
                    window.location.reload()
                }
                else {
                    if(response2.data !== "Succesfully update!") {
                        setError(response2.data);
                    }
                    else {
                        setError(response1.data);
                    }
                }
            })); 
        }
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
            <div className={click ? 'w-new' : 'w-body'}>
                <header class="w-header">
                    <div className='left-menu-icon' onClick={handleClick}>
                        <i className={click ? 'fa fa-bars' : 'fa fa-bars'} id='btn'/>
                    </div>
                    <h5 className="username"><span className="user-icon"></span>{window.localStorage.getItem('name')}</h5>
                </header>
                <div class="w-content">
                    <Card responsive>
                        <Card.Header as="h5">Coins bought</Card.Header>
                        <FlexibleXYPlot
                        className="clustered-stacked-bar-chart-example"
                        xType="ordinal"
                        stackBy="y"
                        height={300}
                        yDomain={[0, 3000]}
                        >
                        <DiscreteColorLegend
                            style={{position: 'absolute', left: '50px', top: '10px'}}
                            orientation="horizontal"
                            items={[
                            {
                                title: 'Coins',
                                color: '#12939A'
                            }]}
                        />
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis />
                        <BarSeries color="#12939A" data={chartData}/>
                        </FlexibleXYPlot>
                    </Card>
                    <CardDeck className="w-section">
                        <Card>
                            <br></br>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Holdings</Card.Title>
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
                            <Card>
                                <Card.Body>
                                    <Card.Title>Currency</Card.Title>
                                    <Table responsive >
                                    <thead>
                                        <tr>
                                        <th>#</th>
                                        <th>Coins</th>
                                        <th>Euro</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td><span className="firstCoin"></span></td>
                                        <td><Form.Control type="number" defaultValue="1" onChange={handleCurrency1}/></td>
                                        <td><Form.Control type="number" value={euroValue1}/></td>
                                        </tr>
                                        <tr>
                                        <td><span class="secondCoin"></span></td>
                                        <td><Form.Control type="number" defaultValue="1" onChange={handleCurrency2}/></td>
                                        <td><Form.Control type="number" value={euroValue2}/></td>
                                        </tr>
                                        <tr>
                                        <td><span class="thirdCoin"></span></td>
                                        <td><Form.Control type="number" defaultValue="1" onChange={handleCurrency3}/></td>
                                        <td><Form.Control type="number" value={euroValue3}/></td>
                                        </tr>
                                    </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                            <br></br>
                        </Card>
                        <Card className="buyCard">
                            <Card.Body>
                            <h2 className="text-center mb-4">Buy alien coins</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="cardNumber">
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control
                                    type="tel" pattern="[0-9\s]{13,19}" placeholder="xxxx xxxx xxxx xxxx" required
                                />
                                </Form.Group>
                                <Form.Group id="cvv">
                                <Form.Label>CVV</Form.Label>
                                <Form.Control
                                    type="tel" required
                                />
                                </Form.Group>
                                <Form.Group id="expirationDate">
                                <Form.Label>Expiration date</Form.Label>
                                <Form.Control
                                    type="date" required
                                />
                                </Form.Group>
                                <Form.Group id="cardName">
                                <Form.Label>Owner name</Form.Label>
                                <Form.Control
                                    type="text" required
                                />
                                </Form.Group>
                                <Form.Group id="coinType">
                                <Form.Label className="coin1">ECH</Form.Label>
                                <input className="inputcoin"
                                    type="radio" checked={coin1Status} onChange={handleCoinChange}
                                />
                                <Form.Label className="coin">BTC</Form.Label>
                                <input className="inputcoin"
                                    type="radio" checked={coin2Status} onChange={handleCoinChange1}
                                />
                                <Form.Label className="coin">ATC</Form.Label>   
                                <input className="inputcoin"
                                    type="radio" checked={coin3Status} onChange={handleCoinChange2}
                                />
                                </Form.Group>
                                <Form.Group id="amount">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                    type="number" required onChange={handleAmount}
                                />
                                </Form.Group>
                                <Button type="submit">
                                Buy
                                </Button>
                            </Form>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </div>
            </div>
        </>
    )
}
