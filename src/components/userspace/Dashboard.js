import React, { useState, useContext, useEffect } from "react"
import { Card, Button, Form, CardDeck, Table, Alert} from 'react-bootstrap'
import { useHistory } from "react-router-dom"
import "./Dashboard.css"
import LeftMenu from "./LeftMenu"
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios"

export default function Dashboard() {

    const [click, setClick] = useState(false);
  
    const handleClick = () => setClick(!click);

    const history=useHistory();

    const [items, setItems] = useState([])

    const [totalCost,setTotalCost] = useState(0);

    const [count, setCount] = useState(0);

    const {value, setValue} = useContext(AuthContext);

    setValue(window.localStorage.getItem('name'));

    const [error, setError] = useState("")

    const currentUser = {
        username: window.localStorage.getItem('name'),
    }

    const addItem = (e) => {
        // console.log(e.currentTarget.children[2].children[1].outerText)
        setItems([
          ...items,
          {
            id: count,
            name: e.currentTarget.children[1].children[0].outerText,
            price: e.currentTarget.children[2].children[1].outerText
          }
        ]);
        setTotalCost(totalCost + parseInt(e.currentTarget.children[2].children[1].outerText,10));
        setCount(count+1);
    };

    const removeData = (id) => {
        console.log(id);
        console.log(items.length);
        const getItem = items.find(item => id === item.id);
        console.log(getItem.price);
        const del = items.filter(item => id !== item.id);
        setItems(del);
        setTotalCost(totalCost - parseInt(getItem.price,10));
    };

    const renderBody = () => {
        return items && items.map(({ id, name, price}, index) => {
            return (
                <tr key={index}>
                    <td>{index}</td>
                    <td>{name}</td>
                    <td>{price}</td>
                    <td className='operation'>
                        <button className='buttonDelete' onClick={() => removeData(id)}></button>
                    </td>
                </tr>
            )
        })
    }
    const [userWallet,setUserWallet]=useState([]);

    useEffect(() => {
        console.log(window.localStorage.getItem('name'));
        setValue(window.localStorage.getItem('name'));
        axios.all([
            axios.post("http://localhost:5000/wallet/user", currentUser)
        ])
        .then(axios.spread((response) => {
            setUserWallet(response.data);
        }));
    }, []);

    function handleSubmit(e) {
        setError("")
        e.preventDefault()
        if(totalCost>userWallet.btc) {
            setError("Not enough coins!")
        }
        else {
            var transportAmount = 0;
            var medicineAmount = 0;
            var educationAmount = 0;
            var infrastructureAmount = 0;
            var teslaAmount = 0;
            var spaceXAmount = 0;
            var agricultureAmount = 0;

            var marsAmountLands = 0;
            var uranusAmountLands = 0;
            var moonAmountLands = 0;
            var saturnAmountLands = 0;
            var jupiterAmountLands = 0;
            var neptunAmountLands = 0;
            var plutoAmountLands = 0;

            var marsAmountHouses = 0;
            var uranusAmountHouses = 0;
            var moonAmountHouses = 0;
            var saturnAmountHouses = 0;
            var jupiterAmountHouses = 0;
            var neptunAmountHouses = 0;
            var plutoAmountHouses = 0;

            items.map(({ id, name, price}, index) => {
                if (name == "Limited stock") {
                    transportAmount += 10;
                    medicineAmount += 10;
                    educationAmount += 10;
                    infrastructureAmount += 10;
                    teslaAmount += 10;
                    spaceXAmount += 10;
                    agricultureAmount += 10;
                }
                if (name == "Limited pack") {
                    saturnAmountLands += 1;
                    moonAmountLands += 1;
                    jupiterAmountLands += 1;
                    neptunAmountLands += 1;
                    plutoAmountLands += 1;
                    uranusAmountLands += 1;
                    marsAmountLands += 1;

                    saturnAmountHouses += 1;
                    moonAmountHouses += 1;
                    jupiterAmountHouses += 1;
                    neptunAmountHouses += 1;
                    plutoAmountHouses += 1;
                    uranusAmountHouses += 1;
                    marsAmountHouses += 1;
                }
                if (name == "Education stock") {
                    educationAmount += 1;
                }
                if (name == "SpaceX stock") {
                    spaceXAmount += 1;
                }
                if (name == "Agriculture stock") {
                    agricultureAmount += 1;
                }
                if (name == "Tesla stock") {
                    teslaAmount += 1;
                }
                if (name == "Infrastructure stock") {
                    infrastructureAmount += 1;
                }
                if (name == "Transport stock") {
                    transportAmount += 1;
                }
                if (name == "Medicine stock") {
                    medicineAmount += 1;
                }
                if (name == "Mars pack") {
                    marsAmountHouses += 1;
                    marsAmountLands += 1;
                }
                if (name == "Uranus pack") {
                    uranusAmountLands += 1;
                    uranusAmountHouses += 1;
                }
                if (name == "Moon pack") {
                    moonAmountLands += 1;
                    moonAmountHouses += 1;
                }
                if (name == "Saturn pack") {
                    saturnAmountLands += 1;
                    saturnAmountHouses += 1;
                }
                if (name == "Jupiter pack") {
                    jupiterAmountHouses += 1;
                    jupiterAmountLands += 1;
                }
                if (name == "Neptun pack") {
                    neptunAmountLands += 1;
                    neptunAmountHouses += 1;
                }
                if (name == "Pluto pack") {
                    plutoAmountLands += 1;
                    plutoAmountHouses += 1;
                }
                if (name == "Bundle 1") {
                    medicineAmount += 5;
                    marsAmountLands += 5;
                }
                if (name == "Bundle 2") {
                    agricultureAmount += 15;
                    neptunAmountHouses += 5;
                }
                if (name == "Bundle 3") {
                    spaceXAmount += 10;
                    plutoAmountLands += 5;
                }
                if (name == "Bundle 4") {
                    saturnAmountLands += 20;
                    teslaAmount += 10;
                }
                if (name == "Limited mars") {
                    marsAmountHouses += 5;
                    marsAmountLands += 2;
                }
                if (name == "Limited saturn") {
                    saturnAmountLands += 3;
                    saturnAmountHouses += 1;
                }
                if (name == "Limited moon") {
                    moonAmountLands += 3;
                    moonAmountHouses += 3;
                }
                if (name == "Limited uranus") {
                    uranusAmountLands += 5;
                    uranusAmountHouses += 5;
                }
            })
            const stocksBuy = {
                username: window.localStorage.getItem('name'),
                transport: transportAmount,
                medicine: medicineAmount,
                education: educationAmount,
                infrastructure: infrastructureAmount,
                tesla: teslaAmount,
                spaceX: spaceXAmount,
                agriculture: agricultureAmount
            }
            const housesBuy = {
                username: window.localStorage.getItem('name'),
                mars: marsAmountHouses,
                uranus: uranusAmountHouses,
                moon: moonAmountHouses,
                saturn: saturnAmountHouses,
                jupiter: jupiterAmountHouses,
                neptun: neptunAmountHouses,
                pluto: plutoAmountHouses
            }
            const landsBuy = {
                username: window.localStorage.getItem('name'),
                mars: marsAmountLands,
                uranus: uranusAmountLands,
                moon: moonAmountLands,
                saturn: saturnAmountLands,
                jupiter: jupiterAmountLands,
                neptun: neptunAmountLands,
                pluto: plutoAmountLands
            }
            const spent = parseInt(userWallet.btc) - parseInt(totalCost);
            const coinSpent = {
                username: window.localStorage.getItem('name'),
                btc: spent
            }

            const items1 = {
                type: "coins",
                amount: totalCost
            }
            const landItems = marsAmountLands + uranusAmountLands + moonAmountLands + saturnAmountLands + jupiterAmountLands + neptunAmountLands + plutoAmountLands;
            const houseItems = marsAmountHouses + uranusAmountHouses + moonAmountHouses + saturnAmountHouses + jupiterAmountHouses + neptunAmountHouses + plutoAmountHouses;
            const stockItems = transportAmount + medicineAmount + educationAmount + infrastructureAmount + teslaAmount + spaceXAmount + agricultureAmount;
            const items2 = {
                type: "stocks",
                amount: stockItems
            }

            const items3 = {
                type: "houses",
                amount: houseItems
            }

            const items4 = {
                type: "lands",
                amount: landItems
            }

            axios.all([
                axios.post("http://localhost:5000/stocks/buy", stocksBuy),
                axios.post("http://localhost:5000/houses/buy", housesBuy),
                axios.post("http://localhost:5000/lands/buy", landsBuy),
                axios.post("http://localhost:5000/wallet/spent", coinSpent),
                axios.post("http://localhost:5000/items/sold", items1),
                axios.post("http://localhost:5000/items/bought", items2),
                axios.post("http://localhost:5000/items/bought", items3),
                axios.post("http://localhost:5000/items/bought", items4) 
            ])
            .then(axios.spread((response1, response2, response3, response4, response5, response6, response7, response8) => {
                console.log(response1.data);
                console.log(response2.data);
                console.log(response3.data);
                console.log(response4.data);
                console.log(response5.data);
                console.log(response6.data);
                console.log(response7.data);
                console.log(response8.data);
                if(response6.data === "Succesfully update!" && response7.data === "Succesfully update!" && response8.data === "Succesfully update!") {
                    setUserWallet(parseInt(userWallet.btc) - parseInt(totalCost));
                    history.push("/assets");
                }
                else {
                    if(response6.data !== "Succesfully update!") {
                        setError("Currently there are not remaining stock items!");
                    }
                    else {
                        if(response8.data !== "Succesfully update!") {
                            setError("Currently there are not remaining land items!");
                        }
                        else {
                            setError("Currently there are not remaining house items!");
                        }
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
            <div className={click ? 'd-new' : 'd-body'}>
                <header class="d-header">
                    <div className='left-menu-icon' onClick={handleClick}>
                        <i className={click ? 'fa fa-bars' : 'fa fa-bars'} id="btn"></i>
                    </div>
                    <h5 className="username"><span className="user-icon"></span>{value}</h5>
                </header>
                <div class="d-content">
                    <h3 className="d-h1">Recommended</h3>
                    <CardDeck>
                        <Card onClick={addItem}>
                            <span className="recommended1"></span>
                            <Card.Body>
                            <Card.Title>Limited mars</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                2 lands and 5 houses
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">100</h4>
                            </Card.Footer>
                        </Card>
                        <Card hoverable onClick={addItem}>
                            <span className="recommended2"></span>
                            <Card.Body>
                            <Card.Title>Limited saturn</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                3 lands and 1 houses
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">120</h4>
                            </Card.Footer>
                        </Card>
                        <Card hoverable onClick={addItem}>
                            <span className="recommended3"></span>
                            <Card.Body>
                            <Card.Title>Limited moon</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                3 lands and 3 houses
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">150</h4>
                            </Card.Footer>
                        </Card>
                        <Card hoverable onClick={addItem}>
                            <span className="recommended4"></span>
                            <Card.Body>
                            <Card.Title>Limited uranus</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                5 lands and 5 houses
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">110</h4>
                            </Card.Footer>
                        </Card>
                    </CardDeck>
                    <br></br>
                    <h3 className="d-h1">Bundles</h3>
                    <CardDeck>
                        <Card hoverable onClick={addItem}>
                            <span className="bundle1"></span>
                            <Card.Body>
                            <Card.Title>Bundle 1</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                5 medicine stocks and 5 mars lands
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">500</h4>
                            </Card.Footer>
                        </Card>
                        <Card hoverable onClick={addItem}>
                            <span className="bundle2"></span>
                            <Card.Body>
                            <Card.Title>Bundle 2</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                15 agriculture stocks and 5 neptun houses
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">450</h4>
                            </Card.Footer>
                        </Card>
                        <Card hoverable onClick={addItem}>
                            <span className="bundle3"></span>
                            <Card.Body>
                            <Card.Title>Bundle 3</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                10 spaceX stocks and 5 pluto lands
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">300</h4>
                            </Card.Footer>
                        </Card>
                        <Card hoverable onClick={addItem}>
                            <span className="bundle4"></span>
                            <Card.Body>
                            <Card.Title>Bundle 4</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                10 tesla stocks and 20 saturn lands
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">1000</h4>
                            </Card.Footer>
                        </Card>
                    </CardDeck>
                    <br></br>
                    <h3 className="d-h1">Planets offers</h3>
                    <CardDeck>
                        <Card hoverable onClick={addItem}>
                            <span className="mars-pack"></span>
                            <Card.Body>
                            <Card.Title>Mars pack</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                1 house and 1 land
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">50</h4>
                            </Card.Footer>
                        </Card>
                        <Card hoverable onClick={addItem}>
                            <span className="moon-pack"></span>
                            <Card.Body>
                            <Card.Title>Moon pack</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                1 house and 1 land
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">50</h4>
                            </Card.Footer>
                        </Card>
                        <Card hoverable onClick={addItem}>
                            <span className="saturn-pack"></span>
                            <Card.Body>
                            <Card.Title>Saturn pack</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                1 house and 1 land
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">100</h4>
                            </Card.Footer>
                        </Card>
                        <Card hoverable onClick={addItem}>
                            <span className="neptune-pack"></span>
                            <Card.Body>
                            <Card.Title>Neptune pack</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                1 house and 1 land
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">70</h4>
                            </Card.Footer>
                        </Card>
                    </CardDeck>
                    <br></br>
                    <CardDeck>
                        <Card hoverable onClick={addItem}>
                            <span className="pluto-pack"></span>
                            <Card.Body>
                            <Card.Title>Pluto pack</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                1 house and 1 land
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">80</h4>
                            </Card.Footer>
                        </Card>
                        <Card hoverable onClick={addItem}>
                            <span className="uranus-pack"></span>
                            <Card.Body>
                            <Card.Title>Uranus pack</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                1 house and 1 land
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">110</h4>
                            </Card.Footer>
                        </Card>
                        <Card hoverable onClick={addItem}>
                            <span className="jupiter-pack"></span>
                            <Card.Body>
                            <Card.Title>Jupiter pack</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                1 house and 1 land
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">80</h4>
                            </Card.Footer>
                        </Card>
                        <Card hoverable onClick={addItem}>
                            <span className="limited"></span>
                            <Card.Body>
                            <Card.Title>Limited pack</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                1 house and 1 land on every planet
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">450</h4>
                            </Card.Footer>
                        </Card>
                    </CardDeck>
                    <br></br>
                    <h3 className="d-h1">Stocks</h3>
                    <CardDeck>
                        <Card hoverable onClick={addItem}>
                            <span className="education-pack"></span>
                            <Card.Body>
                            <Card.Title>Education stock</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                1 stock
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">30</h4>
                            </Card.Footer>
                        </Card>
                        <Card hoverable onClick={addItem}>
                            <span className="spacex-pack"></span>
                            <Card.Body>
                            <Card.Title>SpaceX stock</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                1 stock
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">40</h4>
                            </Card.Footer>
                        </Card>
                        <Card hoverable onClick={addItem}>
                            <span className="agriculture-pack"></span>
                            <Card.Body>
                            <Card.Title>Agriculture stock</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                1 stock
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">20</h4>
                            </Card.Footer>
                        </Card>
                        <Card hoverable onClick={addItem}>
                            <span className="tesla-pack"></span>
                            <Card.Body>
                            <Card.Title>Tesla stock</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                1 stock
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">10</h4>
                            </Card.Footer>
                        </Card>
                    </CardDeck>
                    <br></br>
                    <CardDeck>
                        <Card hoverable onClick={addItem}>
                            <span className="structure-pack"></span>
                            <Card.Body>
                            <Card.Title>Infrastructure stock</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                1 stock
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">15</h4>
                            </Card.Footer>
                        </Card>
                        <Card hoverable onClick={addItem}>
                            <span className="car-pack"></span>
                            <Card.Body>
                            <Card.Title>Transport stock</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                1 stock
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">25</h4>
                            </Card.Footer>
                        </Card>
                        <Card hoverable onClick={addItem}>
                            <span className="medicine-pack"></span>
                            <Card.Body>
                            <Card.Title>Medicine stock</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                1 stock
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">10</h4>
                            </Card.Footer>
                        </Card>
                        <Card hoverable onClick={addItem}>
                            <span className="limited"></span>
                            <Card.Body>
                            <Card.Title>Limited stock</Card.Title>
                            <Card.Text className="card-text">
                                Available through 15 september 2021
                            </Card.Text>
                            <Card.Text className="ofer">
                                10 stocks for each category
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="currency"></span><h4 className="price">150</h4>
                            </Card.Footer>
                        </Card>
                    </CardDeck>
                    <br></br>
                    <CardDeck>
                        <Card className="shopCost">
                            <Card.Body>
                            <span className="currency"></span>
                            <h2 className="text-center mb-4">Shop cost</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="yourWallet">
                                <Form.Label>Your wallet</Form.Label>
                                <Form.Control
                                    type="number" value={userWallet.btc}
                                />
                                </Form.Group>
                                <Form.Group id="cost">
                                <Form.Label>Cost</Form.Label>
                                <Form.Control
                                    type="number" value={totalCost}
                                />
                                </Form.Group>
                                <Button type="submit">
                                Buy
                                </Button>
                            </Form>
                            </Card.Body>
                        </Card>
                        <Card className="shopTable">
                            <br></br>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Cart</Card.Title>
                                    <Table responsive>
                                    <thead>
                                        <tr>
                                        <th id="idItem">#</th>
                                        <th id="nameItem">Item</th>
                                        <th id="priceItem">Price</th>
                                        <th id="removeItem">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderBody()}
                                    </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Card>
                    </CardDeck>
                </div>
            </div>
        </>
    )
}
