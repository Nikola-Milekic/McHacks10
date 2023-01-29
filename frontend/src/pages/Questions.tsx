<<<<<<< Updated upstream

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PersonalSettingsImg from '../assets/images/PersonalSettingsImg';
import Textarea from '@mui/joy/Textarea';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
function Questions(){
    const [name,setName] = useState('')
    const [gender,setGender] = useState('')
    const [age,setAge] = useState('')
    const [hasName,setHasName] = useState(false)
    var qArray = [
        {
            id: 1,
            question: "What is your buddy's name?",
            answer: name,
        },
        {
            id: 2,
            question: "What is their gender?",
            answer: gender
        },
        {
            id: 3,
            question:`What is ${name}'s age?`,
            answer:age
        },
        {
            id: 4,
            question:`Where is ${name} located?`,
            answer:''
        },
        {
            id: 5,
            question:`What is their occupation?`,
            answer:''
        },
        {
            id: 6,
            question:`What is ${name}'s interests?`,
            answer:''
        },
        {
            id: 7,
            question:`What is ${name}'s personality?`,
            answer:''
        },
        
    ]
    const [questions,setQuestions] = useState(qArray)

    //Input validation
    const handleInput = (event: any) => {
        console.log(event.target.value)
        if(event.target.id === "nameQuestion"){
            if(event.target.value.length <= 30){
                setName(event.target.value);
                setQuestions(
                    questions.map((question) =>
                        question.id === 1 ? {...question, answer: event.target.value} : question)
                )
            }
        }
        else if(event.target.value === "male"|| event.target.value === "female" || event.target.value === "other"){
            setGender(event.target.value);
            setQuestions(
                questions.map((question) =>
                    question.id === 2 ? {...question, answer: event.target.value} : question)
            )
        }
            
    };
    const handleNext = () =>{
        console.log(name);
        if (name !== '' && gender !== '' && questions[0]['answer'] === name){
            console.log(questions[0]['answer'])
            setQuestions(
                questions.map((q) =>
                    q.id === 3 ? {...q, question: `What is ${name}'s age?`} : q
                    )
            )
            setQuestions(
                questions.map((q) =>
                    q.id === 4 ? {...q, question: `Where is ${name} located?`} : q
            )
            )
            setTimeout(()=>{
                console.log(questions)
            },1000);

            console.log(questions)
            setHasName(true)
        }
    }

    useEffect(()=>{
    },[questions])
    const handleSubmit = () =>{
        console.log("hello")
    }

    if(!hasName){
        return (
            <>
            <Box sx={{padding: 8}}>
                <h1>Build your friend</h1>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} sx={{borderRadius: '22px',margin: '2px'}}>
                        <Grid item xs={6}>
                            <Grid container spacing={1} margin={'10px'}>
                                <FormControl onSubmit={handleSubmit}>
                                    <FormLabel htmlFor="nameQuestion">{questions[0]['question']}</FormLabel>  
                                    <Textarea slotProps={{
                                        textarea:{
                                            id: 'nameQuestion',
                                        }
                                    }} sx={{width:'100%'}} onChange={event => handleInput(event)} minRows={3} placeholder="Could be Anything :)" value={questions[0]['answer']}>
                                    </Textarea>
                                    <FormLabel sx={{marginTop: '30px'}} htmlFor="genderQuestion" id="genderQuestion">Gender</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="genderQuestion"
                                            name="genderQuestion"
                                            id="genderQuestion"
                                            onChange={event => handleInput(event)}
                                        >
                                            <FormControlLabel value="female" control={<Radio />} label="Female" id="genderQuestion" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                        <Button variant="contained" onClick={()=>handleNext()}>{"Next"}</Button>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container xs={6} direction="column" alignItems="center" justifyContent="center">
                            <PersonalSettingsImg></PersonalSettingsImg>
                        </Grid>
                        
                    </Grid>
                </Box>
            </Box>
        
            </>
        );
    }
    return(
        <>
            <Box sx={{padding: 8}}>
                <h1>Build your friend</h1>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} sx={{borderRadius: '22px',margin: '2px'}}>
                        <Grid item xs={6}>
                            <Grid container spacing={1} margin={'10px'}>
                                <FormControl onSubmit={handleSubmit}>
                                    <FormLabel htmlFor="ageQuestion">{questions[2]['question']}</FormLabel>  
                                    <Textarea slotProps={{
                                        textarea:{
                                            id: 'ageQuestion',
                                        }
                                    }} sx={{width:'100%'}} onChange={event => handleInput(event)} minRows={3} placeholder="They have to be able to type and speak!" value={questions[2]['answer']}>
                                    </Textarea>
                                        <Button variant="contained" onClick={()=>handleSubmit}>Submit</Button>
                                </FormControl>
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
=======
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PersonalSettingsImg from "../assets/images/PersonalSettingsImg";
import BuddiesImg from "../assets/images/BuddiesImg";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Questions() {
  return (
    <>
      <Box sx={{ padding: 10 }}>
        <h1>Build your friend</h1>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
            sx={{ borderRadius: "22px", alignItems: "center" }}
          >
            <Grid item xs={6}>
              <Grid container spacing={1}>
                <Item>
                  <h2>What is your name?</h2>
                </Item>
              </Grid>
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        </Box>
        <BuddiesImg></BuddiesImg>
      </Box>
    </>
  );
>>>>>>> Stashed changes
}
export default Questions;
