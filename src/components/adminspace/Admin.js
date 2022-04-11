import React, { useRef, useState, useEffect } from "react"
import LeftMenu from "../userspace/LeftMenu"
import { Card, Table, CardDeck } from "react-bootstrap"
import '../../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, VerticalBarSeriesCanvas, HorizontalBarSeries, DiscreteColorLegend, makeWidthFlexible, LabelSeries, MarkSeries } from 'react-vis';
import "./Admin.css"
import axios from "axios"
import Chart from 'react-apexcharts'
import { DataGrid } from '@mui/x-data-grid';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Admin() {

    const FlexibleXYPlot = makeWidthFlexible(XYPlot);

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    const [useCanvas, setUseCanvas] = useState(false);

    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;

    const [signData, setSignData] = useState([{ x: 1, y: 1 }]);

    const [users, setUsers] = useState([]);
    const [singups, setSignups] = useState([]);

    const [stockData, setStockData] = useState([]);
    const [landData, setLandData] = useState([]);
    const [houseData, setHouseData] = useState([]);
    const [coinsData, setCoinsData] = useState([]);

    const [coinsUser, setCoinsUser] = useState([]);
    const [housesUser, setHousesUser] = useState([]);
    const [landsUser, setLandsUser] = useState([]);

    const [itemsCoin, setItemsCoin] = useState(0);
    const [itemsLand, setItemsLand] = useState(0);
    const [itemsHouse, setItemsHouse] = useState(0);
    const [itemsStock, setItemsStock] = useState(0);

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

                    if (type == "coins") {
                        setItemsCoin(cantity);
                    }
                    if (type == "houses") {
                        setItemsHouse(cantity);
                    }
                    if (type == "lands") {
                        setItemsLand(cantity);
                    }
                    if (type == "stocks") {
                        setItemsStock(cantity);
                    }
                })

                var data = [];

                response5.data.map(({ _id, count }, index) => {

                    console.log(String(_id.year));

                    var date = String(_id.year) + '-' + String(_id.month) + '-' + String(_id.day);
                    data.push(
                        { x: date, y: count }
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
                    { x: 'ECH', y: echTotal },
                    { x: 'BTC', y: btcTotal },
                    { x: 'ATC', y: atcTotal }
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
                    { x: 'Transport', y: transportTotal },
                    { x: 'Medicine', y: medicineTotal },
                    { x: 'Education', y: educationTotal },
                    { x: 'Infrastructure', y: infrastructureTotal },
                    { x: 'Tesla', y: teslaTotal },
                    { x: 'SpaceX', y: spaceXTotal },
                    { x: 'Agriculture', y: agricultureTotal }
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
                    { x: 'Mars', y: marsAmountLands },
                    { x: 'Uranus', y: uranusAmountLands },
                    { x: 'Moon', y: moonAmountLands },
                    { x: 'Saturn', y: saturnAmountLands },
                    { x: 'Jupiter', y: jupiterAmountLands },
                    { x: 'Neptun', y: neptunAmountLands },
                    { x: 'Pluto', y: plutoAmountLands }
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
                    { x: 'Mars', y: marsAmountHouses },
                    { x: 'Uranus', y: uranusAmountHouses },
                    { x: 'Moon', y: moonAmountHouses },
                    { x: 'Saturn', y: saturnAmountHouses },
                    { x: 'Jupiter', y: jupiterAmountHouses },
                    { x: 'Neptun', y: neptunAmountHouses },
                    { x: 'Pluto', y: plutoAmountHouses }
                ]);

            }));




    }, []);

    console.log(users);

    const renderUsers = () => {
        return users && users.map(({ username, type, createdAt }, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{username}</td>
                    <td>{type}</td>
                    <td>{createdAt}</td>
                </tr>
            )

        })
    }

    const series = [{
        name: "Users",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 53, 104, 67]
    }];
    const options = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }
    };

    const series_1 = [{
        name: 'Lands',
        data: [44, 55, 57, 56, 61, 58, 63, 60]
    }, {
        name: 'Houses',
        data: [76, 85, 101, 98, 87, 105, 91, 114]
    }];
    const options_1 = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Pluto', 'Neptun', 'Jupiter', 'Saturn', 'Moon', 'Uranus', 'Mars', 'Venus'],
        },
        yaxis: {
            title: {
                text: 'Amount'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val
                }
            }
        }
    };

    const series_2 = [
        {
            name: "ECH",
            data: [28, 29, 33, 36, 32, 32, 63, 23, 46, 22, 62, 53]
        },
        {
            name: "BTC",
            data: [12, 11, 14, 18, 17, 13, 13, 73, 16, 42, 22, 63]
        },
        {
            name: "ATC",
            data: [45, 11, 100, 35, 2, 67, 19, 33, 56, 20, 10, 89]
        }
    ];
    const options_2 = {
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            zoom: {
                enabled: true
            },
            toolbar: {
                show: true
            }
        },
        colors: ['#77B6EA', '#545454', 'orange'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Per mount',
            align: 'left'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            title: {
                text: 'Month'
            }
        },
        yaxis: {
            title: {
                text: 'Amount'
            },
            min: 0,
            max: 120
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        }
    };

    const series_3 = [{
        name: 'Transport',
        data: [44, 55, 41, 37, 22, 43, 21, 41, 37, 22, 43, 21]
    }, {
        name: 'Medicine',
        data: [53, 32, 33, 52, 13, 43, 32, 41, 37, 22, 43, 21]
    }, {
        name: 'Education',
        data: [12, 17, 11, 9, 15, 11, 20, 41, 37, 22, 43, 21]
    }, {
        name: 'Infrastructure',
        data: [9, 7, 5, 8, 6, 9, 4, 41, 37, 22, 43, 21]
    }, {
        name: 'Tesla',
        data: [25, 12, 19, 32, 25, 24, 10, 41, 37, 22, 43, 21]
    }, {
        name: 'SpaceX',
        data: [25, 12, 19, 32, 25, 24, 10, 41, 37, 22, 43, 21]
    }, {
        name: 'Agriculture',
        data: [25, 12, 19, 32, 25, 24, 10, 41, 37, 22, 43, 21]
    }];

    const options_3 = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
                formatter: function (val) {
                    return val + "K"
                }
            }
        },
        yaxis: {
            title: {
                text: undefined
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + "K"
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
        }
    };

    const series_4 = [{
        name: "Sold",
        data: [40, 41, 35, 51, 49, 62, 69, 91, 148, 53, 104, 67]
    }, {
        name: "Bought",
        data: [50, 41, 120, 51, 119, 62, 69, 91, 148, 53, 104, 67]
    }];
    const options_4 = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        colors: ['#E91E63', '#9C27B0'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }
    };

    const series_5 = [{
        name: "Sold",
        data: [40, 41, 35, 51, 49, 62, 69, 91, 148, 53, 104, 67]
    }, {
        name: "Bought",
        data: [50, 41, 120, 51, 119, 62, 69, 91, 148, 53, 104, 67]
    }];
    const options_5 = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        colors: ['#546E7A', '#9C27B0'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }
    };

    const series_6 = [{
        name: "Sold",
        data: [40, 41, 35, 51, 49, 62, 69, 91, 148, 53, 104, 67]
    }, {
        name: "Bought",
        data: [50, 41, 120, 51, 119, 62, 69, 91, 148, 53, 104, 67]
    }];
    const options_6 = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        colors: ['#D9534F', '#546E7A'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }
    };

    const series_7 = [{
        name: "Sold",
        data: [40, 41, 35, 51, 49, 62, 69, 91, 148, 53, 104, 67]
    }, {
        name: "Bought",
        data: [50, 41, 120, 51, 119, 62, 69, 91, 148, 53, 104, 67]
    }];
    const options_7 = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        colors: ['#9C27B0', '#D9534F'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 300 },
        { field: 'lastName', headerName: 'Last name', width: 300 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 120,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 360,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        { field: 'userName', headerName: 'Username', width: 230 },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, userName: '@snow', fullName: 'Jon Snow' },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, userName: '@lannister', fullName: 'Cersei Lannister' },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, userName: '@lannister', fullName: 'Jaime Lannister' },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, userName: '@stark', fullName: 'Arya Stark' },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 23, userName: '@targaryen', fullName: 'Daenerys Targaryen' },
        { id: 6, lastName: 'Melisandre', firstName: 'Roxie', age: 150, userName: '@melisandre', fullName: 'Roxie Melisandre' },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, userName: '@clifford', fullName: 'Ferrara Clifford' },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, userName: '@frances', fullName: 'Frances Rossi' },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, userName: '@harvey', fullName: 'Harvey Ross' },
    ];

    let menu;
    var w = window.innerWidth

    if (click) {
        if (w <= 767) {
            menu = <LeftMenu type="lm-new-min" />
        }
        else
            menu = <LeftMenu type="lm-new" />
    }
    else {
        if (w <= 767) {
            menu = <LeftMenu type="lm-min" />
        }
        else
            menu = <LeftMenu type="lm" />
    }

    const handleCellClick = (e, row, col) => {
        console.log(e, row, col);
    }

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (

        <>
            {menu}
            <div className={click ? 'u-new' : 'u-body'}>
                <header class="u-header">
                    <div className='left-menu-icon' onClick={handleClick}>
                        <i className={click ? 'fa fa-bars' : 'fa fa-bars'} id='btn' />
                    </div>
                    <h5 className="username"><span className="user-icon"></span>{window.localStorage.getItem('name')}</h5>
                </header>
                <div class="u-table">
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>Items</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <h3 className="d-h1">Remaining items</h3>
                            <CardDeck>
                                <Card>
                                    <span className="remainings1"></span>
                                    <Card.Body>
                                        <Card.Title>Lands</Card.Title>
                                    </Card.Body>
                                    <Card.Footer>
                                        <h4>32768</h4>
                                    </Card.Footer>
                                </Card>
                                <Card>
                                    <span className="remainings2"></span>
                                    <Card.Body>
                                        <Card.Title>Houses</Card.Title>
                                    </Card.Body>
                                    <Card.Footer>
                                        <h4>32768</h4>
                                    </Card.Footer>
                                </Card>
                                <Card>
                                    <span className="remainings3"></span>
                                    <Card.Body>
                                        <Card.Title>Stocks</Card.Title>
                                    </Card.Body>
                                    <Card.Footer>
                                        <h4>32768</h4>
                                    </Card.Footer>
                                </Card>
                                <Card>
                                    <span className="remainings4"></span>
                                    <Card.Body>
                                        <Card.Title>Coins</Card.Title>
                                    </Card.Body>
                                    <Card.Footer>
                                        <h4>32768</h4>
                                    </Card.Footer>
                                </Card>
                            </CardDeck>
                            <br></br>
                            <Card responsive>
                                <Card.Header as="h5">Lands tranzactions per month</Card.Header>
                                <Chart options={options_4} series={series_4} type="line" height={350} />
                            </Card>
                            <br></br>
                            <Card responsive>
                                <Card.Header as="h5">Houses tranzactions per month</Card.Header>
                                <Chart options={options_5} series={series_5} type="line" height={350} />
                            </Card>
                            <br></br>
                            <Card responsive>
                                <Card.Header as="h5">Stocks tranzactions per month</Card.Header>
                                <Chart options={options_6} series={series_6} type="line" height={350} />
                            </Card>
                            <br></br>
                            <Card responsive>
                                <Card.Header as="h5">Coins tranzactions per month</Card.Header>
                                <Chart options={options_7} series={series_7} type="line" height={350} />
                            </Card>
                            <br></br>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                            <Typography>Bought Items</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CardDeck responsive>
                                <Card>
                                    <Card.Header as="h5">Lands and houses bought per planet</Card.Header>
                                    <Chart options={options_1} series={series_1} type="bar" height={350} />
                                </Card>
                            </CardDeck>
                            <br></br>
                            <Card responsive>
                                <Card.Header as="h5">Coins bought</Card.Header>
                                <Chart options={options_2} series={series_2} type="line" height={350} />
                            </Card>
                            <br></br>
                            <CardDeck>
                                <Card style={{ height: '550px' }} responsive>
                                    <Card.Header as="h5">Stocks bought</Card.Header>
                                    <Chart options={options_3} series={series_3} type="bar" height={500} />
                                </Card>
                            </CardDeck>
                            <br></br>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography>Sold Items</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Card>
                                <Card.Header as="h5">Lands and houses sold per planet</Card.Header>
                                <Chart options={options_1} series={series_1} type="bar" height={350} />
                            </Card>
                            <br></br>
                            <Card style={{ height: '550px' }} responsive>
                                <Card.Header as="h5">Stocks sold</Card.Header>
                                <Chart options={options_3} series={series_3} type="bar" height={500} />
                            </Card>
                            <br></br>
                            <Card responsive>
                                <Card.Header as="h5">Coins sold</Card.Header>
                                <Chart options={options_2} series={series_2} type="line" height={350} />
                            </Card>
                            <br></br>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                            <Typography>Users</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Card responsive>
                                <Card.Header as="h5">Users per month</Card.Header>
                                <Chart options={options} series={series} type="line" height={350} />
                            </Card>
                            <br></br>
                            <Card>
                                <span class="usersAstronaut"></span>
                                <br></br>
                                <Card.Body>
                                    <Card.Title className="title-users"><h3>Users</h3></Card.Title>
                                    <div style={{ height: 400, width: '100%' }}>
                                        <DataGrid
                                            rows={rows}
                                            columns={columns}
                                            pageSize={5}
                                            rowsPerPageOptions={[5]}
                                            checkboxSelection
                                            onCellClick={(e, row, column) => { handleCellClick(e, row, column) }}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </>
    )
}
