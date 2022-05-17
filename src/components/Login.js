import React, { useRef, useState, useContext } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import './Login.css';
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { value, setValue } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault()

    const user = {
      username: emailRef.current.value,
      password: passwordRef.current.value,
    }

    try {
      setError("")
      setLoading(true)
      history.push("/profile");
    } catch {
      setError("Failed to log in")
    }
    setLoading(false)
  }

  function handleEmailChange(e) {
    if(e.target.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/) == null) {
      setError("Email is not valid!");
    } else {
      setError("");
    }
  }

  function handlePassword(e) {
    if(e.target.value.length < 8 || e.target.value.length > 20) {
      setError("Password should be between 8 and 20 characters!")
    } else if (e.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) == null) {
      setError("Password should contain at least one lowercase letter, one uppercase letter, one number and one special character!")
    }
    else {
      setError("");
    }
  }

  function handleEmpty(e) {
    setError("");
  }

  return (
    <>
      <Link to='/' className='linkLogo'>
        <span className="logo"></span>
      </Link>
      <div class="container-login">
        <h2 className="text-center mb-4">Log in</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} onChange={handleEmailChange} onEmptied={handleEmpty} required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} onChange={handlePassword} onEmptied={handleEmpty} required />
          </Form.Group>
          <Button disabled={loading} className="w-100" type="submit">
            Log in
          </Button>
        </Form>
      </div>
      <div className="w-100 text-center mt-2">
        Forgot your password? <Link to="/forgotpassword">Change password</Link>
      </div>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign up</Link>
      </div>
      <span className="login-back"></span>
    </>
  )
}