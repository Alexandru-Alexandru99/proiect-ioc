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
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
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