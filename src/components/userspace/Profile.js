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
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const user = {
      username: window.localStorage.getItem('name'),
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      phonenumber: phonenumberRef.current.value,
      address: addressRef.current.value,
      password: passwordRef.current.value,
    }

    try {
      setError("")
      setLoading(true)
  
      axios
        .post("http://localhost:5000/users/updateProfile", user)
        .then(window.location.reload());
    } catch {
      setError("Failed to update profile!")
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
                    <h2 className="text-center mb-4">Personal info</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <br></br>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email" value={window.localStorage.getItem('name')} readonly="readonly"
                        />
                        </Form.Group>
                        <Form.Group id="firstname">
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control
                            type="text" defaultValue={info.firstname} ref={firstnameRef}
                        />
                        </Form.Group>
                        <Form.Group id="lastname">
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control
                            type="text" defaultValue={info.lastname} ref={lastnameRef}
                        />
                        </Form.Group>
                        <Form.Group id="phonenumber">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control
                            type="text" defaultValue={info.phonenumber} ref={phonenumberRef}
                        />
                        </Form.Group>
                        <Form.Group id="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text" defaultValue={info.address} ref={addressRef}
                        />
                        </Form.Group>
                        <Form.Group id="password">
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
