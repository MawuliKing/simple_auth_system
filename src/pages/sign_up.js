import axios from 'axios'
import { useState } from 'react'
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cp, setCp] = useState('')

  const sigup = e => {
    e.preventDefault()

    if (password !== cp) {
      Swal.fire({
        icon: 'error',
        toast: true,
        showConfirmButton: false,
        text: 'Passwords do not match',
        position: 'top-right'
      })
    } else {
      Swal.fire({
        title: 'Loading....',
        allowOutsideClick: false,
        // allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading()
        },
        position: 'top-right'
      })

      var data = {
        name: username,
        email: email,
        password: password
      }

      var config = {
        method: 'post',
        url: 'http://localhost:8080/auth/signup',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      }

      axios(config)
        .then(response => {
          // console.log(response.data
          Swal.fire({
            icon: 'success',
            toast: true,
            showConfirmButton: false,
            text: response.data?.message + ' Please sign in',
            position: 'top-right'
          })

          window.location.href = '/'
        })
        .catch(error => {
          console.log(error)

          Swal.fire({
            icon: 'error',
            toast: true,
            showConfirmButton: false,
            text: error?.response?.data?.message,
            position: 'top-right'
          })
        })
    }
  }

  return (
    <>
      <Container className='mt-5'>
        <h1 className='text-center'>Signup Page</h1>
        <hr />
        <Form onSubmit={sigup}>
          <FloatingLabel controlId='uid' label='Username'>
            <Form.Control
              type='text'
              placeholder='Username'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId='email' label='Email'>
            <Form.Control
              type='email'
              placeholder='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId='password' label='Password'>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId='comfirm_pwd' label='Comfrim password'>
            <Form.Control
              type='password'
              placeholder='Comfrim password'
              value={cp}
              onChange={e => setCp(e.target.value)}
            />
          </FloatingLabel>
          <Button type='submit' className='my-5'>
            Sign up
          </Button>

          <p className='text-center'>
            Already have an account?{' '}
            <Link to='/' style={{ textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>
        </Form>
      </Container>
    </>
  )
}

export default Signup
