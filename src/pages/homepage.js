import moment from 'moment/moment'
import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import Swal from 'sweetalert2'

const Dashboard = () => {
  const checkLogin = () => {
    const token = localStorage.getItem('token')

    if (!token) {
      Swal.fire({
        icon: 'error',
        toast: true,
        showConfirmButton: false,
        text: 'Please sign in',
        position: 'top-right'
      })

      window.location.href = '/'
    }
  }

  const [user, setUser] = useState([])
  useEffect(() => {
    checkLogin()
    const userdata = JSON.parse(localStorage.getItem('user'))
    setUser(userdata)
  }, [])

  return (
    <Container className='mt-5'>
      <p>name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>
        Registration Date:{' '}
        {moment(user.req_date).format('Do MMMM YYYYY HH:MM a')}
      </p>
      <Button
        variant='danger'
        onClick={() => {
          localStorage.clear()
          window.location.href = '/'
        }}
      >
        {' '}
        Log out{' '}
      </Button>
    </Container>
  )
}

export default Dashboard
