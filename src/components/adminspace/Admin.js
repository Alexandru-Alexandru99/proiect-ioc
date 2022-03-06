import React, { useRef, useState, useEffect } from "react"
import LeftMenu from "../userspace/LeftMenu"
import { Card, Table, CardDeck } from "react-bootstrap"
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, VerticalBarSeriesCanvas, HorizontalBarSeries, DiscreteColorLegend, makeWidthFlexible, LabelSeries, MarkSeries} from 'react-vis';
import "./Admin.css"
import axios from "axios"

export default function Admin() {

    const FlexibleXYPlot = makeWidthFlexible(XYPlot); 

    const [click, setClick] = useState(false);
  
    const handleClick = () => setClick(!click);

    const [useCanvas,setUseCanvas] = useState(false);

    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;

    const [signData, setSignData]=useState([{x:1, y:1}]);

    const [users,setUsers]=useState([]);
    const [singups,setSignups]=useState([]);

    const [stockData, setStockData]=useState([]);
    const [landData, setLandData]=useState([]);
    const [houseData, setHouseData]=useState([]);
    const [coinsData, setCoinsData]=useState([]);

    const [coinsUser, setCoinsUser]=useState([]);
    const [housesUser, setHousesUser]=useState([]);
    const [landsUser, setLandsUser]=useState([]);

    const [itemsCoin, setItemsCoin]=useState(0);
    const [itemsLand, setItemsLand]=useState(0);
    const [itemsHouse, setItemsHouse]=useState(0);
    const [itemsStock, setItemsStock]=useState(0);

    useEffect(async () => {
        await axios.all([
            axios.get("http://localhost:5000/users/"),
            axios.get("http://localhost:5000/stocks/"),
            axios.get("http://localhost:5000/houses/"),
            axios.get("http://localhost:5000/lands/"),
            axios.post("http://localhost:5000/users/byday"),
            axios.get("http://localhost:5000/wallet/"),
            axios.get("http://localhost:5000/items/")
        ])
        .then(axios.spread((response1, response2, response3, response4, response5, response6, response7) => {
            setUsers(response1.data);

            response7.data.map(({ type, cantity }, index) => {

                if(type == "coins") {
                    setItemsCoin(cantity);
                }
                if(type == "houses") {
                    setItemsHouse(cantity);
                }
                if(type == "lands") {
                    setItemsLand(cantity);
                }
                if(type == "stocks") {
                    setItemsStock(cantity);
                }
            })

            var data=[];

            response5.data.map(({ _id, count }, index) => {

                console.log(String(_id.year));
                
                var date = String(_id.year) + '-' + String(_id.month) + '-' + String(_id.day);
                data.push(
                    {x:date, y:count}
                )
            })
            
            console.log(data);
            setSignData(data);

            var echTotal = 0;
            var btcTotal = 0;
            var atcTotal = 0;
            response6.data.map(({ ech, btc, atc }, index) => {
                echTotal = echTotal + ech;
                btcTotal = btcTotal + btc;
                atcTotal = atcTotal + atc;
            })
            console.log(btcTotal);
            console.log(echTotal);
            setCoinsData([
                {x: 'ECH', y: echTotal},
                {x: 'BTC', y: btcTotal},
                {x: 'ATC', y: atcTotal}
            ]);

            var transportTotal = 0;
            var medicineTotal = 0;
            var educationTotal = 0;
            var infrastructureTotal = 0;
            var teslaTotal = 0;
            var spaceXTotal = 0;
            var agricultureTotal = 0;

            response2.data.map(({ transport, medicine, education, infrastructure, tesla, spaceX, agriculture }, index) => {
                transportTotal = transportTotal + transport;
                medicineTotal = medicineTotal + medicine;
                educationTotal = educationTotal + education;
                infrastructureTotal = infrastructureTotal + infrastructure;
                teslaTotal = teslaTotal + tesla;
                spaceXTotal = spaceXTotal + spaceX;
                agricultureTotal = agricultureTotal + agriculture;
            })
            console.log(transportTotal);
            console.log(spaceXTotal);
            console.log(teslaTotal);
            setStockData([
                {x: 'Transport', y: transportTotal},
                {x: 'Medicine', y: medicineTotal},
                {x: 'Education', y: educationTotal},
                {x: 'Infrastructure', y: infrastructureTotal},
                {x: 'Tesla', y: teslaTotal},
                {x: 'SpaceX', y: spaceXTotal},
                {x: 'Agriculture', y: agricultureTotal}
            ]);

            var marsAmountLands = 0;
            var uranusAmountLands = 0;
            var moonAmountLands = 0;
            var saturnAmountLands = 0;
            var jupiterAmountLands = 0;
            var neptunAmountLands = 0;
            var plutoAmountLands = 0;

            response4.data.map(({ mars, uranus, moon, saturn, jupiter, neptun, pluto }, index) => {
                marsAmountLands = marsAmountLands + mars;
                uranusAmountLands = uranusAmountLands + uranus;
                moonAmountLands = moonAmountLands + moon;
                saturnAmountLands = saturnAmountLands + saturn;
                jupiterAmountLands = jupiterAmountLands + jupiter;
                neptunAmountLands = neptunAmountLands + neptun;
                plutoAmountLands = plutoAmountLands + pluto;
            })
            setLandData([
                {x: 'Mars', y: marsAmountLands},
                {x: 'Uranus', y: uranusAmountLands},
                {x: 'Moon', y: moonAmountLands},
                {x: 'Saturn', y: saturnAmountLands},
                {x: 'Jupiter', y: jupiterAmountLands},
                {x: 'Neptun', y: neptunAmountLands},
                {x: 'Pluto', y: plutoAmountLands}
            ]);

            var marsAmountHouses = 0;
            var uranusAmountHouses = 0;
            var moonAmountHouses = 0;
            var saturnAmountHouses = 0;
            var jupiterAmountHouses = 0;
            var neptunAmountHouses = 0;
            var plutoAmountHouses = 0;

            response3.data.map(({ mars, uranus, moon, saturn, jupiter, neptun, pluto }, index) => {
                marsAmountHouses = marsAmountHouses + mars;
                uranusAmountHouses = uranusAmountHouses + uranus;
                moonAmountHouses = moonAmountHouses + moon;
                saturnAmountHouses = saturnAmountHouses + saturn;
                jupiterAmountHouses = jupiterAmountHouses + jupiter;
                neptunAmountHouses = neptunAmountHouses + neptun;
                plutoAmountHouses = plutoAmountHouses + pluto;
            })
            console.log(marsAmountLands);
            setHouseData([
                {x: 'Mars', y: marsAmountHouses},
                {x: 'Uranus', y: uranusAmountHouses},
                {x: 'Moon', y: moonAmountHouses},
                {x: 'Saturn', y: saturnAmountHouses},
                {x: 'Jupiter', y: jupiterAmountHouses},
                {x: 'Neptun', y: neptunAmountHouses},
                {x: 'Pluto', y: plutoAmountHouses}
            ]);

        }));
        

        

    }, []);

    console.log(users);

    const renderUsers = () => {
        return users && users.map(({ username, type, createdAt }, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{username}</td>
                    <td>{type}</td>
                    <td>{createdAt}</td>
                </tr>
            )
            
        })
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
          <div className={click ? 'u-new' : 'u-body'}>
                <header class="u-header">
                    <div className='left-menu-icon' onClick={handleClick}>
                    <i className={click ? 'fa fa-bars' : 'fa fa-bars'} id='btn'/>
                    </div>
                    <h5 className="username"><span className="user-icon"></span>{window.localStorage.getItem('name')}</h5>
                </header>
                <div class="u-table">
                    <h3 className="d-h1">Remaining items</h3>
                    <CardDeck>
                        <Card>
                            <span className="remainings1"></span>
                            <Card.Body>
                            <Card.Title>Lands</Card.Title>
                            </Card.Body>
                            <Card.Footer>
                                <h4>{itemsLand}</h4>
                            </Card.Footer>
                        </Card>
                        <Card>
                            <span className="remainings2"></span>
                            <Card.Body>
                            <Card.Title>Houses</Card.Title>
                            </Card.Body>
                            <Card.Footer>
                                <h4>{itemsHouse}</h4>
                            </Card.Footer>
                        </Card>
                        <Card>
                            <span className="remainings3"></span>
                            <Card.Body>
                            <Card.Title>Stocks</Card.Title>
                            </Card.Body>
                            <Card.Footer>
                                <h4>{itemsStock}</h4>
                            </Card.Footer>
                        </Card>
                        <Card>
                            <span className="remainings4"></span>
                            <Card.Body>
                            <Card.Title>Coins</Card.Title>
                            </Card.Body>
                            <Card.Footer>
                                <h4>{itemsCoin}</h4>
                            </Card.Footer>
                        </Card>
                    </CardDeck>
                    <br></br>
                    <Card responsive>
                        <Card.Header as="h5">Users per day</Card.Header>
                        <FlexibleXYPlot
                        className="clustered-stacked-bar-chart-example"
                        xType="ordinal"
                        stackBy="y"
                        height={300}
                        yDomain={[0, 100]}
                        >
                        <DiscreteColorLegend
                            style={{position: 'absolute', left: '50px', top: '10px'}}
                            orientation="horizontal"
                            items={[
                            {
                                title: 'Users',
                                color: '#12939A'
                            }]}
                        />
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis />
                        <BarSeries color="#12939A" data={signData}/>
                        </FlexibleXYPlot>
                    </Card>
                    <br></br>
                    <CardDeck responsive>
                        <Card>
                            <Card.Header as="h5">Lands and houses bought per planet</Card.Header>
                            <FlexibleXYPlot
                            className="clustered-stacked-bar-chart-example"
                            xType="ordinal"
                            stackBy="y"
                            height={300}
                            yDomain={[0, 100]}
                            >
                            <DiscreteColorLegend
                                style={{position: 'absolute', left: '50px', top: '10px'}}
                                orientation="horizontal"
                                items={[
                                {
                                    title: 'Lands',
                                    color: '#12939A'
                                },
                                {
                                    title: 'Houses',
                                    color: '#79C7E3'
                                }
                                ]}
                            />
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis />
                            <YAxis />
                            <BarSeries
                                cluster="2015"
                                color="#12939A"
                                data={landData}
                            />
                            <BarSeries
                                cluster="2016"
                                color="#79C7E3"
                                data={houseData}
                            />
                            </FlexibleXYPlot>
                        </Card>
                    </CardDeck>
                    <br></br>
                    <CardDeck>
                        <Card responsive>
                            <Card.Header as="h5">Stocks bought</Card.Header>
                            <FlexibleXYPlot
                            className="clustered-stacked-bar-chart-example"
                            xType="ordinal"
                            stackBy="y"
                            height={300}
                            yDomain={[0, 100]}
                            >
                            <DiscreteColorLegend
                                style={{position: 'absolute', left: '50px', top: '10px'}}
                                orientation="horizontal"
                                items={[
                                {
                                    title: 'Stocks',
                                    color: '#12939A'
                                }]}
                            />
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis />
                            <YAxis />
                            <BarSeries
                                color="#12939A"
                                data={stockData}
                            />
                            </FlexibleXYPlot>
                        </Card>
                    </CardDeck>
                    <br></br>
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
                        <BarSeries color="#12939A" data={coinsData}/>
                        </FlexibleXYPlot>
                    </Card>
                    <br></br>
                    <Card>
                        <span class="usersAstronaut"></span>
                        <br></br>
                        <Card.Body>
                            <Card.Title className="title-users"><h3>Users</h3></Card.Title>
                            <Table bordered hover responsive>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Created at</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderUsers()}
                            </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
            </div> 
        </>
    )
}
