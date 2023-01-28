import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


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
        <Box sx={{padding: 10}}>
            <h1>Build your friend</h1>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{borderRadius: '22px', alignItems:'center'}}>
                    <Grid item xs={6}>
                        <Grid container spacing={1}>
                            <Item>
                                <h2>What is your name?</h2>
                            </Item>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                </Grid>
            </Box>
        </Box>
       
        </>
    )
}
export default Questions;