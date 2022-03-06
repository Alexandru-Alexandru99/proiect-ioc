import React, { useRef, useState } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import './Forgotpassword.css';
import axios from "axios"

export default function Forgotpassword() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  

  async function handleSubmit(e) {
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
  
      axios
        .post("http://localhost:5000/users/changePassword", user)
        .then((response) => {
          if(response.data === "User not found!") {
            setError(response.data);
          }
          else {
            history.push("/login");
          }
        });
    } catch {
      setError("Failed to change password")
    }

    setLoading(false)
  }

  return (
    <>
      <Link to='/' className='linkLogo'>
         <span className="logo"></span>
      </Link>
      <div class="container-forgotpassword">
          <h2 className="text-center mb-4">Log in</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>New password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="confirmpassword">
              <Form.Label>Confirm new password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Change password
            </Button>
          </Form>
      </div>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
      <span className="forgotpassword-back"></span>
    </>
  )
}