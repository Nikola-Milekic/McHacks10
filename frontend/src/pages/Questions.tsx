
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
            question: "Gender",
            answer: gender
        },
        {
            id: 3,
            question:"Age",
            answer:age
        }
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
        if (name !== '' && gender !== ''){
            setHasName(true)
        }
    }

    useEffect(()=>{
        console.log(questions)
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
}
export default Questions;
