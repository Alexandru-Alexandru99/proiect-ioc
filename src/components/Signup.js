import React, { useRef, useState, useContext } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import './Signup.css';
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export default function Signup() {
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const usernameRef = useRef()
  const phoneNumberRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const {value, setValue} = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault()

    if(error != "") {
      return
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const user = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      phoneNumber: phoneNumberRef,
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    try {

      setError("")
      setLoading(true)
      console.log(user);
      axios
        .post("http://localhost:5000/users/add", user)
        .then((response) => {
          if(response.data == "User added!") {
            setValue(emailRef.current.value);
            window.localStorage.setItem('name', emailRef.current.value);
            window.localStorage.setItem('type', 'user');
            history.push("/profile");
          }
          else {
            setError("Failed to create an account!");
          }
        });

    } catch {
      setError("Failed to create an account!")
    }
    setLoading(false)
  }

  function handleNameChange(e) {
    if (e.target.value.length < 2 || e.target.value.length > 20) {
      setError("Name should be between 2 and 20 characters!")
    } else {
      setError("");
      if(e.target.value.match(/^[a-zA-Z-]{2,20}$/) == null) {
        setError("Name can only contain letters and '-' character!");
      } else {
          setError("");
      }
    }
  }

  function handleEmpty(e) {
    setError("");
  }

  function handleUsernameChange(e) {
    if (e.target.value.length < 2 || e.target.value.length > 20) {
      setError("Username should be between 8 and 20 characters!")
    } else {
      if(e.target.value.match(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){2,18}[a-zA-Z0-9]$/) == null) {
        setError("Username should start with a letter, followed by a letter, a special character (._-) or a number! It should also end with a letter or number.");
      } else {
          setError("");
      }
    }
  }

  function handleEmailChange(e) {
    if(e.target.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/) == null) {
      setError("Email is not valid!");
    } else {
      setError("");
    }
  }

  function handlePhoneNumberChange(e) {
    if(e.target.value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/) == null) {
      setError("Phone number is not valid!");
    } else {
      setError("");
    }
  }

  return (
    <>
      <Link to='/' className='linkLogo'>
         <span className="logo"></span>
      </Link>
      <div class="container-signup">
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" ref={firstNameRef} onChange={handleNameChange} onEmptied={handleEmpty} required />
              </Form.Group>
              <Form.Group id="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" ref={lastNameRef} onChange={handleNameChange} onEmptied={handleEmpty} required />
              </Form.Group>
              <Form.Group id="lastName">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" ref={usernameRef} onChange={handleUsernameChange} onEmptied={handleEmpty} required />
              </Form.Group>
              <Form.Group id="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="tel" ref={phoneNumberRef} onEmptied={handleEmpty} required />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} onChange={handleEmailChange} onEmptied={handleEmpty} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} onEmptied={handleEmpty} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} onEmptied={handleEmpty} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
      <span className="signup-back"></span>
    </>
  )
}