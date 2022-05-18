import React, { useRef, useState, useContext, useEffect } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import LeftMenu from "./LeftMenu"
import { AuthContext } from "../../contexts/AuthContext"
import axios from "axios"

import "./Profile.css"

export default function Profile() {
  const emailRef = useRef()
  const firstnameRef = useRef()
  const lastnameRef = useRef()
  const phonenumberRef = useRef()
  const addressRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const [click, setClick] = useState(false);
  
  const handleClick = () => setClick(!click);

  const {value, setValue} = useContext(AuthContext);

  const [info, setInfo] = useState({})

  useEffect(() => {
    
    console.log(window.localStorage.getItem('name'));

    const currentUser = {
      username: window.localStorage.getItem('name'),
    }
    console.log(currentUser)
    axios
      .post("http://localhost:5000/users/profileInfo",currentUser)       
      .then(response => {
        console.log(response.data);
        setInfo(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    console.log(info);
  }, []);

  function handleSubmit(e) {
    e.preventDefault()
    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError("Passwords do not match")
    // }

    // const user = {
    //   username: window.localStorage.getItem('name'),
    //   firstname: firstnameRef.current.value,
    //   lastname: lastnameRef.current.value,
    //   phonenumber: phonenumberRef.current.value,
    //   address: addressRef.current.value,
    //   password: passwordRef.current.value,
    // }

    // try {
    //   setError("")
    //   setLoading(true)
  
    //   axios
    //     .post("http://localhost:5000/users/updateProfile", user)
    //     .then(window.location.reload());
    // } catch {
    //   setError("Failed to update profile!")
    // }

    // setLoading(false)
    
  }

  function handleSSNSubmit(e) {
    e.preventDefault()
  }

  function handleAddressSubmit(e) {
    e.preventDefault()
  }

  function handlePasswordSubmit(e) {
    e.preventDefault()
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
        <div className={click ? 'p-new' : 'p-body'}>
            <header class="p-header">
              <div className='left-menu-icon' onClick={handleClick}>
                <i className={click ? 'fa fa-bars' : 'fa fa-bars'} id='btn'/>
              </div>
              <h5 className="username"><span className="user-icon"></span>{window.localStorage.getItem('name')}</h5>
            </header>
            <div class="p-profile">
                <Card>
                    <Card.Body>
                    <span class="userAstronaut"></span>
                    <h2 className="text-center mb-4">Personal Info</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <br></br>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="firstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text" 
                            // defaultValue={info.firstname} ref={firstnameRef} 
                            defaultValue="Alexandru"
                            readonly="readonly"
                        />
                        </Form.Group>
                        <Form.Group id="lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text" 
                            // defaultValue={info.lastname} ref={lastnameRef} 
                            defaultValue="Alexandru"
                            readonly="readonly"
                        />
                        </Form.Group>
                        <Form.Group id="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text" 
                            // value={window.localStorage.getItem('name')} 
                            readonly="readonly"
                            defaultValue="alex.alex"
                        /> <br></br>
                        <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email" 
                            // value={window.localStorage.getItem('name')} 
                            defaultValue="alexandru1999@gmail.com"
                            readonly="readonly"
                        />
                        </Form.Group>
                        </Form.Group>
                        <Form.Group id="phonenumber">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control
                            type="tel" 
                            // defaultValue={info.phonenumber} ref={phonenumberRef} 
                            readonly="readonly"
                            defaultValue="+4722222222"
                        />
                        </Form.Group>
                        <Form.Group id="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text" 
                            // defaultValue={info.address} ref={addressRef}
                            defaultValue="Str. Spatarul Preda, Nr. 16, Bucharest"
                            readonly="readonly"
                        />
                        </Form.Group>
                        <Form.Group id="ssn">
                        <Form.Label>Social Security Number</Form.Label>
                        <Form.Control
                            type="password" 
                            // defaultValue={info.address} ref={addressRef} 
                            defaultValue="password"
                            readonly="readonly"
                        />
                        </Form.Group>
                        {/* <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            ref={passwordRef}
                            placeholder="Leave blank to keep the same"
                        />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control
                            type="password"
                            ref={passwordConfirmRef}
                            placeholder="Leave blank to keep the same"
                        />
                        </Form.Group> */}
                        {/* <Button disabled={loading} type="submit">
                        Update
                        </Button> */}
                    </Form>
                    </Card.Body>
                </Card>

                <br></br>

                <Card>
                    <Card.Body>
                    <h2 className="text-center mb-4">Social Security Number</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <br></br>
                    <h6 className="text-center mb-4">To start using our platform you are required to register your Social Security Number</h6>
                    <Form onSubmit={handleSSNSubmit}>
                        <Form.Group id="ssn">
                        <Form.Label>Social Security Number</Form.Label>
                        <Form.Control
                            type="text" 
                            // defaultValue={info.address} ref={addressRef}
                        />
                        </Form.Group>
                        <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            // ref={passwordRef}
                        />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control
                            type="password"
                            // ref={passwordConfirmRef}
                        />
                        </Form.Group>
                        <Button disabled={loading} type="submit">
                        Register
                        </Button>
                    </Form>
                    </Card.Body>
                </Card>

                <br></br>

                <Card>
                    <Card.Body>
                    <h2 className="text-center mb-4">Change Address</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <br></br>
                    <Form onSubmit={handleAddressSubmit}>
                        <Form.Group id="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text" 
                            // defaultValue={info.address} ref={addressRef}
                        />
                        </Form.Group>
                        <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            // ref={passwordRef}
                        />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control
                            type="password"
                            // ref={passwordConfirmRef}
                        />
                        </Form.Group>
                        <Button disabled={loading} type="submit">
                        Update
                        </Button>
                    </Form>
                    </Card.Body>
                </Card>

                <br></br>

                <Card>
                    <Card.Body>
                    <h2 className="text-center mb-4">Change Password</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <br></br>
                    <Form onSubmit={handlePasswordSubmit}>
                        <Form.Group id="password">
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control
                            type="password"
                            // ref={passwordRef}
                        />
                        </Form.Group>
                        <Form.Group id="password">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            // ref={passwordRef}
                        />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control
                            type="password"
                            // ref={passwordConfirmRef}
                        />
                        </Form.Group>
                        <Button disabled={loading} type="submit">
                        Update
                        </Button>
                    </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    </>
  )
}
