import React, { useState, useContext, useEffect } from "react"
import { Card, Button, Form, CardDeck, Table, Alert } from 'react-bootstrap'
import { useHistory } from "react-router-dom"
import "./Dashboard.css"
import LeftMenu from "./LeftMenu"
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios"

import Chart from 'react-apexcharts'

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function TabPanel_side(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel_side.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps_side(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

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



export default function Dashboard() {

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    const history = useHistory();

    const [items, setItems] = useState([])

    const [totalCost, setTotalCost] = useState(0);

    const [count, setCount] = useState(0);

    const { value, setValue } = useContext(AuthContext);

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
        setTotalCost(totalCost + parseInt(e.currentTarget.children[2].children[1].outerText, 10));
        setCount(count + 1);
    };

    const removeData = (id) => {
        console.log(id);
        console.log(items.length);
        const getItem = items.find(item => id === item.id);
        console.log(getItem.price);
        const del = items.filter(item => id !== item.id);
        setItems(del);
        setTotalCost(totalCost - parseInt(getItem.price, 10));
    };

    const renderBody = () => {
        return items && items.map(({ id, name, price }, index) => {
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
    const [userWallet, setUserWallet] = useState([]);

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
        if (totalCost > userWallet.btc) {
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

            items.map(({ id, name, price }, index) => {
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
                    if (response6.data === "Succesfully update!" && response7.data === "Succesfully update!" && response8.data === "Succesfully update!") {
                        setUserWallet(parseInt(userWallet.btc) - parseInt(totalCost));
                        history.push("/assets");
                    }
                    else {
                        if (response6.data !== "Succesfully update!") {
                            setError("Currently there are not remaining stock items!");
                        }
                        else {
                            if (response8.data !== "Succesfully update!") {
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

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const series = [{
        data: [{
            x: new Date(1538778600000),
            y: [6629.81, 6650.5, 6623.04, 6633.33]
        },
        {
            x: new Date(1538780400000),
            y: [6632.01, 6643.59, 6620, 6630.11]
        },
        {
            x: new Date(1538782200000),
            y: [6630.71, 6648.95, 6623.34, 6635.65]
        },
        {
            x: new Date(1538784000000),
            y: [6635.65, 6651, 6629.67, 6638.24]
        },
        {
            x: new Date(1538785800000),
            y: [6638.24, 6640, 6620, 6624.47]
        },
        {
            x: new Date(1538787600000),
            y: [6624.53, 6636.03, 6621.68, 6624.31]
        },
        {
            x: new Date(1538789400000),
            y: [6624.61, 6632.2, 6617, 6626.02]
        },
        {
            x: new Date(1538791200000),
            y: [6627, 6627.62, 6584.22, 6603.02]
        },
        {
            x: new Date(1538793000000),
            y: [6605, 6608.03, 6598.95, 6604.01]
        },
        {
            x: new Date(1538794800000),
            y: [6604.5, 6614.4, 6602.26, 6608.02]
        },
        {
            x: new Date(1538796600000),
            y: [6608.02, 6610.68, 6601.99, 6608.91]
        },
        {
            x: new Date(1538798400000),
            y: [6608.91, 6618.99, 6608.01, 6612]
        },
        {
            x: new Date(1538800200000),
            y: [6612, 6615.13, 6605.09, 6612]
        },
        {
            x: new Date(1538802000000),
            y: [6612, 6624.12, 6608.43, 6622.95]
        },
        {
            x: new Date(1538803800000),
            y: [6623.91, 6623.91, 6615, 6615.67]
        },
        {
            x: new Date(1538805600000),
            y: [6618.69, 6618.74, 6610, 6610.4]
        },
        {
            x: new Date(1538807400000),
            y: [6611, 6622.78, 6610.4, 6614.9]
        },
        {
            x: new Date(1538809200000),
            y: [6614.9, 6626.2, 6613.33, 6623.45]
        },
        {
            x: new Date(1538811000000),
            y: [6623.48, 6627, 6618.38, 6620.35]
        },
        {
            x: new Date(1538812800000),
            y: [6619.43, 6620.35, 6610.05, 6615.53]
        },
        {
            x: new Date(1538814600000),
            y: [6615.53, 6617.93, 6610, 6615.19]
        },
        {
            x: new Date(1538816400000),
            y: [6615.19, 6621.6, 6608.2, 6620]
        },
        {
            x: new Date(1538818200000),
            y: [6619.54, 6625.17, 6614.15, 6620]
        },
        {
            x: new Date(1538820000000),
            y: [6620.33, 6634.15, 6617.24, 6624.61]
        },
        {
            x: new Date(1538821800000),
            y: [6625.95, 6626, 6611.66, 6617.58]
        },
        {
            x: new Date(1538823600000),
            y: [6619, 6625.97, 6595.27, 6598.86]
        },
        {
            x: new Date(1538825400000),
            y: [6598.86, 6598.88, 6570, 6587.16]
        },
        {
            x: new Date(1538827200000),
            y: [6588.86, 6600, 6580, 6593.4]
        },
        {
            x: new Date(1538829000000),
            y: [6593.99, 6598.89, 6585, 6587.81]
        },
        {
            x: new Date(1538830800000),
            y: [6587.81, 6592.73, 6567.14, 6578]
        },
        {
            x: new Date(1538832600000),
            y: [6578.35, 6581.72, 6567.39, 6579]
        },
        {
            x: new Date(1538834400000),
            y: [6579.38, 6580.92, 6566.77, 6575.96]
        },
        {
            x: new Date(1538836200000),
            y: [6575.96, 6589, 6571.77, 6588.92]
        },
        {
            x: new Date(1538838000000),
            y: [6588.92, 6594, 6577.55, 6589.22]
        },
        {
            x: new Date(1538839800000),
            y: [6589.3, 6598.89, 6589.1, 6596.08]
        },
        {
            x: new Date(1538841600000),
            y: [6597.5, 6600, 6588.39, 6596.25]
        },
        {
            x: new Date(1538843400000),
            y: [6598.03, 6600, 6588.73, 6595.97]
        },
        {
            x: new Date(1538845200000),
            y: [6595.97, 6602.01, 6588.17, 6602]
        },
        {
            x: new Date(1538847000000),
            y: [6602, 6607, 6596.51, 6599.95]
        },
        {
            x: new Date(1538848800000),
            y: [6600.63, 6601.21, 6590.39, 6591.02]
        },
        {
            x: new Date(1538850600000),
            y: [6591.02, 6603.08, 6591, 6591]
        },
        {
            x: new Date(1538852400000),
            y: [6591, 6601.32, 6585, 6592]
        },
        {
            x: new Date(1538854200000),
            y: [6593.13, 6596.01, 6590, 6593.34]
        },
        {
            x: new Date(1538856000000),
            y: [6593.34, 6604.76, 6582.63, 6593.86]
        },
        {
            x: new Date(1538857800000),
            y: [6593.86, 6604.28, 6586.57, 6600.01]
        },
        {
            x: new Date(1538859600000),
            y: [6601.81, 6603.21, 6592.78, 6596.25]
        },
        {
            x: new Date(1538861400000),
            y: [6596.25, 6604.2, 6590, 6602.99]
        },
        {
            x: new Date(1538863200000),
            y: [6602.99, 6606, 6584.99, 6587.81]
        },
        {
            x: new Date(1538865000000),
            y: [6587.81, 6595, 6583.27, 6591.96]
        },
        {
            x: new Date(1538866800000),
            y: [6591.97, 6596.07, 6585, 6588.39]
        },
        {
            x: new Date(1538868600000),
            y: [6587.6, 6598.21, 6587.6, 6594.27]
        },
        {
            x: new Date(1538870400000),
            y: [6596.44, 6601, 6590, 6596.55]
        },
        {
            x: new Date(1538872200000),
            y: [6598.91, 6605, 6596.61, 6600.02]
        },
        {
            x: new Date(1538874000000),
            y: [6600.55, 6605, 6589.14, 6593.01]
        },
        {
            x: new Date(1538875800000),
            y: [6593.15, 6605, 6592, 6603.06]
        },
        {
            x: new Date(1538877600000),
            y: [6603.07, 6604.5, 6599.09, 6603.89]
        },
        {
            x: new Date(1538879400000),
            y: [6604.44, 6604.44, 6600, 6603.5]
        },
        {
            x: new Date(1538881200000),
            y: [6603.5, 6603.99, 6597.5, 6603.86]
        },
        {
            x: new Date(1538883000000),
            y: [6603.85, 6605, 6600, 6604.07]
        },
        {
            x: new Date(1538884800000),
            y: [6604.98, 6606, 6604.07, 6606]
        },
        ]
    }];
    const options = {
        chart: {
            type: 'candlestick',
            height: 350
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    }

    const series2 = [{
        name: 'Lands',
        data: [31, 40, 28, 51, 42, 109, 100]
    }, {
        name: 'Houses',
        data: [11, 32, 45, 32, 34, 52, 41]
    }];
    const options2 = {
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    };

    const series1 = [{
        name: 'Price growth',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
    }];
    const options1 = {
        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + "%";
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },

        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            position: 'top',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val + "%";
                }
            }

        },
        title: {
            text: 'Monthly price growth',
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
                color: '#444'
            }
        }
    };


    const theme = useTheme();
    const [value1, setValue1] = React.useState(0);

    const handleChange1 = (event, newValue) => {
        setValue1(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue1(index);
    };

    const [value2, setValue2] = React.useState(0);

    const handleChange2 = (event, newValue) => {
        setValue2(newValue);
    };

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
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography><b>Recommended</b></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
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
                                        <span className="currency1"></span><h4 className="price">100</h4>
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
                                        <span className="currency1"></span><h4 className="price">120</h4>
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
                                        <span className="currency1"></span><h4 className="price">150</h4>
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
                                        <span className="currency1"></span><h4 className="price">110</h4>
                                    </Card.Footer>
                                </Card>
                            </CardDeck>
                            <br></br>
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
                                        <span className="currency2"></span><h4 className="price">100</h4>
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
                                        <span className="currency2"></span><h4 className="price">120</h4>
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
                                        <span className="currency2"></span><h4 className="price">150</h4>
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
                                        <span className="currency2"></span><h4 className="price">110</h4>
                                    </Card.Footer>
                                </Card>
                            </CardDeck>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                            <Typography><b>Bundles</b></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
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
                                        <span className="currency1"></span><h4 className="price">500</h4>
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
                                        <span className="currency1"></span><h4 className="price">450</h4>
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
                                        <span className="currency1"></span><h4 className="price">300</h4>
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
                                        <span className="currency1"></span><h4 className="price">1000</h4>
                                    </Card.Footer>
                                </Card>
                            </CardDeck>
                            <br></br>
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
                                        <span className="currency2"></span><h4 className="price">500</h4>
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
                                        <span className="currency2"></span><h4 className="price">450</h4>
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
                                        <span className="currency2"></span><h4 className="price">300</h4>
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
                                        <span className="currency2"></span><h4 className="price">1000</h4>
                                    </Card.Footer>
                                </Card>
                            </CardDeck>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography><b>Planets offers</b></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
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
                                        <span className="currency1"></span><h4 className="price">50</h4>
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
                                        <span className="currency1"></span><h4 className="price">50</h4>
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
                                        <span className="currency1"></span><h4 className="price">100</h4>
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
                                        <span className="currency1"></span><h4 className="price">70</h4>
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
                                        <span className="currency1"></span><h4 className="price">80</h4>
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
                                        <span className="currency1"></span><h4 className="price">110</h4>
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
                                        <span className="currency1"></span><h4 className="price">80</h4>
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
                                        <span className="currency1"></span><h4 className="price">450</h4>
                                    </Card.Footer>
                                </Card>
                            </CardDeck>
                            <br></br>
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
                                        <span className="currency2"></span><h4 className="price">50</h4>
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
                                        <span className="currency2"></span><h4 className="price">50</h4>
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
                                        <span className="currency2"></span><h4 className="price">100</h4>
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
                                        <span className="currency2"></span><h4 className="price">70</h4>
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
                                        <span className="currency2"></span><h4 className="price">80</h4>
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
                                        <span className="currency2"></span><h4 className="price">110</h4>
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
                                        <span className="currency2"></span><h4 className="price">80</h4>
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
                                        <span className="currency2"></span><h4 className="price">450</h4>
                                    </Card.Footer>
                                </Card>
                            </CardDeck>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                            <Typography><b>Stocks</b></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
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
                                        <span className="currency1"></span><h4 className="price">30</h4>
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
                                        <span className="currency1"></span><h4 className="price">40</h4>
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
                                        <span className="currency1"></span><h4 className="price">20</h4>
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
                                        <span className="currency1"></span><h4 className="price">10</h4>
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
                                        <span className="currency1"></span><h4 className="price">15</h4>
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
                                        <span className="currency1"></span><h4 className="price">25</h4>
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
                                        <span className="currency1"></span><h4 className="price">10</h4>
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
                                        <span className="currency1"></span><h4 className="price">150</h4>
                                    </Card.Footer>
                                </Card>
                            </CardDeck>
                            <br></br>
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
                                        <span className="currency2"></span><h4 className="price">30</h4>
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
                                        <span className="currency2"></span><h4 className="price">40</h4>
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
                                        <span className="currency2"></span><h4 className="price">20</h4>
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
                                        <span className="currency2"></span><h4 className="price">10</h4>
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
                                        <span className="currency2"></span><h4 className="price">15</h4>
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
                                        <span className="currency2"></span><h4 className="price">25</h4>
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
                                        <span className="currency2"></span><h4 className="price">10</h4>
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
                                        <span className="currency2"></span><h4 className="price">150</h4>
                                    </Card.Footer>
                                </Card>
                            </CardDeck>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                            <Typography><b>Statistics</b></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <AppBar position="static">
                                <Tabs
                                    value={value1}
                                    onChange={handleChange1}
                                    indicatorColor="orange"
                                    textColor="white"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                >
                                    <Tab label="Mars" {...a11yProps(0)} />
                                    <Tab label="Moon" {...a11yProps(1)} />
                                    <Tab label="Saturn" {...a11yProps(2)} />
                                    <Tab label="Neptune" {...a11yProps(3)} />
                                    <Tab label="Pluto" {...a11yProps(4)} />
                                    <Tab label="Uranus" {...a11yProps(5)} />
                                    <Tab label="Jupiter" {...a11yProps(6)} />
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={value1}
                                onChangeIndex={handleChangeIndex}
                            >
                                <TabPanel value={value1} index={0} dir={theme.direction}>
                                    <CardDeck responsive>
                                        <Card>
                                            <Card.Header as="h5">Lands and houses price</Card.Header>
                                            <Chart options={options2} series={series2} type="area" height={350} />
                                        </Card>
                                    </CardDeck>
                                    <br></br>
                                    <Box
                                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
                                    >
                                        <Tabs
                                            orientation="vertical"
                                            variant="scrollable"
                                            value={value2}
                                            onChange={handleChange2}
                                            aria-label="Vertical tabs example"
                                            sx={{ borderRight: 1, borderColor: 'divider' }}
                                        >
                                            <Tab label="Transport" {...a11yProps_side(0)} />
                                            <Tab label="Medicine" {...a11yProps_side(1)} />
                                            <Tab label="Education" {...a11yProps_side(2)} />
                                            <Tab label="Infrastructure" {...a11yProps_side(3)} />
                                            <Tab label="Tesla" {...a11yProps_side(4)} />
                                            <Tab label="SpaceX" {...a11yProps_side(5)} />
                                            <Tab label="Agriculture" {...a11yProps_side(6)} />
                                        </Tabs>
                                        <TabPanel_side value={value2} index={0}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={1}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={2}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={3}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={4}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={5}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={6}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                    </Box>
                                </TabPanel>
                                <TabPanel value={value1} index={1} dir={theme.direction}>
                                    <CardDeck responsive>
                                        <Card>
                                            <Card.Header as="h5">Lands and houses price</Card.Header>
                                            <Chart options={options2} series={series2} type="area" height={350} />
                                        </Card>
                                    </CardDeck>
                                    <br></br>
                                    <Box
                                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
                                    >
                                        <Tabs
                                            orientation="vertical"
                                            variant="scrollable"
                                            value={value2}
                                            onChange={handleChange2}
                                            aria-label="Vertical tabs example"
                                            sx={{ borderRight: 1, borderColor: 'divider' }}
                                        >
                                            <Tab label="Transport" {...a11yProps_side(0)} />
                                            <Tab label="Medicine" {...a11yProps_side(1)} />
                                            <Tab label="Education" {...a11yProps_side(2)} />
                                            <Tab label="Infrastructure" {...a11yProps_side(3)} />
                                            <Tab label="Tesla" {...a11yProps_side(4)} />
                                            <Tab label="SpaceX" {...a11yProps_side(5)} />
                                            <Tab label="Agriculture" {...a11yProps_side(6)} />
                                        </Tabs>
                                        <TabPanel_side value={value2} index={0}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={1}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={2}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={3}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={4}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={5}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={6}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                    </Box>
                                </TabPanel>
                                <TabPanel value={value1} index={2} dir={theme.direction}>
                                    <CardDeck responsive>
                                        <Card>
                                            <Card.Header as="h5">Lands and houses price</Card.Header>
                                            <Chart options={options2} series={series2} type="area" height={350} />
                                        </Card>
                                    </CardDeck>
                                    <br></br>
                                    <Box
                                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
                                    >
                                        <Tabs
                                            orientation="vertical"
                                            variant="scrollable"
                                            value={value2}
                                            onChange={handleChange2}
                                            aria-label="Vertical tabs example"
                                            sx={{ borderRight: 1, borderColor: 'divider' }}
                                        >
                                            <Tab label="Transport" {...a11yProps_side(0)} />
                                            <Tab label="Medicine" {...a11yProps_side(1)} />
                                            <Tab label="Education" {...a11yProps_side(2)} />
                                            <Tab label="Infrastructure" {...a11yProps_side(3)} />
                                            <Tab label="Tesla" {...a11yProps_side(4)} />
                                            <Tab label="SpaceX" {...a11yProps_side(5)} />
                                            <Tab label="Agriculture" {...a11yProps_side(6)} />
                                        </Tabs>
                                        <TabPanel_side value={value2} index={0}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={1}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={2}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={3}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={4}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={5}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={6}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                    </Box>
                                </TabPanel>
                                <TabPanel value={value1} index={3} dir={theme.direction}>
                                    <CardDeck responsive>
                                        <Card>
                                            <Card.Header as="h5">Lands and houses price</Card.Header>
                                            <Chart options={options2} series={series2} type="area" height={350} />
                                        </Card>
                                    </CardDeck>
                                    <br></br>
                                    <Box
                                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
                                    >
                                        <Tabs
                                            orientation="vertical"
                                            variant="scrollable"
                                            value={value2}
                                            onChange={handleChange2}
                                            aria-label="Vertical tabs example"
                                            sx={{ borderRight: 1, borderColor: 'divider' }}
                                        >
                                            <Tab label="Transport" {...a11yProps_side(0)} />
                                            <Tab label="Medicine" {...a11yProps_side(1)} />
                                            <Tab label="Education" {...a11yProps_side(2)} />
                                            <Tab label="Infrastructure" {...a11yProps_side(3)} />
                                            <Tab label="Tesla" {...a11yProps_side(4)} />
                                            <Tab label="SpaceX" {...a11yProps_side(5)} />
                                            <Tab label="Agriculture" {...a11yProps_side(6)} />
                                        </Tabs>
                                        <TabPanel_side value={value2} index={0}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={1}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={2}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={3}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={4}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={5}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={6}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                    </Box>
                                </TabPanel>
                                <TabPanel value={value1} index={4} dir={theme.direction}>
                                    <CardDeck responsive>
                                        <Card>
                                            <Card.Header as="h5">Lands and houses price</Card.Header>
                                            <Chart options={options2} series={series2} type="area" height={350} />
                                        </Card>
                                    </CardDeck>
                                    <br></br>
                                    <Box
                                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
                                    >
                                        <Tabs
                                            orientation="vertical"
                                            variant="scrollable"
                                            value={value2}
                                            onChange={handleChange2}
                                            aria-label="Vertical tabs example"
                                            sx={{ borderRight: 1, borderColor: 'divider' }}
                                        >
                                            <Tab label="Transport" {...a11yProps_side(0)} />
                                            <Tab label="Medicine" {...a11yProps_side(1)} />
                                            <Tab label="Education" {...a11yProps_side(2)} />
                                            <Tab label="Infrastructure" {...a11yProps_side(3)} />
                                            <Tab label="Tesla" {...a11yProps_side(4)} />
                                            <Tab label="SpaceX" {...a11yProps_side(5)} />
                                            <Tab label="Agriculture" {...a11yProps_side(6)} />
                                        </Tabs>
                                        <TabPanel_side value={value2} index={0}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={1}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={2}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={3}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={4}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={5}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={6}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                    </Box>
                                </TabPanel>
                                <TabPanel value={value1} index={5} dir={theme.direction}>
                                    <CardDeck responsive>
                                        <Card>
                                            <Card.Header as="h5">Lands and houses price</Card.Header>
                                            <Chart options={options2} series={series2} type="area" height={350} />
                                        </Card>
                                    </CardDeck>
                                    <br></br>
                                    <Box
                                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
                                    >
                                        <Tabs
                                            orientation="vertical"
                                            variant="scrollable"
                                            value={value2}
                                            onChange={handleChange2}
                                            aria-label="Vertical tabs example"
                                            sx={{ borderRight: 1, borderColor: 'divider' }}
                                        >
                                            <Tab label="Transport" {...a11yProps_side(0)} />
                                            <Tab label="Medicine" {...a11yProps_side(1)} />
                                            <Tab label="Education" {...a11yProps_side(2)} />
                                            <Tab label="Infrastructure" {...a11yProps_side(3)} />
                                            <Tab label="Tesla" {...a11yProps_side(4)} />
                                            <Tab label="SpaceX" {...a11yProps_side(5)} />
                                            <Tab label="Agriculture" {...a11yProps_side(6)} />
                                        </Tabs>
                                        <TabPanel_side value={value2} index={0}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={1}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={2}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={3}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={4}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={5}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={6}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                    </Box>
                                </TabPanel>
                                <TabPanel value={value1} index={6} dir={theme.direction}>
                                    <CardDeck responsive>
                                        <Card>
                                            <Card.Header as="h5">Lands and houses price</Card.Header>
                                            <Chart options={options2} series={series2} type="area" height={350} />
                                        </Card>
                                    </CardDeck>
                                    <br></br>
                                    <Box
                                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
                                    >
                                        <Tabs
                                            orientation="vertical"
                                            variant="scrollable"
                                            value={value2}
                                            onChange={handleChange2}
                                            aria-label="Vertical tabs example"
                                            sx={{ borderRight: 1, borderColor: 'divider' }}
                                        >
                                            <Tab label="Transport" {...a11yProps_side(0)} />
                                            <Tab label="Medicine" {...a11yProps_side(1)} />
                                            <Tab label="Education" {...a11yProps_side(2)} />
                                            <Tab label="Infrastructure" {...a11yProps_side(3)} />
                                            <Tab label="Tesla" {...a11yProps_side(4)} />
                                            <Tab label="SpaceX" {...a11yProps_side(5)} />
                                            <Tab label="Agriculture" {...a11yProps_side(6)} />
                                        </Tabs>
                                        <TabPanel_side value={value2} index={0}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={1}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={2}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={3}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={4}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={5}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                        <TabPanel_side value={value2} index={6}>
                                            <CardDeck responsive style={{ width: '1400px' }}>
                                                <Card>
                                                    <Card.Header as="h5">Price growth</Card.Header>
                                                    <Chart options={options1} series={series1} type="bar" height={350} />
                                                </Card>
                                            </CardDeck>
                                            <br></br>
                                            <CardDeck responsive>
                                                <Card>
                                                    <Card.Header as="h5">Price fluctuation</Card.Header>
                                                    <Chart options={options} series={series} type="candlestick" height={350} />
                                                </Card>
                                            </CardDeck>
                                        </TabPanel_side>
                                    </Box>
                                </TabPanel>
                            </SwipeableViews>
                            {/* <br></br>
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
                            </CardDeck> */}
                        </AccordionDetails>
                    </Accordion>
                    <br></br>
                    <CardDeck>
                        <Card className="shopCost">
                            <Card.Body>
                                <span className="currency"></span>
                                <span style={{ marginLeft: '50px' }} className="currency1"></span>
                                <span style={{ marginLeft: '90px' }} className="currency2"></span>
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
