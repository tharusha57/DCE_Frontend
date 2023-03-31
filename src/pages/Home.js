import { Box, Button, Grid, Modal, Pagination, Paper, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import User from '../components/User'
import { useUserContext } from '../hooks/useUserContext'
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import axios from 'axios'



function Home() {

  const [open, setOpen] = useState(false)
  const { dispatch, username, email } = useUserContext()
  const [updatedUsername, setUpdatedUsername] = useState('')
  const [updatedEmail, setUpdatedEmail] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [loading , setLoading] = useState(false)

  const handleDelete = async () => {
    localStorage.removeItem('userState')

    try {
      const response = await axios.delete('https://reqres.in/api/users/2')
      if (response) {
        console.log(response.data)
      }
    } catch (error) {
      console.log(error)
    }

    dispatch({ type: 'USER_DELETED' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (updatedUsername && updatedEmail) {
      try {
        const response = await axios.put('https://reqres.in/api/users/2', {
          username: updatedUsername,
          email: updatedEmail
        })

        if (response) {
          localStorage.setItem('userState', JSON.stringify(response.data))
        }

        dispatch({ type: 'USER_CREATED', payload: response.data })

        setOpen(false)

      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    setLoading(true)
    const getData = async() => {
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=1`)
  
        if (response) {
          setData(response.data.data)
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    getData()
  }, [])

  useEffect(()=> {
    changePage()
  }, [page])


  const changePage = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`)

      if (response) {
        setData(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      {open ? <Modal open={true} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose onClick={() => setOpen(false)} />
          <Typography>Update Your Details</Typography>
          <Box sx={{
            width: '100%', marginTop: '20px', display: 'flex',
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
                onChange={(e) => setUpdatedUsername(e.target.value)}
              />

              <TextField
                fullWidth
                sx={{ width: '100%' }}
                id="outlined-password-input"
                label="Email"
                type="email"
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />

              <Button type='submit' variant="contained" size="large" sx={{ height: '50px' }}>Update Account</Button>
            </form>
          </Box>
        </ModalDialog>
      </Modal> : null}

      <Container sx={{ height: 'fit-content', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flexDirection: 'column', gap: '30px' , marginTop : '40px'}}>

        <Paper sx={{ width: '80%', display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'space-around', alignItems: 'center', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', height: '50px', backgroundColor: 'primary.main' }}>
          <Typography color={'white'}><span style={{ fontWeight: '600' }}>Username :</span> {username}</Typography>
          <Typography color={'white'}> <span style={{ fontWeight: '600' }}>Email :</span> {email}</Typography>
        </Paper>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '20px', width: '80%' }}>
          <Button variant="contained" size="large" sx={{ height: '50px', width: '100%' }} onClick={() => setOpen(true)}>Update Account</Button>
          <Button variant="contained" color='error' size="large" sx={{ height: '50px', width: '100%' }} onClick={handleDelete}>Delete Account</Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '20px', width: '80%' }}>
          <Grid container spacing={1} sx={{textAlign: 'center' , width: '100%'}}>
            {loading ? <Typography>Loading</Typography> :  data.map((user) => {
              return (<Grid item xs={12} md={6} lg={4} key={user.id} sx={{width : '100%'}}>
                <User {...user} key={user.id} />
              </Grid>)
            })}
          </Grid>
        </Box>
        <Pagination sx={{marginBottom : '50px'}} count={2} variant="outlined" onChange={(e, page) => {
          setPage(page)
        }} />
      </Container>
    </>
  )
}

export default Home