import styled from '@emotion/styled'
import { Button, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useState } from 'react'
import axios from 'axios'
import { useUserContext } from '../hooks/useUserContext'
import { useNavigate } from "react-router-dom"

const LoginBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '600px',
  width: '500px',
  borderRadius: '10px',
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;'
}))

function Login() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { dispatch } = useUserContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (username && email) {
      try {
        const response = await axios.post('https://reqres.in/api/users', {
          username, email
        })

        if (response) {
          localStorage.setItem('userState', JSON.stringify(response.data))
        }

        dispatch({ type: 'USER_CREATED', payload: response.data })

        navigate('/')

      } catch (error) {
        setError(error)
        console.log(error)
      }
    }else{
      alert('Please Fill in all the fields')
    }

  }



  return (
    <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <LoginBox>
        <Typography variant='h4' sx={{ fontWeight: '600' }}>
          Data Capture Experts
        </Typography>
        <Typography sx={{ marginTop: '10px', color: 'grey' }}>
          Create your account
        </Typography>

        <Box sx={{
          width: '80%', marginTop: '80px', display: 'flex',
          flexDirection: 'column', gap: '20px'
        }}>

          <form style={{
            display: 'flex',
            flexDirection: 'column', gap: '20px'
          }} onSubmit={handleSubmit}>

            <TextField
              fullWidth
              sx={{ width: '100%' }}
              id="outlined-password-input"
              label="Username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              fullWidth
              sx={{ width: '100%' }}
              id="outlined-password-input"
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button type='submit' variant="contained" size="large" sx={{ height: '50px' }}>Create Account</Button>
          </form>
        </Box>
      </LoginBox>
    </Container>
  )
}

export default Login