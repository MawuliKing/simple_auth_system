import { useState } from 'react'
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const sigin = e => {
    e.preventDefault()

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
      email: email,
      password: password
    }

    var config = {
      method: 'post',
      url: 'http://localhost:8080/auth/signin',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    axios(config)
      .then(response => {
        console.log(response.data)

        const token = response.data.token
        const user = response.data.admin

        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        Swal.fire({
          icon: 'success',
          toast: true,
          showConfirmButton: false,
          text: response.data?.message,
          position: 'top-right',
          timer: 1000,
          timerProgressBar: true
        }).then(() => {
          window.location.href = '/dashboard'
        })
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

  return (
    <>
      <Container className='mt-5'>
        <h1 className='text-center'>Sign in Page</h1>
        <hr />
        <Form onSubmit={sigin}>
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
          <Button className='my-5' type='submit'>
            Sign in
          </Button>

          <p className='text-center'>
            Not registered?{' '}
            <Link to='/signup' style={{ textDecoration: 'none' }}>
              sign up
            </Link>
          </p>
        </Form>
      </Container>
    </>
  )
}

export default Signin
