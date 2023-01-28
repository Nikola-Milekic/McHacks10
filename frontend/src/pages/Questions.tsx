import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PersonalSettingsImg from '../assets/images/PersonalSettingsImg';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function Questions(){
    return (
        <>
        <Box sx={{padding: 8}}>
            <h1>Build your friend</h1>
            <Box sx={{ flexGrow: 1, backgroundColor:"grey" }}>
                <Grid container spacing={2} sx={{borderRadius: '22px',margin: '2px'}}>
                    <Grid item xs={6}>
                        <Grid container spacing={1}>
                            <Item >
                                <h2>What is your name?</h2>
                            </Item>
                        </Grid>
                    </Grid>
                    <Grid container xs={6} direction="column" alignItems="center" justifyContent="center">
                        <PersonalSettingsImg></PersonalSettingsImg>
                    </Grid>
                    
                </Grid>
            </Box>
        </Box>
       
        </>
    )
}
export default Questions;