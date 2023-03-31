import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'

function User(props) {
    const {email , first_name , last_name , avatar} = props
    return (
        <Box sx={{ height: 'fit-content', width: '100%',display : 'flex' , flexDirection : 'column' , gap : '10px' , justifyContent : 'center' , alignItems : 'center', padding : '10px 0px', borderRadius : '10px' , boxShadow : 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}>
            <Box sx={{width: '40%' , display : 'flex' , justifyContent : 'center' , alignItems : 'center'}}>
                <Avatar alt="Remy Sharp" src={avatar}  sx={{ width: 70, height: 70 }}/>
            </Box>
            <Box sx={{width: '100%' , display : 'flex' , gap : '10px' , flexDirection : 'column' , justifyContent : 'center'}}>
                <Typography><span style={{color : 'gray'}}>First name </span>: {first_name}</Typography>
                <Typography><span style={{color : 'gray'}} >Last name </span>: {last_name}</Typography>
                <Typography><span style={{color : 'gray'}} >Email </span>: {email}</Typography>
            </Box>
        </Box>
    )
}

export default User