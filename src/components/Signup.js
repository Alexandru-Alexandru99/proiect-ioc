import React, { useRef, useState, useContext } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import './Signup.css';
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const {value, setValue} = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const user = {
      username: emailRef.current.value,
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

  return (
    <>
      <Link to='/' className='linkLogo'>
         <span className="logo"></span>
      </Link>
      <div class="container-signup">
            <h2 className="text-center mb-4">Sign Up</h2>
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
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} required />
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